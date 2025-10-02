const reasons = [
  {
    number: '01',
    title: 'Expert Installation Team',
    description: 'Our skilled installers have years of experience and take pride in delivering flawless results every time.',
  },
  {
    number: '02',
    title: 'Premium Quality Products',
    description: 'We only use the highest quality artificial grass that looks and feels incredibly realistic.',
  },
  {
    number: '03',
    title: 'Competitive Pricing',
    description: 'Get the best value for money with our transparent pricing and no hidden costs.',
  },
  {
    number: '04',
    title: 'Local & Trusted',
    description: 'As a local Oldham business, we&apos;re committed to serving our community with excellence.',
  },
]

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-primary-black text-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-responsive-3xl font-bold mb-6">
              Why Choose <span className="text-yellow-300">Artificial Grass Oldham?</span>
            </h2>
            <p className="text-responsive-lg text-gray-300 mb-8">
              With over 10 years of experience transforming gardens across Oldham and 
              Greater Manchester, we&apos;ve built our reputation on quality, reliability, 
              and exceptional customer service.
            </p>

            {/* Reasons List */}
            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <div key={index} className="flex gap-4">
                  <div className="text-4xl font-bold text-accent-green opacity-50">
                    {reason.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{reason.title}</h3>
                    <p className="text-gray-400">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-bold text-yellow-300 mb-2">500+</div>
                  <p className="text-gray-300">Happy Customers</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-bold text-yellow-300 mb-2">15+</div>
                  <p className="text-gray-300">Years Experience</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-bold text-yellow-300 mb-2">100%</div>
                  <p className="text-gray-300">Satisfaction Rate</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-bold text-yellow-300 mb-2">10yr</div>
                  <p className="text-gray-300">Guarantee</p>
                </div>
              </div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-green/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs