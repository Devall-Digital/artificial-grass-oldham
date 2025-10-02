'use client'

import { useState } from 'react'
import Image from 'next/image'
import QuoteModal from '@/components/QuoteModal'

const Hero = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full bg-gradient-to-br from-accent-green/90 to-light-green/90">
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white space-y-6">
            <h1 className="text-responsive-4xl font-extrabold leading-tight animate-fade-in-up">
              Transform Your Garden with Premium{' '}
              <span className="text-yellow-300">Artificial Grass</span>
            </h1>
            <p className="text-responsive-lg text-gray-100 animate-fade-in-up animation-delay-200">
              Professional artificial grass installation in Oldham, Saddleworth, 
              Uppermill, and across Greater Manchester. Enjoy a beautiful, 
              maintenance-free lawn all year round.
            </p>
            
            {/* Features */}
            <ul className="space-y-3 animate-fade-in-up animation-delay-400">
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-yellow-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>10-Year Manufacturer&apos;s Guarantee</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-yellow-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free No-Obligation Quotes</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-yellow-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Expert Installation Team</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-yellow-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Pet & Child-Friendly Options</span>
              </li>
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up animation-delay-600">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="btn bg-yellow-400 text-primary-black hover:bg-yellow-300 focus:ring-yellow-400 font-semibold text-lg px-8 py-4"
              >
                Get Your Free Quote
              </button>
              <a
                href="tel:+441611234567"
                className="btn btn-secondary bg-white/10 border-white text-white hover:bg-white hover:text-primary-black text-lg px-8 py-4"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call: 0161 123 4567
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-4 animate-fade-in-up animation-delay-600">
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h2a1 1 0 100 2H6a4 4 0 01-4-4V5a4 4 0 014-4h5a1 1 0 011 1v1a1 1 0 11-2 0V3H6a2 2 0 00-2 2z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">100+ 5★ Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Best Price Guarantee</span>
              </div>
            </div>
          </div>

          {/* Image/Visual Element */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 to-transparent rounded-3xl" />
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Why Choose Artificial Grass?
                </h3>
                <ul className="space-y-4 text-white">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-300 text-2xl">✓</span>
                    <div>
                      <strong>No More Mowing</strong>
                      <p className="text-sm text-gray-200">Save hours every week on lawn maintenance</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-300 text-2xl">✓</span>
                    <div>
                      <strong>Always Green</strong>
                      <p className="text-sm text-gray-200">Perfect lawn 365 days a year, rain or shine</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-300 text-2xl">✓</span>
                    <div>
                      <strong>Pet Friendly</strong>
                      <p className="text-sm text-gray-200">Durable, easy to clean, no muddy paws</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-300 text-2xl">✓</span>
                    <div>
                      <strong>Cost Effective</strong>
                      <p className="text-sm text-gray-200">No watering, fertilizing, or lawn treatments</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Quote Modal */}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </section>
  )
}

export default Hero