'use client'

import { useState, useEffect } from 'react'
import { useForm } from '@/hooks/useForm'
import { validateEmail, validatePhone, validatePostcode } from '@/utils/validation'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
}

const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setError,
    resetForm,
  } = useForm({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    gardenSize: '',
    timeframe: '',
    message: '',
  })

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: any = {}
    
    if (!values.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!validateEmail(values.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!validatePhone(values.phone)) {
      newErrors.phone = 'Please enter a valid UK phone number'
    }
    
    if (!validatePostcode(values.postcode)) {
      newErrors.postcode = 'Please enter a valid UK postcode'
    }

    if (Object.keys(newErrors).length > 0) {
      Object.keys(newErrors).forEach(key => {
        setError(key, newErrors[key])
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          source: 'quote-modal',
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      // Show success message
      setShowSuccess(true)
      resetForm()

      // Close modal after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
      }, 3000)

    } catch (error) {
      console.error('Form submission error:', error)
      setError('form', 'Something went wrong. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-fade-in-up">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="bg-gradient-green text-white p-6 rounded-t-2xl">
            <h2 className="text-2xl md:text-3xl font-bold">Get Your Free Quote</h2>
            <p className="mt-2 text-green-100">
              Fill in the form below and we&apos;ll get back to you within 24 hours
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {showSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-success-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-success-green mb-2">Thank You!</h3>
                <p className="text-gray-600">We&apos;ve received your quote request and will be in touch soon.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="label">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input ${errors.name ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="label">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input ${errors.email ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="label">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input ${errors.phone ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Postcode */}
                  <div>
                    <label htmlFor="postcode" className="label">
                      Postcode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="postcode"
                      name="postcode"
                      value={values.postcode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input ${errors.postcode ? 'border-red-500' : ''}`}
                      placeholder="e.g. OL1 1AA"
                      required
                    />
                    {errors.postcode && (
                      <p className="text-red-500 text-sm mt-1">{errors.postcode}</p>
                    )}
                  </div>

                  {/* Garden Size */}
                  <div>
                    <label htmlFor="gardenSize" className="label">
                      Approximate Garden Size
                    </label>
                    <select
                      id="gardenSize"
                      name="gardenSize"
                      value={values.gardenSize}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="">Select size</option>
                      <option value="small">Small (up to 50m²)</option>
                      <option value="medium">Medium (50-100m²)</option>
                      <option value="large">Large (100-200m²)</option>
                      <option value="xlarge">Extra Large (200m²+)</option>
                    </select>
                  </div>

                  {/* Timeframe */}
                  <div>
                    <label htmlFor="timeframe" className="label">
                      When do you need this?
                    </label>
                    <select
                      id="timeframe"
                      name="timeframe"
                      value={values.timeframe}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="">Select timeframe</option>
                      <option value="asap">As soon as possible</option>
                      <option value="month">Within a month</option>
                      <option value="quarter">Within 3 months</option>
                      <option value="planning">Just planning</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="label">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    rows={4}
                    className="input resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Error message */}
                {errors.form && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {errors.form}
                  </div>
                )}

                {/* Submit button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner mr-2" />
                        Sending...
                      </>
                    ) : (
                      'Get My Free Quote'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>

                {/* Privacy note */}
                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to our{' '}
                  <a href="/privacy" className="text-accent-green hover:underline">
                    Privacy Policy
                  </a>
                  . We will never share your information with third parties.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default QuoteModal