"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import FadeInSection from "./FadeInSection";
const hosts = {
  anil: {
    name: "Anil Godhwani",
    title: "Co-founder, community builder, and CEO of Habitera Farms",
    text: `Anil has spent decades building companies, backing entrepreneurs, and creating communities across Silicon Valley and beyond.

He co-founded AtWeb and Simply Hired before establishing the India Community Center, and is now CEO of Habitera Farms, designing the future of experiential farming.

Beyond his work, Anil has long been drawn to conversations that expand perspectives. Through travel and lifelong learning, he continues to seek out people and ideas that challenge his worldview.`,
  },
  manu: {
    name: "Manu Rekhi",
    title: "Investor, advisor, and Managing Director at SVQ GO and Inventus",
    text: `Manu has built consumer businesses at Google, LoLapps, and NewsCorp.

Today, as Managing Director at SVQ GO and Inventus, he invests in and advises startups that have been acquired, gone public, or reached unicorn scale.

Beyond his work, Manu has spent over a decade hosting intimate gatherings that bring diverse people together for conversations that stay with them long after they end.`,
  },
};

type HostKey = keyof typeof hosts;

export default function Hosts() {
  const [activeHost, setActiveHost] = useState<HostKey | null>(null);

  const host = activeHost ? hosts[activeHost] : null;
  return (
    <section className="w-full bg-[#B54323] py-20 md:py-28 lg:py-36 px-6">
      <FadeInSection>
        <div className="mx-auto max-w-6xl">

          {/* Top Label */}
          <div className="  flex justify-center">

            <span className=" Note3 text-[#F0EEE5]   tracking-[0.4em] uppercase mb-10 md:mb-16 flex items-center pl-[0.4em]">

              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mr-4 h-px bg-[#F0EEE5]"
              />
              HOSTS
            </span>
          </div>

          {/* Heading */}
          <h2 className="mx-auto max-w-3xl text-center   leading-none text-[#FFF4E7]  Title1 mb-10 md:mb-16">
            Come, sit with us
          </h2>

          {/* Description */}
          <p className="mx-auto     max-w-[540] text-center  body2 leading-tight text-[#F6E9DD]/90  mb-10 md:mb-16">
            Anil and Manu created Table One because they missed having real conversations, the kind that challenge assumptions, deepen perspective, and leave you changed.
          </p>

          {/* Main Layout */}
          <div className="  flex flex-col items-center justify-center gap-10 lg:flex-row lg:items-center lg:gap-16">

            {/* Left */}
            <div className="order-2 hidden lg:block lg:order-1 lg:w-52 text-center lg:text-right">
              <button
                onClick={() => setActiveHost("anil")}
                className=" Title4 text-[#FFF4E7]   transition hover:opacity-80"
              >
                Anil Godhwani
              </button>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="overflow-hidden">
                <Image
                  src="/meeting.png"
                  alt="Hosts"
                  width={420}
                  height={600}
                  className="h-120 w-85 object-cover md:h-140 md:w-100"
                />
              </div>

              <div className=" absolute  left-0 right-0 top-28 flex justify-evenly gap-2">
                <button
                  onClick={() => setActiveHost("anil")}
                  className="  Title4 block lg:hidden  text-[#FFF4E7] text-sm   transition hover:opacity-80"
                >
                  Anil Godhwani
                </button>

                <button
                  onClick={() => setActiveHost("manu")}
                  className="  Title4 block lg:hidden  text-[#FFF4E7] text-sm   transition hover:opacity-80"
                >
                  Manu Rekhi
                </button>
              </div>

            </div>

            {/* Right */}
            <div className="order-3 hidden lg:block lg:w-52 text-center lg:text-left">
              <button
                onClick={() => setActiveHost("manu")}
                className="  Title4 text-[#FFF4E7]   transition hover:opacity-80"
              >
                Manu Rekhi
              </button>
            </div>

          </div>
        </div>

        {host && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#202A44]/70 p-3 sm:p-5 md:p-8 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="
        relative
        w-full
        max-w-4xl
        max-h-[92vh]
        overflow-y-auto
        bg-[#F0EEE5]
        px-5
        py-6
        sm:px-7
        sm:py-8
        md:px-10
        md:py-10
        lg:px-12
        lg:py-12
        shadow-2xl
      "
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveHost(null)}
                className="absolute right-4 top-4 rounded-full p-2 transition hover:bg-[#36473F]/10 hover:text-[#B54323]"
              >
                <X size={22} />
              </button>

              {/* Label */}
              <span className="Note3 uppercase tracking-[0.3em] text-[#B54323]">
                About the host
              </span>

              {/* Name */}
              <h3
                className="
          mt-4
         Title1
          leading-none
          text-[#36473F] 
          break-words
        "
              >
                {host.name}
              </h3>

             

              {/* Description */}
              <div
                className="
          mt-7
          space-y-5
         body2
          leading-7
          md:leading-8
          text-[#202A44]/85
        "
              >
                {host.text.split("\n\n").map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
 

              {/* Footer */}
              <p
                className="
          body2 mt-7
          leading-relaxed
          text-[#B54323]
        "
              >
                Table One grew out of a shared instinct, a chance meeting and a
                common search for insight that became the start of something more
                intentional.
              </p>
            </motion.div>
          </div>
        )}
      </FadeInSection>
    </section>
  );
}