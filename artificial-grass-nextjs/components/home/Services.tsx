'use client'

import { useState } from 'react'
import Link from 'next/link'
import QuoteModal from '@/components/QuoteModal'

const services = [
  {
    title: 'Residential Installation',
    description: 'Transform your home garden with premium artificial grass. Perfect for families, pet owners, and anyone wanting a beautiful, low-maintenance lawn.',
    features: [
      'Free site survey and quote',
      'Premium grass options',
      'Professional installation',
      'Full ground preparation',
      '10-year guarantee',
    ],
    image: '/images/residential-grass.jpg',
    link: '/services/residential',
  },
  {
    title: 'Commercial Projects',
    description: 'High-quality artificial grass solutions for businesses, schools, nurseries, and commercial properties. Durable and cost-effective.',
    features: [
      'Heavy-duty grass options',
      'Large area specialists',
      'Minimal disruption',
      'Maintenance packages',
      'Commercial warranties',
    ],
    image: '/images/commercial-grass.jpg',
    link: '/services/commercial',
  },
  {
    title: 'Garden Replacement',
    description: 'Replace your tired, patchy lawn with beautiful artificial grass. We handle everything from removal to installation.',
    features: [
      'Old lawn removal',
      'Ground leveling',
      'Drainage solutions',
      'Weed prevention',
      'Same-day quotes',
    ],
    image: '/images/replacement-grass.jpg',
    link: '/services/replacement',
  },
]

const Services = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  return (
    <section id="services" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-responsive-3xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-responsive-lg text-gray-600">
            From residential gardens to commercial projects, we provide comprehensive 
            artificial grass solutions tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card group hover:transform hover:scale-105 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-accent-green to-light-green overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white text-center px-4">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="flex gap-3">
                  <Link
                    href={service.link}
                    className="btn btn-primary btn-sm flex-1 text-center"
                  >
                    Learn More
                  </Link>
                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="btn btn-secondary btn-sm flex-1"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mt-12 bg-gradient-green text-white rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Need Something Specific?
              </h3>
              <p className="mb-6">
                We also offer specialized services including putting greens, 
                play areas, rooftop gardens, and custom designs. Whatever your 
                vision, we can make it happen.
              </p>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="btn bg-white text-accent-green hover:bg-gray-100"
              >
                Discuss Your Project
              </button>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-white/10 rounded-full">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="mt-4 text-lg font-semibold">Custom Solutions Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </section>
  )
}

export default Services