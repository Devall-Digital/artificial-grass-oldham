export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  // UK phone number validation
  const phoneRegex = /^(\+44|0)[0-9\s\-]{9,}$/
  const cleaned = phone.replace(/\s/g, '')
  return phoneRegex.test(cleaned)
}

export const validatePostcode = (postcode: string): boolean => {
  // UK postcode validation
  const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i
  const cleaned = postcode.replace(/\s/g, '').toUpperCase()
  return postcodeRegex.test(postcode) || postcodeRegex.test(cleaned)
}

export const formatPhone = (phone: string): string => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '')
  
  // Format UK phone numbers
  if (cleaned.startsWith('44')) {
    return '+44 ' + cleaned.slice(2)
  } else if (cleaned.startsWith('0')) {
    // Format as UK local number
    if (cleaned.length >= 11) {
      return cleaned.slice(0, 5) + ' ' + cleaned.slice(5, 8) + ' ' + cleaned.slice(8)
    }
  }
  
  return phone
}

export const formatPostcode = (postcode: string): string => {
  const cleaned = postcode.toUpperCase().replace(/[^A-Z0-9]/g, '')
  
  // Format UK postcode (e.g., OL11XX -> OL1 1XX)
  if (cleaned.length >= 5) {
    return cleaned.slice(0, -3) + ' ' + cleaned.slice(-3)
  }
  
  return cleaned
}