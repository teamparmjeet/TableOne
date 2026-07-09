"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
export default function TableOneSection() {
  const numRows = 20;
  const numCols = 20;
  const totalDots = numRows * numCols;
  return (
    <section className="w-full bg-[#F0EEE5] py-24 md:py-36 px-6 md:px-12    selection:bg-stone-300 select-none">
      <FadeInSection>
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">

          {/* Label */}
          <span className="mb-10  md:mb-16 flex items-center pl-[0.4em] Note2 uppercase tracking-[0.4em] text-[#C6603F]">

            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mr-4 h-px bg-[#C6603F]"
            />
            Community
          </span>

          {/* Heading */}
          <h2 className="max-w-5xl Title1 text-[#36473F] leading-[1.15]
          text-[34px]
          sm:text-[44px]
          md:text-[54px]
          lg:text-[62px]">
            Table One is{" "}
            <span className="text-[#C6603F]">for the curious</span>
          </h2>

          {/* Subtitle */}
          <p
            className="
           mb-10  md:mb-16
            max-w-[550]
            sm:my-14
            lg:my-20
           body1
            text-[#C6603F]
            leading-tight 
          "
          >
            Those who wish to see the world differently.

            Those who stay with the question.

            Those who seek deeper truth and real connection.
          </p>


          <motion.div
            className="relative w-38 h-38 md:w-45 md:h-45 flex items-center justify-center   group mb-10 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >

            {/* 1. Dotted Overlay Layer (Disintegrates) */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden grid pointer-events-none z-10 "
              style={{
                gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${numRows}, minmax(0, 1fr))`
              }}
            >
              {[...Array(totalDots)].map((_, index) => (
                <motion.div
                  key={index}
                  className="w-[5px] h-[5px] bg-[#C6603F] rounded-full justify-self-center align-self-center"
                  variants={{
                    hidden: { opacity: 0.9, scale: 1, y: 0 },
                    visible: {
                      opacity: 0,
                      scale: 0,
                      y: Math.random() * -16 - 6 // Disperses slightly upwards like ash/smoke
                    }
                  }}
                  transition={{
                    delay: Math.random() * 0.7, // Asynchronous dissipation spark
                    duration: 1,
                    ease: [0.215, 0.610, 0.355, 1.000], // Cubic ease-out
                  }}
                />
              ))}
            </div>

            {/* 2. Main Masked Emblem Layer (Smoothly Resolves) */}
            <motion.div
              className="relative w-full h-full rounded-full"
              style={{
                backgroundColor: '#C6603F',
                maskImage: 'url(/redhand.png)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskImage: 'url(/redhand.png)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
              }}
              aria-label="Table One Emblem"
              variants={{
                hidden: { opacity: 0, scale: 0.88, filter: 'blur(6px)' },
                visible: { opacity: 1, scale: 1, filter: 'blur(0px)' }
              }}
              transition={{
                delay: 0.2, // Begins fading in as the cloud structure bursts
                duration: 1.6,
                ease: [0.16, 1, 0.3, 1], // Custom sleek easeOutExpo curve
              }}
            />
          </motion.div>

          {/* Features */}
          <div
            className="
           mb-10 md:mb-16
            grid
            w-full
            grid-cols-1
            gap-10
            sm:grid-cols-2
            sm:gap-10
            lg:grid-cols-3
            lg:gap-20
          "
          >
            {[
              "Forces of\nnature",
              "Intellectually\nhungry",
              "Active\ncontributors",
            ].map((item) => (
              <h3
                key={item}
                className="
                whitespace-pre-line
                 Title2
                text-[#36473F]
                leading-[0.95] 
              "
              >
                {item}
              </h3>
            ))}
          </div>

          {/* Image */}
          <div className="mx-auto mb-12 sm:mb-16 lg:mb-20 w-[90%] overflow-hidden rounded-sm">
            <Image
              src="/Groupmeating.png"
              alt="Community discussion"
              width={700}
              height={450}
              className="h-[240] w-full object-cover sm:h-[360] md:h-[450] lg:h-[560]"
            />
          </div>

          {/* Bottom Text */}
          <p
            className="
            Note1
            uppercase
            leading-tight
            text-[#B54323] 
          "
          >
            A community crafted across disciplines, geographies and ikigai.

            They are here, simply because they miss having a real conversation.
          </p>
        </div>
      </FadeInSection>
    </section>
  );
}