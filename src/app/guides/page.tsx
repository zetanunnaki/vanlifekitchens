import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubHero } from "@/components/HubHero";
import { guides } from "@/lib/data";

export const metadata = { title: "Guides" };

export default function GuidesHubPage() {
  return (
    <>
      <HubHero
        image="/images/hero/guides.jpg"
        alt="Van kitchen layout sketch in a notebook"
        eyebrow="Guides"
        title="Nomad Knowledge"
        subtitle="Long-form guides on setup, power, water, and meal prep — written by van dwellers who actually live it."
      />
    <section className="py-24 bg-white min-h-screen">
      <div className="container-page">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {guides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="group">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 relative">
                <Image
                  src={g.image}
                  alt={g.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-[10px] font-bold text-accent-orange uppercase tracking-wider">
                    {g.category}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-display font-bold text-earth-950 mb-3 group-hover:text-accent-orange transition-colors">
                {g.title}
              </h3>
              <p className="text-earth-500 text-sm leading-relaxed mb-4">{g.excerpt}</p>
              <div className="flex items-center gap-2 text-accent-orange font-bold text-sm">
                Read Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
