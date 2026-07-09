"use client";

import { useEffect } from "react";
import Image from 'next/image'

export default function Banner() {
    const scrollToAbout = () => {
        document.getElementById("about")?.scrollIntoView({
            behavior: "smooth",
        });
    };
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                scrollToAbout();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center text-white select-none overflow-hidden">

            {/* Background Banner Image */}
            <div className="absolute inset-0 -z-10 bg-stone-900">
                <Image
                    src="/banner-image.jpg"
                    alt="Table One Environment"
                    fill
                    priority
                    className="object-cover  opacity-85 mix-blend-lighten scale-105 pointer-events-none"
                />
                {/* Soft atmospheric overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-[#18477C99]/60 via-[#15273233]/20 to-[#1113152B]/17" />
            </div>

            {/* Centerpiece Hero Layout */}
            <div className="flex flex-col  px-4 max-w-4xl mt-16">

                {/* Large Central Crest/Logo Emblem */}
                <div className="relative w-38 self-center animation  h-38 md:w-45 md:h-45 flex items-center justify-center mb-8">
                    <Image
                        src="/t1-logo.svg"
                        alt="Table One Emblem"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Sub-Strap Tagline (Stacked Layout Style matching image_c0f90a.jpg) */}
                <div className="Note2l self-start font-normal uppercase     text-[#F0EEE5]">
                    <div className=" ms-10 ">WHERE</div>
                    <div className=" ms-20">CONVERSATION</div>
                    <div className=" ms-30">IS THE</div>
                    <div className="ms-40">EXPERIENCE</div>
                </div>

            </div>

            {/* Footer Element Anchor Indicator at base */}
            <button
                type="button"
                onClick={scrollToAbout}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-[10px] font-pitch font-semibold tracking-[0.4em] text-white/50 uppercase animate-pulse transition hover:text-white focus:outline-none"
                aria-label="Scroll to About section"
            >
                <span className="mb-1">ENTER</span>
                <span className="block h-7.5 w-px bg-white"></span>
            </button>

        </section>
    )
}