import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-[#202A44] text-[#F0EEE5]/70 Note3 tracking-widest uppercase ">
      <div className="max-w-7xl mx-auto px-6 pb-12 flex flex-col md:flex-row items-center justify-between gap-y-6">
        <div>
           Table One © {new Date().getFullYear()}
        </div>
        <div className="flex items-center gap-x-8">
         branding & website by studio agor
        </div>
      </div>
    </footer>
  )
}