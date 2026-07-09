// src/app/page.tsx
import Header from '@/components/Header'
import Banner from '@/components/Banner'
import Footer from '@/components/Footer'
import About from '@/components/About'
import Conversation from '@/components/Conversation'
import NoiseSection from '@/components/NoiseSection'
import QuoteSection from '@/components/QuoteSection'
import TableOneSection from '@/components/TableOneSection'
import Perspectives from '@/components/Perspectives'
import Hosts from '@/components/Hosts'
import Request from '@/components/Request'
export default function Home() {
  return (
    <>
      {/* Header places absolutely over top transparently */}
      <Header />

       
      <main className="min-h-screen">
        <Banner />

        <section id="about">
          <About />
        </section>

        <section id="conversations">
          <Conversation />
        </section>

        <NoiseSection />
        <QuoteSection />

        <section id="community">
          <TableOneSection />
        </section>

        <section id="perspectives">
          <Perspectives />
        </section>

        <section id="hosts">
          <Hosts />
        </section>

        <section id="request-seat">
          <Request />
        </section>
      </main>
      <Footer />
    </>
  )
}