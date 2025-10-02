import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// Email configuration (you can use services like SendGrid, Mailgun, etc.)
const ADMIN_EMAIL = 'info@artificialgrassoldham.co.uk'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'postcode']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Prepare lead data
    const leadData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      postcode: body.postcode,
      gardenSize: body.gardenSize || 'Not specified',
      timeframe: body.timeframe || 'Not specified',
      message: body.message || '',
      source: body.source || 'website',
      ipAddress: request.headers.get('x-forwarded-for') || 'Unknown',
      userAgent: request.headers.get('user-agent') || 'Unknown',
    }

    // Save to CSV file (for backup)
    const csvDir = path.join(process.cwd(), 'data')
    const csvFile = path.join(csvDir, 'leads.csv')
    
    try {
      await fs.mkdir(csvDir, { recursive: true })
      
      // Check if file exists to add header
      let fileExists = false
      try {
        await fs.access(csvFile)
        fileExists = true
      } catch {
        fileExists = false
      }

      // Prepare CSV row
      const csvRow = [
        leadData.timestamp,
        leadData.name,
        leadData.email,
        leadData.phone,
        leadData.postcode,
        leadData.gardenSize,
        leadData.timeframe,
        leadData.message.replace(/"/g, '""'), // Escape quotes
        leadData.source,
      ].map(field => `"${field}"`).join(',')

      // Add header if file doesn't exist
      if (!fileExists) {
        const header = 'Timestamp,Name,Email,Phone,Postcode,Garden Size,Timeframe,Message,Source\n'
        await fs.writeFile(csvFile, header)
      }

      // Append lead data
      await fs.appendFile(csvFile, csvRow + '\n')
    } catch (error) {
      console.error('Error saving to CSV:', error)
      // Continue processing even if CSV save fails
    }

    // Here you would typically:
    // 1. Send an email notification to admin
    // 2. Send a confirmation email to the customer
    // 3. Add to CRM system
    // 4. Trigger any automation workflows

    // For now, we'll just log it
    console.log('New lead received:', leadData)

    // Send email notification (pseudo-code - implement with your preferred email service)
    // await sendEmailNotification(leadData)

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Thank you for your enquiry. We will be in touch within 24 hours.',
      leadId: leadData.id,
    })

  } catch (error) {
    console.error('Lead processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again or call us directly.' },
      { status: 500 }
    )
  }
}

// Optional: Add GET endpoint for fetching leads (protected)
export async function GET(request: NextRequest) {
  // Add authentication here
  const authHeader = request.headers.get('authorization')
  
  if (authHeader !== `Bearer ${process.env.API_SECRET_KEY}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const csvFile = path.join(process.cwd(), 'data', 'leads.csv')
    const data = await fs.readFile(csvFile, 'utf-8')
    
    return NextResponse.json({
      success: true,
      data: data,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}