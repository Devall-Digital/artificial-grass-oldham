'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'How long does artificial grass last?',
    answer: 'Our premium artificial grass comes with a 10-year manufacturer&apos;s guarantee and can last 15-20 years or more with proper care. The lifespan depends on usage and maintenance, but it&apos;s designed to withstand heavy foot traffic and all weather conditions.',
  },
  {
    question: 'Is artificial grass pet-friendly?',
    answer: 'Absolutely! Our artificial grass is specifically designed to be pet-friendly. It&apos;s durable enough to withstand pet activity, easy to clean, and has excellent drainage for pet waste. Simply hose down and use pet-friendly cleaners as needed.',
  },
  {
    question: 'How much does artificial grass installation cost?',
    answer: 'Costs vary depending on the size of your garden, ground preparation needed, and the type of grass chosen. We offer free, no-obligation quotes and competitive pricing. Most customers find it cost-effective compared to ongoing lawn maintenance.',
  },
  {
    question: 'Does artificial grass look realistic?',
    answer: 'Modern artificial grass looks incredibly realistic with varied blade colors, textures, and heights that mimic natural grass. Many visitors won&apos;t even notice it&apos;s artificial until they touch it!',
  },
  {
    question: 'What maintenance does artificial grass require?',
    answer: 'Artificial grass requires minimal maintenance - just occasional brushing to keep the blades upright, removing debris, and an occasional rinse. No mowing, watering, or fertilizing needed!',
  },
  {
    question: 'How long does installation take?',
    answer: 'Most residential installations are completed within 1-2 days, depending on the size and complexity of the project. We&apos;ll provide a timeline during your free consultation.',
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-responsive-3xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-responsive-lg text-gray-600">
            Got questions about artificial grass? We&apos;ve got answers. 
            Can&apos;t find what you&apos;re looking for? Just give us a call!
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                <svg
                  className={`w-5 h-5 text-accent-green flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12 p-8 bg-light-gray rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6">
            Our friendly team is here to help. Get in touch for expert advice and a free quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+441611234567"
              className="btn btn-primary"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call: 0161 123 4567
            </a>
            <a
              href="/contact"
              className="btn btn-secondary"
            >
              Send Us a Message
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ