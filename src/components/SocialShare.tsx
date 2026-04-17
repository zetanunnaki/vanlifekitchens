"use client";

import { useState } from "react";
import { Check, Copy, Facebook, Linkedin, Mail, MessageCircle, Share2 } from "lucide-react";

const SITE = "https://vanlifekitchens.com";

export function SocialShare({
  slug,
  title,
  description,
  imageUrl,
}: {
  slug: string;
  title: string;
  description?: string;
  imageUrl?: string;
}) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE}${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description ?? "");
  const encodedImage = encodeURIComponent(imageUrl ?? "");
  const emailSubject = encodeURIComponent(`VanLifeKitchen: ${title}`);
  const emailBody = encodeURIComponent(
    `${description ? description + "\n\n" : ""}${url}`,
  );

  const shareLinks = [
    {
      name: "X",
      Icon: XIcon,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=vanlifekitchen`,
      color: "hover:bg-black hover:text-white hover:border-black",
    },
    {
      name: "Reddit",
      Icon: RedditIcon,
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      color: "hover:bg-[#ff4500] hover:text-white hover:border-[#ff4500]",
    },
    {
      name: "Facebook",
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2]",
    },
    {
      name: "Pinterest",
      Icon: PinterestIcon,
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedDesc}`,
      color: "hover:bg-[#bd081c] hover:text-white hover:border-[#bd081c]",
    },
    {
      name: "LinkedIn",
      Icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2]",
    },
    {
      name: "WhatsApp",
      Icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:bg-[#25d366] hover:text-white hover:border-[#25d366]",
    },
    {
      name: "Email",
      Icon: Mail,
      href: `mailto:?subject=${emailSubject}&body=${emailBody}`,
      color: "hover:bg-earth-700 hover:text-white hover:border-earth-700",
    },
  ];

  function handleCopy() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  function handleNativeShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      navigator
        .share({ title, text: description, url })
        .catch(() => {
          // User cancelled or share failed — fall back silently
        });
    } else {
      handleCopy();
    }
  }

  const hasNativeShare =
    typeof navigator !== "undefined" && "share" in navigator;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-earth-500">
        Share
      </span>

      {/* Native share sheet (mobile) — front-and-center when available */}
      {hasNativeShare && (
        <button
          onClick={handleNativeShare}
          aria-label="Share via device share sheet"
          title="Share"
          className="md:hidden w-10 h-10 rounded-full border border-earth-200 bg-white flex items-center justify-center text-earth-700 transition-all hover:bg-accent-orange hover:text-white hover:border-accent-orange"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}

      {shareLinks.map(({ name, Icon, href, color }) => (
        <a
          key={name}
          href={href}
          target={name === "Email" ? undefined : "_blank"}
          rel="noopener noreferrer nofollow"
          aria-label={`Share on ${name}`}
          title={`Share on ${name}`}
          className={`w-10 h-10 rounded-full border border-earth-200 bg-white flex items-center justify-center text-earth-700 transition-all ${color}`}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
      <button
        onClick={handleCopy}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Link copied" : "Copy link"}
        className="w-10 h-10 rounded-full border border-earth-200 bg-white flex items-center justify-center text-earth-700 transition-all hover:bg-earth-950 hover:text-white hover:border-earth-950"
      >
        {copied ? <Check className="w-4 h-4 text-accent-green" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.853c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.029 11.985.029L12.017 0z" />
    </svg>
  );
}

function RedditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
