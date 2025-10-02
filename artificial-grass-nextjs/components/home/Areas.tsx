const areas = [
  { name: 'Oldham', description: 'Covering all areas of Oldham including town center and suburbs' },
  { name: 'Saddleworth', description: 'Greenfield, Uppermill, Dobcross, Delph, and Diggle' },
  { name: 'Royton', description: 'All areas including Holden Fold, Derker, and Shaw' },
  { name: 'Chadderton', description: 'Including Middleton Junction and surrounding areas' },
  { name: 'Failsworth', description: 'Hollinwood, Woodhouses, and nearby locations' },
  { name: 'Greater Manchester', description: 'Ashton, Rochdale, Bury, and surrounding areas' },
]

const Areas = () => {
  return (
    <section id="areas" className="section-padding bg-gradient-green text-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-responsive-3xl font-bold mb-4">
            Areas We <span className="text-yellow-300">Cover</span>
          </h2>
          <p className="text-responsive-lg text-green-100">
            We provide professional artificial grass installation services across 
            Oldham and Greater Manchester. No matter where you are, we&apos;re here to help.
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {areas.map((area, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {area.name}
              </h3>
              <p className="text-green-100 text-sm">{area.description}</p>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Serving Oldham & Beyond
              </h3>
              <p className="text-green-100 mb-6">
                As a local business based in Oldham, we&apos;re proud to serve our 
                community and surrounding areas. We typically cover a 15-mile radius 
                from Oldham town center, ensuring prompt service and competitive pricing.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free quotes within our service area</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Same-day site visits available</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Local knowledge and expertise</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+441611234567"
                  className="btn bg-white text-accent-green hover:bg-gray-100"
                >
                  Check Your Area
                </a>
              </div>
            </div>
            <div className="relative h-80 bg-white/5 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <svg className="w-24 h-24 mx-auto mb-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-white/40">Interactive map coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Not in list CTA */}
        <div className="text-center mt-8">
          <p className="text-green-100 mb-4">
            Don&apos;t see your area listed? Give us a call - we may still be able to help!
          </p>
          <a
            href="tel:+441611234567"
            className="inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-200 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            0161 123 4567
          </a>
        </div>
      </div>
    </section>
  )
}

export default Areas