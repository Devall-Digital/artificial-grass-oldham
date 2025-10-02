import Hero from '@/components/home/Hero'
import Benefits from '@/components/home/Benefits'
import Services from '@/components/home/Services'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import Process from '@/components/home/Process'
import Gallery from '@/components/home/Gallery'
import Testimonials from '@/components/home/Testimonials'
import Areas from '@/components/home/Areas'
import FAQ from '@/components/home/FAQ'
import CTA from '@/components/home/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Services />
      <WhyChooseUs />
      <Process />
      <Gallery />
      <Testimonials />
      <Areas />
      <FAQ />
      <CTA />
    </>
  )
}