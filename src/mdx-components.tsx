import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="font-display text-4xl md:text-5xl font-bold text-earth-950 mb-6 mt-12 leading-[1.05] tracking-tight"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="font-display text-3xl md:text-4xl font-bold text-earth-950 mb-5 mt-14 leading-[1.1] tracking-tight text-balance"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="font-display text-xl md:text-2xl font-bold text-earth-900 mb-4 mt-10 leading-tight"
        {...props}
      />
    ),
    h4: (props) => (
      <h4
        className="font-display text-lg md:text-xl font-bold text-earth-900 mb-3 mt-8"
        {...props}
      />
    ),
    p: (props) => (
      <p className="text-lg leading-[1.85] mb-6 text-earth-800 text-pretty" {...props} />
    ),
    ul: (props) => (
      <ul className="list-none pl-0 mb-8 space-y-3 text-earth-800 text-lg leading-[1.75]" {...props} />
    ),
    ol: (props) => (
      <ol className="list-decimal pl-6 mb-8 space-y-3 text-earth-800 text-lg leading-[1.75] marker:text-accent-orange marker:font-bold" {...props} />
    ),
    li: ({ children, ...props }) => (
      <li className="pl-7 relative" {...props}>
        <span
          className="absolute left-0 top-3 w-3 h-px bg-accent-orange"
          aria-hidden="true"
        />
        {children}
      </li>
    ),
    blockquote: (props) => (
      <blockquote
        className="my-10 border-l-4 border-accent-orange pl-8 py-2 font-serif text-2xl md:text-3xl italic leading-snug text-earth-900 text-balance"
        {...props}
      />
    ),
    a: ({ href, ...rest }) => (
      <Link
        href={href ?? "#"}
        className="text-accent-orange font-semibold underline decoration-accent-orange/30 underline-offset-4 decoration-2 hover:decoration-accent-orange transition-colors"
        {...rest}
      />
    ),
    strong: (props) => <strong className="font-bold text-earth-950" {...props} />,
    code: (props) => (
      <code
        className="font-mono text-[0.9em] bg-earth-100 text-earth-800 px-1.5 py-0.5 rounded"
        {...props}
      />
    ),
    hr: () => (
      <hr className="my-14 border-0 flex items-center justify-center after:content-['§'] after:text-accent-orange after:text-xl after:font-serif" />
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        width={0}
        height={0}
        style={{ width: "100%", height: "auto" }}
        className="rounded-3xl my-10"
        {...(props as ImageProps)}
      />
    ),
    table: (props) => (
      <div className="my-10 -mx-4 sm:mx-0 overflow-x-auto rounded-none sm:rounded-2xl border-y sm:border border-earth-200 shadow-none sm:shadow-soft-xl">
        <table className="w-full text-sm min-w-[540px] border-collapse" {...props} />
      </div>
    ),
    thead: (props) => <thead {...props} />,
    tbody: (props) => (
      <tbody className="[&>tr:nth-child(even)]:bg-earth-50/60 [&>tr:hover]:bg-accent-orange/5 [&>tr]:transition-colors" {...props} />
    ),
    tr: (props) => <tr {...props} />,
    th: (props) => (
      <th
        className="bg-earth-950 text-white px-5 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] whitespace-nowrap first:rounded-tl-none last:rounded-tr-none"
        {...props}
      />
    ),
    td: (props) => (
      <td className="px-5 py-4 border-b border-earth-100/80 text-earth-700 font-mono text-sm tabular-nums first:font-sans first:font-semibold first:text-earth-950 last:border-b-0" {...props} />
    ),
    ...components,
  };
}
