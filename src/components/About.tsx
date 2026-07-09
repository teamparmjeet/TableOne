"use client"
import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
export default function About() {
    return (
        <section className="w-full bg-[#F0EEE5] text-white py-24 md:py-36 px-6 md:px-12 selection:bg-stone-700 select-none">
            <FadeInSection>
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

                    {/* Section Label - Pitch Sans */}
                    <span className="Note2 text-[#C6603F]  tracking-[0.4em]  uppercase mb-10 md:mb-16 flex items-center pl-[0.4em]">

                        <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: "6rem" }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mr-4 h-px bg-[#C6603F]"
                        />
                        ABOUT
                    </span>


                    {/* Core Message Display - BN Cringe Serif */}
                    <h2 className=" Title1 text-[#36473F] max-w-[700] leading-[1.2] md:leading-[1.15]  ">
                        Table One is symbolic
                        of the first time you had <br></br>
                        <span className="text-[#B54323]"> a real conversation </span> <br></br>
                        and an invitation to
                        have them again.
                    </h2>



                </div>
            </FadeInSection>
        </section>
    )
}