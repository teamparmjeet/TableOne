"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function NoiseSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-white py-24 px-6 select-none overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[#1c1412] overflow-hidden ">

        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 2],
          }}
          transition={{
            duration: 80, // Zoom speed
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop", // Restarts from scale 1
          }}
        >
          <Image
            src="/street-photo.jpg"
            alt="Atmospheric Street Photo"
            fill
            priority
            className="pointer-events-none object-cover object-[100%_0%]"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[#40404040]/25" />
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center space-y-10 md:space-y-12">
        <h3 className="   uppercase  tracking-[1px]  Note2 text-stone-100 max-w-175">
          Most of what passes for conversation is noise. Panels. Podcasts.
          Networking. People waiting for their turn to speak. We move fast. We
          skim, we scroll and something essential in us has thinned.
        </h3>
      </div>
    </section>
  );
}