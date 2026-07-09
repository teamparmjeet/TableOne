"use client"
import Image from 'next/image'
import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";



export default function Conversation() {
    const numRows = 20;
    const numCols = 20;
    const totalDots = numRows * numCols;
    return (
        <section className="w-full bg-[#B54323] py-24 md:py-36 px-6 md:px-12 selection:bg-stone-300 select-none">
            <FadeInSection>
                <div className="max-w-5xl mx-auto flex flex-col items-center text-center">

                    {/* Section Label - Pitch Sans with Horizontal Left-Accent Line */}
                    <span className="Note3 text-[#F0EEE5]  tracking-[0.4em] uppercase mb-10 md:mb-16 flex items-center pl-[0.4em]">

                        <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: "6rem" }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mr-4 h-px bg-[#F0EEE5]"
                        />
                        CONVERSATIONS
                    </span>

                    {/* Core Message Display - BN Cringe Serif */}
                    <h2 className="Title1 text-[#F0EEE5] max-w-5xl mb-2 md:mb-0  leading-[1.2] md:leading-[1.12] tracking-normal">
                        Five people. One table. One question.
                    </h2>
                    <p className="Title3 text-[#202A44] mb-10 md:mb-16">
                        No audience. No phones.
                    </p>

                    <motion.div
                        className="relative w-38 h-38 md:w-45 md:h-45 flex items-center justify-center mt-8 group"
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
                                    className="w-[5px] h-[5px] bg-[#202a44] rounded-full justify-self-center align-self-center"
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
                                backgroundColor: '#202a44',
                                maskImage: 'url(/face-for-center.png)',
                                maskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                maskPosition: 'center',
                                WebkitMaskImage: 'url(/face-for-center.png)',
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

                </div>
            </FadeInSection>
        </section>
    )
}




