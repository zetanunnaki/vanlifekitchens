import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-earth-950">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/404.jpg"
          alt="Vintage compass and map on a van floor"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-950 via-earth-950/60 to-earth-950/40" />
      </div>
      <div className="relative z-10 container-page text-center">
        <span className="inline-block bg-accent-orange/20 text-accent-orange text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-6 backdrop-blur-sm border border-accent-orange/30">
          Lost on the map
        </span>
        <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-4">404</h1>
        <p className="text-earth-100/80 text-lg mb-10 max-w-md mx-auto">
          This page wandered off the map. Let&apos;s get you back on the road.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center bg-accent-orange text-white px-8 py-4 rounded-full font-bold hover:brightness-110 transition"
          >
            Back to Home
          </Link>
          <Link
            href="/reviews"
            className="inline-flex items-center bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition"
          >
            Browse Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}
