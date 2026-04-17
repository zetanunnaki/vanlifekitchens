import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubHero } from "@/components/HubHero";
import { setups } from "@/lib/data";

export const metadata = { title: "Real Van Kitchen Setups" };

export default function SetupsPage() {
  return (
    <>
      <HubHero
        image="/images/hero/setups.jpg"
        alt="Three camper vans parked at golden hour"
        eyebrow="Kitchen Setups"
        title="Real Van Kitchen Setups"
        subtitle="Step inside real builds from the road. Every product, every cost, every lesson learned."
      />
    <section className="py-24 bg-earth-50">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {setups.map((s) => (
            <Link
              key={s.slug}
              href={`/setups/${s.slug}`}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden block"
            >
              <Image
                src={s.image}
                alt={s.name}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-950/90 via-earth-950/20 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-orange mb-2">
                  {s.vanType} · {s.budget}
                </span>
                <h3 className="text-white text-2xl font-display font-bold leading-tight">{s.name}</h3>
                <div className="mt-3 flex items-center gap-2 text-white/80 text-sm font-semibold">
                  See Full Setup <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
