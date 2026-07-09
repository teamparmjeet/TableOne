import FadeInSection from "./FadeInSection"
export default function QuoteSection() {
  return (
    <section className="w-full bg-[#202A44] py-24 md:py-32 px-6 md:px-12 flex items-center justify-center select-none overflow-hidden">
      <FadeInSection>
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Quote Block - Utilizing BN Cringe Serif for fluid, premium aesthetic */}
        <blockquote className="Title2 text-[#F0EEE5] leading-tight md:leading-[1.2] max-w-[820] mx-auto tracking-normal  ">
          “Some of the most meaningful shifts in our lives come from a single good conversation.”
        </blockquote>

      </div>
      </FadeInSection>
    </section>
  )
}