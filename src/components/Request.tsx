"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
export default function Request() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setSuccess(false);

        try {
            const res = await fetch("/api/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || "Something went wrong");
                return;
            }

            setMessage("Request submitted successfully!");
            setSuccess(true);
            setForm({
                name: "",
                email: "",
                address: "",
                description: "",
            });
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } catch (error) {
            console.error("REQUEST SUBMIT ERROR:", error);
            setMessage("Failed to submit request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full bg-[#202A44] py-24 md:py-36 px-6 md:px-12">
            <FadeInSection>
                <div className="mx-auto max-w-6xl">
                    <div className=" mb-10 md:mb-16 flex justify-center">


                        <span className="Note2 text-[#B54323]  tracking-[0.4em] uppercase mb-10 md:mb-16 flex items-center pl-[0.4em]">

                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: "6rem" }}
                                viewport={{ once: false, amount: 0.5 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="mr-4 h-px bg-[#B54323]"
                            />
                            Request a seat
                        </span>
                    </div>

                    <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-26">
                        <div>
                            <h2 className=" leading-[0.95] text-[#F0EEE5] Title3">
                                Membership is by
                                <br />
                                invitation &amp; application.
                            </h2>

                            <p className="mt-8  body2   leading-relaxed text-[#F0EEE5]/60">
                                Tell us how you see the world. We read every note, and reach out
                                when a table forms that would enrich you.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full">
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                type="text"
                                placeholder="FULL NAME"
                                className="mb-8 w-full border-b border-[#F0EEE5]/35 bg-transparent pb-8 Note3 uppercase tracking-[0.25em] text-[#F0EEE5] outline-none placeholder:text-[#F0EEE5]/45"
                            />

                            <div className="grid gap-8 md:grid-cols-2">
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="EMAIL"
                                    className="w-full border-b border-[#F0EEE5]/35 bg-transparent pb-8 Note3 uppercase tracking-[0.25em] text-[#F0EEE5] outline-none placeholder:text-[#F0EEE5]/45"
                                />

                                <input
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="CITY, COUNTRY"
                                    className="w-full border-b border-[#F0EEE5]/35 bg-transparent pb-8 Note3 uppercase tracking-[0.25em] text-[#F0EEE5] outline-none placeholder:text-[#F0EEE5]/45"
                                />
                            </div>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="WHEN WAS THE LAST TIME YOU HAD A REAL CONVERSATION? WHAT MADE IT REAL?"
                                className="mt-8 w-full resize-none border-b border-[#F0EEE5]/35 bg-transparent pb-10 Note3 uppercase tracking-[0.2em] text-[#F0EEE5] outline-none placeholder:text-[#F0EEE5]/45"
                            />

                            {message && (
                                <p className="mt-6 font-pitch text-[11px] uppercase tracking-[0.2em] text-[#F0EEE5]/70">
                                    {message}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`
    mt-8 px-5 py-2
    Note3 font-semibold uppercase tracking-[0.25em]
    transition-all duration-300

  

    disabled:cursor-not-allowed disabled:opacity-60
  `}
                            >
                                {loading
                                    ? " ... →"
                                    : success
                                        ? "Sent ✓"
                                        : "Table it →"}
                            </button>
                        </form>
                    </div>

                    <div className="mt-16 border-t border-[#F0EEE5]/20 pt-6 sm:mt-20 lg:mt-24">
                        <div className="flex flex-col gap-4 text-[#F0EEE5]/70 lg:flex-row lg:items-center lg:justify-between">

                            {/* Main Links */}
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4  Note3 uppercase tracking-[0.15em] sm:grid-cols-4 lg:flex lg:flex-wrap lg:gap-8">
                                <a href="#conversations">Conversations</a>
                                <a href="#community">Community</a>
                                <a href="#perspectives">Perspectives</a>
                                <a href="#hosts">Hosts</a>
                            </div>

                            {/* Social Links */}
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4  Note3 uppercase tracking-[0.15em] sm:flex sm:gap-10">
                                <a href="#">Instagram</a>
                                <a href="#">Email</a>
                            </div>

                        </div>
                    </div>
                </div>
            </FadeInSection>
        </section>
    );
}