"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // demo username/password
    if (form.username === "admin" && form.password === "123456") {
      document.cookie = "token=admin-token; path=/; max-age=86400";
      document.cookie = "role=admin; path=/; max-age=86400";

      router.push("/Dashboard");
      router.refresh();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <section className="min-h-screen w-full bg-[#F0EEE5] px-6 py-20 text-[#36473F] selection:bg-stone-700 md:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-5xl items-center justify-center">
        <div className="w-full max-w-md rounded-[2rem] border border-[#36473F]/10 bg-white/55 p-8 shadow-sm backdrop-blur md:p-10">
          <div className="mb-10 text-center">
            <span className="mb-5 flex items-center justify-center pl-[0.4em] font-pitch text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C6603F] md:text-xs">
              <span className="me-2 block h-[0.5px] w-[50px] bg-[#C6603F]" />
              LOGIN
            </span>

            <h1 className="font-cringe text-[42px] font-[400] leading-[1.1] text-[#36473F] md:text-[56px]">
              Welcome Back
            </h1>

            <p className="mt-4 text-sm leading-6 text-[#36473F]/70">
              Login with your username and password to continue.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[#36473F]/70">
                Username
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
                placeholder="Enter username"
                className="w-full rounded-full border border-[#36473F]/15 bg-[#F0EEE5]/70 px-5 py-4 text-sm text-[#36473F] outline-none transition placeholder:text-[#36473F]/40 focus:border-[#C6603F]"
              />
            </div>

            <div>
              <label className=" mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[#36473F]/70">
                Password 
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                placeholder="Enter password."
                className="w-full rounded-full border border-[#36473F]/15 bg-[#F0EEE5]/70 px-5 py-4 text-sm text-[#36473F] outline-none transition placeholder:text-[#36473F]/40 focus:border-[#C6603F]"
              />
            </div>

            {error && (
              <p className="rounded-full bg-red-50 px-4 py-3 text-center text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-[#B54323] px-6 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-[#36473F]"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#36473F]/50">
            Demo: username <b>admin</b> / password <b>123456</b>
          </p>
        </div>
      </div>
    </section>
  );
}