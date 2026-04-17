"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-earth-950">
      <div className="absolute inset-0 bg-gradient-to-t from-earth-950 via-earth-950/80 to-earth-950/60" />
      <div className="relative z-10 container-page text-center">
        <span className="inline-block bg-accent-orange/20 text-accent-orange text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-6 backdrop-blur-sm border border-accent-orange/30">
          Something went wrong
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">
          Oops
        </h1>
        <p className="text-earth-100/80 text-lg mb-10 max-w-md mx-auto">
          We hit a bump in the road. This page didn&apos;t load as expected, but
          you can try again or head back home.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center bg-accent-orange text-white px-8 py-4 rounded-full font-bold hover:brightness-110 transition"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </section>
  );
}
