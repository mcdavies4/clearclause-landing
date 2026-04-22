import { useEffect } from "react";

const SEO_DATA = {
  home: {
    title: "ClearClause — Understand Any Legal Document in Plain English",
    description: "Upload any contract, tenancy agreement, employment letter or terms of service. Get a plain English breakdown with key clauses and red flags in seconds. Free to start.",
    og_title: "ClearClause — Understand Any Legal Document Instantly",
    og_description: "Stop signing documents you don't understand. AI-powered plain English analysis of contracts, tenancy agreements, NDAs, and more. Built for the UK.",
  },
  pricing: {
    title: "Pricing — ClearClause",
    description: "Start free with 3 analyses per month. Upgrade to Pro for £9.99/month for unlimited analyses, negotiation tips, and UK law compliance checks.",
    og_title: "ClearClause Pricing — Start Free, Upgrade Anytime",
    og_description: "3 free analyses per month. Pro from £9.99/month. No credit card required to get started.",
  },
  privacy: {
    title: "Privacy Policy — ClearClause",
    description: "ClearClause privacy policy. We do not store your documents. Read how we handle your data.",
    og_title: "Privacy Policy — ClearClause",
    og_description: "Your documents are never stored or shared. Read our full privacy policy.",
  },
  terms: {
    title: "Terms of Service — ClearClause",
    description: "ClearClause terms of service. Read the terms that govern your use of our document analysis platform.",
    og_title: "Terms of Service — ClearClause",
    og_description: "Terms governing your use of ClearClause's AI-powered document analysis service.",
  },
  contact: {
    title: "Contact Us — ClearClause",
    description: "Get in touch with the ClearClause team. We're happy to help with questions about your account, pricing, or business enquiries.",
    og_title: "Contact ClearClause",
    og_description: "Questions about your account, pricing, or a business partnership? We'd love to hear from you.",
  },
};

const SITE_URL = "https://clearclause.vercel.app"; // ← update to your real domain
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export default function SEO({ page }) {
  const seo = SEO_DATA[page] || SEO_DATA.home;

  useEffect(() => {
    // Title
    document.title = seo.title;

    const setMeta = (name, content, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };

    // Standard
    setMeta("description", seo.description);
    setMeta("robots", "index, follow");
    setMeta("author", "ClearClause");

    // Open Graph
    setMeta("og:type", "website", "property");
    setMeta("og:url", `${SITE_URL}${page === "home" ? "" : `/${page}`}`, "property");
    setMeta("og:title", seo.og_title, "property");
    setMeta("og:description", seo.og_description, "property");
    setMeta("og:image", OG_IMAGE, "property");
    setMeta("og:image:width", "1200", "property");
    setMeta("og:image:height", "630", "property");
    setMeta("og:image:alt", "ClearClause — AI-powered legal document analysis", "property");
    setMeta("og:site_name", "ClearClause", "property");
    setMeta("og:locale", "en_GB", "property");

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:site", "@clearclause");
    setMeta("twitter:title", seo.og_title);
    setMeta("twitter:description", seo.og_description);
    setMeta("twitter:image", OG_IMAGE);
    setMeta("twitter:image:alt", "ClearClause — AI-powered legal document analysis");

    // Canonical
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.appendChild(canonical); }
    canonical.setAttribute("href", `${SITE_URL}${page === "home" ? "" : `/${page}`}`);

  }, [page]);

  return null;
}
