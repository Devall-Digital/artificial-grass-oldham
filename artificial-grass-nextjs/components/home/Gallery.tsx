'use client'

import { useState } from 'react'
import Link from 'next/link'

const galleryItems = [
  {
    id: 1,
    title: 'Modern Family Garden',
    location: 'Oldham',
    type: 'Residential',
    before: '/images/gallery/before-1.jpg',
    after: '/images/gallery/after-1.jpg',
  },
  {
    id: 2,
    title: 'Pet-Friendly Lawn',
    location: 'Saddleworth',
    type: 'Residential',
    before: '/images/gallery/before-2.jpg',
    after: '/images/gallery/after-2.jpg',
  },
  {
    id: 3,
    title: 'School Play Area',
    location: 'Uppermill',
    type: 'Commercial',
    before: '/images/gallery/before-3.jpg',
    after: '/images/gallery/after-3.jpg',
  },
  {
    id: 4,
    title: 'Garden Makeover',
    location: 'Delph',
    type: 'Residential',
    before: '/images/gallery/before-4.jpg',
    after: '/images/gallery/after-4.jpg',
  },
]

const Gallery = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'residential' | 'commercial'>('all')

  const filteredItems = galleryItems.filter(item => 
    activeTab === 'all' || item.type.toLowerCase() === activeTab
  )

  return (
    <section className="section-padding bg-light-gray">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-responsive-3xl font-bold mb-4">
            Our Recent <span className="gradient-text">Transformations</span>
          </h2>
          <p className="text-responsive-lg text-gray-600">
            See the amazing transformations we&apos;ve created for homes and businesses 
            across Oldham and Greater Manchester.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
              activeTab === 'all'
                ? 'bg-accent-green text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setActiveTab('residential')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
              activeTab === 'residential'
                ? 'bg-accent-green text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Residential
          </button>
          <button
            onClick={() => setActiveTab('commercial')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
              activeTab === 'commercial'
                ? 'bg-accent-green text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Commercial
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Before/After Slider */}
              <div className="relative h-80 overflow-hidden">
                {/* After Image (default view) */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-green to-light-green">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-lg mb-1">{item.location}</p>
                      <p className="text-sm opacity-90">{item.type} Project</p>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-white text-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <div className="mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">View Details</p>
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm text-accent-green px-3 py-1 rounded-full text-sm font-semibold">
                  Before & After
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View More CTA */}
        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="btn btn-primary"
          >
            View Full Gallery
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Gallery