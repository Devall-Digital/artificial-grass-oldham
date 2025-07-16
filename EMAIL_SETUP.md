# 📧 Email Setup Guide - Artificial Grass Oldham

## 🎯 Email Configuration Required

Your website is now fully functional and ready to capture leads! However, you need to set up the email addresses for lead notifications.

## 📋 Required Email Addresses

### 1. Your Business Email
**File to edit**: `process-lead.php` (Line 67)
**Current setting**: `info@artificialgrassoldham.co.uk`
**Action needed**: Create this email address in your 20i hosting platform

### 2. Partner Email (Optional)
**File to edit**: `process-lead.php` (Line 68)
**Current setting**: `leads@unreallawns.co.uk`
**Action needed**: Update this to your actual partner's email address

## 🛠️ How to Create Email Addresses in 20i

1. **Log into your 20i hosting control panel**
2. **Navigate to Email section**
3. **Create new email addresses**:
   - `info@artificialgrassoldham.co.uk` (for your business)
   - Any additional emails you need

## 📧 Email Configuration Details

### Lead Notification Emails
When someone submits a quote request, the system will send:

1. **To you**: Complete lead details including:
   - Customer name, phone, email, postcode
   - Garden size and timeframe
   - Source tracking information
   - Timestamp and IP address

2. **To partner** (if configured): Summary of lead details

### Email Content Example
```
Subject: New Artificial Grass Lead - John Smith

New lead received:

Timestamp: 2024-12-15 14:30:25
Name: John Smith
Phone: 0161 123 4567
Email: john@example.com
Postcode: OL1 1XX
Garden Size: Medium (25-50m²)
Timeframe: Within 1 month
Source: artificial-grass-oldham-website
Partner: unreal-lawns
IP Address: 192.168.1.1
```

## 🔧 Testing the Email System

1. **Submit a test quote request** on your website
2. **Check your email** for the notification
3. **Verify all information** is correct
4. **Test partner email** if configured

## 📊 Lead Storage

All leads are also saved to: `leads/artificial-grass-leads.csv`

This CSV file contains all lead data for backup and analysis.

## 🚨 Important Notes

- **Email sending is currently ENABLED** in production mode
- **Leads will be sent immediately** when forms are submitted
- **Check your spam folder** if you don't receive emails
- **Update partner email** before going live if needed

## 📞 Support

If you need help setting up emails in 20i:
- Contact 20i support for email setup assistance
- Check 20i knowledge base for email configuration guides

## ✅ Next Steps

1. ✅ Create `info@artificialgrassoldham.co.uk` email in 20i
2. ✅ Update partner email in `process-lead.php` if needed
3. ✅ Test form submission and email delivery
4. ✅ Website is ready for live traffic!

---

**Your website is now fully functional and ready to capture leads!** 🎉