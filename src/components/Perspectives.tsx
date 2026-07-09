"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
type Blog = {
    id: number;
    title: string;
    date: string;
    location: string;
    category: string;
};
import FadeInSection from "./FadeInSection";
import Link from "next/link";
export default function Perspectives() {
    const numRows = 20;
    const numCols = 20;
    const totalDots = numRows * numCols;
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("/api/blog", {
                    cache: "no-store",
                });

                const data = await res.json();

                if (data.success) {
                    setBlogs(data.data || data.blogs || []);
                }
            } catch (error) {
                console.error("BLOG FETCH ERROR:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const formatDate = (date: string) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-GB").replaceAll("/", ".");
    };


    return (
        <section className="w-full bg-[#CBD9D7] py-24 md:py-36 px-6 md:px-12 selection:bg-stone-300 select-none">
            <FadeInSection>
                <div className="max-w-5xl mx-auto flex flex-col items-center text-center">

                    {/* Section Label - Pitch Sans with Horizontal Left-Accent Line */}

                    <span className="  text-[#B54323] text-[11px]  Note3 tracking-[0.4em] uppercase mb-10 md:mb-16 flex items-center pl-[0.4em]">

                        <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: "6rem" }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mr-4 h-px bg-[#B54323]"
                        />
                        Perspectives
                    </span>
                    {/* Core Message Display - BN Cringe Serif */}
                    <h2 className=" Title1 text-[#202A44] max-w-5xl leading-[1.2] md:leading-[1.12] tracking-normal mb-10 md:mb-16">
                        Depth is not accidental,<br></br> <span className="text-[#B54323]">

                            it is crafted, perceived.
                        </span>

                    </h2>
                    <p className="body1 font-normal leading-tight mb-10 md:mb-16 text-[#202A44]">
                        Come prepared. Come curious.
                        <br className="block md:hidden" />
                        <span className="hidden md:inline"> </span>
                        Come present.
                    </p>




                    <motion.div
                        className="relative w-38 h-38 md:w-45 md:h-45 flex items-center justify-center  mb-10 md:mb-16  group"
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
                                maskImage: 'url(/eye.png)',
                                maskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                maskPosition: 'center',
                                WebkitMaskImage: 'url(/eye.png)',
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
                {/* Perspective Cards */}
                <div className="mx-auto   w-full max-w-5xl">
                    <div
                        className="
      grid
      grid-cols-1
      gap-6

      md:grid-cols-2
      md:gap-0
      lg:grid-cols-3

      md:border
      md:border-[#B54323]
      md:divide-x
      md:divide-y
      md:divide-[#B54323]
    "
                    >
                        {blogs.map((blog) => (
                            <a
                            href="/Blog"
                                key={blog.id}
                                className="
          group
          min-h-80
          cursor-pointer
          flex flex-col justify-between
          p-8
          duration-300
          hover:bg-[#F0EEE5]

          border border-[#B54323]/40
          
        "
                            >
                                <div className="md:w-[80%]">
                                    <p className="mb-4 Note3 uppercase text-[#B54323]">
                                        {formatDate(blog.date)} • {blog.location}
                                    </p>

                                    <h3 className="Title4 leading-[1.12] text-[#202A44]">
                                        {blog.title}
                                    </h3>
                                </div>

                                <div className="mt-14">
                                    <div className="mb-4 h-px w-full bg-[#C8BDB5]" />

                                    <span className="Note3 uppercase text-[#B54323]">
                                        {blog.category}
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </FadeInSection>
        </section>
    )
}
