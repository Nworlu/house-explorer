"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useMarketingMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".m-nav", { opacity: 0, y: reduced ? 0 : -16, duration: 0.55 })
        .from(".m-hero-copy > p", { opacity: 0, y: reduced ? 0 : 28, duration: 0.55 }, "-=0.24")
        .from(".m-hero-copy h1 > span", { opacity: 0, yPercent: reduced ? 0 : 110, duration: 0.82, stagger: 0.09 }, "-=0.3")
        .from(".m-hero-copy > span, .m-search", { opacity: 0, y: reduced ? 0 : 28, duration: 0.62, stagger: 0.08 }, "-=0.42")
        .from(".m-tour-badge", { opacity: 0, y: reduced ? 0 : -12, scale: reduced ? 1 : 0.96, duration: 0.42 }, "-=0.36")
        .from(".m-scroll", { opacity: 0, y: reduced ? 0 : 10, duration: 0.4 }, "-=0.2");
      if (!reduced) {
        gsap.fromTo(".m-hero-image", { scale: 1.12, yPercent: -6 }, { yPercent: 14, scale: 1.18, ease: "none", scrollTrigger: { trigger: ".m-hero", start: "top top", end: "bottom top", scrub: 0.45 } });
        gsap.to(".m-nav", { y: -8, scaleX: 0.97, ease: "none", scrollTrigger: { trigger: ".m-hero", start: "top top", end: "35% top", scrub: 0.45 } });
        gsap.to(".m-hero-copy", { yPercent: -30, ease: "none", scrollTrigger: { trigger: ".m-hero", start: "top top", end: "bottom top", scrub: 0.42 } });
        gsap.to(".m-tour-badge", { yPercent: 90, ease: "none", scrollTrigger: { trigger: ".m-hero", start: "top top", end: "bottom top", scrub: 0.5 } });
        gsap.to(".m-scroll", { yPercent: -130, opacity: 0, ease: "none", scrollTrigger: { trigger: ".m-hero", start: "top top", end: "55% top", scrub: 0.35 } });
      }
      gsap.utils.toArray<HTMLElement>(".m-proof-intro, .m-proof-main").forEach((element, index) => gsap.from(element, { opacity: 0, x: reduced ? 0 : index === 0 ? -28 : 28, duration: 0.65, ease: "power4.out", scrollTrigger: { trigger: element, start: "top 82%", once: true } }));
      gsap.from(".m-feature-image", { opacity: 0, scale: reduced ? 1 : 0.97, duration: 0.75, ease: "power4.out", scrollTrigger: { trigger: ".m-feature-grid", start: "top 82%", once: true } });
      gsap.from(".m-feature-card", { opacity: 0, x: reduced ? 0 : 42, duration: 0.7, ease: "power4.out", scrollTrigger: { trigger: ".m-feature-grid", start: "top 78%", once: true } });
      if (!reduced) gsap.to(".m-feature-image img", { yPercent: 7, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".m-feature-grid", start: "top bottom", end: "bottom top", scrub: 0.65 } });
      gsap.from(".m-location", { opacity: 0, x: reduced ? 0 : -28, duration: 0.6, stagger: 0.075, ease: "power4.out", scrollTrigger: { trigger: ".m-location-list", start: "top 84%", once: true } });
      gsap.from(".m-room-story-copy, .m-room-index", { opacity: 0, y: reduced ? 0 : 28, duration: 0.65, stagger: 0.08, ease: "power4.out", scrollTrigger: { trigger: ".m-room-story", start: "top 78%", once: true } });
      gsap.from(".m-confidence-grid article", { opacity: 0, y: reduced ? 0 : 24, duration: 0.55, stagger: 0.07, ease: "power4.out", scrollTrigger: { trigger: ".m-confidence", start: "top 82%", once: true } });
      gsap.from(".m-room-list a", { opacity: 0, x: reduced ? 0 : 20, duration: 0.48, stagger: 0.055, ease: "power3.out", scrollTrigger: { trigger: ".m-room-list", start: "top 88%", once: true } });
      gsap.from(".m-agent > *", { opacity: 0, y: reduced ? 0 : 28, duration: 0.65, stagger: 0.08, ease: "power4.out", scrollTrigger: { trigger: ".m-agent", start: "top 82%", once: true } });
      gsap.from(".hv-impact-copy, .hv-impact-visual", { opacity: 0, x: reduced ? 0 : 34, duration: 0.75, stagger: 0.08, ease: "power4.out", scrollTrigger: { trigger: ".hv-impact", start: "top 82%", once: true } });
      gsap.from(".hv-impact dl > div", { opacity: 0, y: reduced ? 0 : 18, duration: 0.5, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: ".hv-impact dl", start: "top 90%", once: true } });
      gsap.from(".hv-property-grid article", { opacity: 0, y: reduced ? 0 : 28, duration: 0.65, stagger: 0.08, ease: "power4.out", scrollTrigger: { trigger: ".hv-property-grid", start: "top 84%", once: true } });
      gsap.from(".hv-service-list article", { opacity: 0, x: reduced ? 0 : -24, duration: 0.58, stagger: 0.07, ease: "power4.out", scrollTrigger: { trigger: ".hv-service-list", start: "top 86%", once: true } });
      gsap.from(".hv-listings article", { opacity: 0, y: reduced ? 0 : 24, duration: 0.55, stagger: 0.06, ease: "power4.out", scrollTrigger: { trigger: ".hv-listings", start: "top 82%", once: true } });
      gsap.from(".hv-highlight article > *", { opacity: 0, y: reduced ? 0 : 24, duration: 0.58, stagger: 0.07, ease: "power4.out", scrollTrigger: { trigger: ".hv-highlight", start: "top 76%", once: true } });
      if (!reduced) gsap.fromTo(".hv-highlight-media img", { scale: 1.18, yPercent: -10 }, { scale: 1.18, yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hv-highlight", start: "top bottom", end: "bottom top", scrub: 0.5 } });
      gsap.from(".hv-trust blockquote", { opacity: 0, y: reduced ? 0 : 30, duration: 0.75, ease: "power4.out", scrollTrigger: { trigger: ".hv-trust", start: "top 82%", once: true } });
      gsap.from(".hv-faq details", { opacity: 0, x: reduced ? 0 : 20, duration: 0.48, stagger: 0.055, ease: "power3.out", scrollTrigger: { trigger: ".hv-faq", start: "top 82%", once: true } });
      if (!reduced) {
        const parallaxImages = gsap.utils.toArray<HTMLImageElement>(".hv-impact-visual img, .hv-property-grid article > div img, .hv-listings article > div img");
        parallaxImages.forEach((image, index) => {
          const distance = index % 3 === 0 ? 26 : index % 3 === 1 ? 20 : 30;
          gsap.fromTo(image, { yPercent: -distance / 2, scale: 1.16 }, { yPercent: distance / 2, scale: 1.16, ease: "none", scrollTrigger: { trigger: image.parentElement ?? image, start: "top bottom", end: "bottom top", scrub: 0.4 + (index % 3) * 0.06 } });
        });
        gsap.utils.toArray<HTMLElement>(".hv-section-head").forEach((heading, index) => {
          gsap.fromTo(heading, { xPercent: index % 2 ? 5 : -5 }, { xPercent: index % 2 ? -5 : 5, ease: "none", scrollTrigger: { trigger: heading.parentElement ?? heading, start: "top bottom", end: "bottom top", scrub: 0.55 } });
        });
        gsap.fromTo(".hv-impact-copy", { yPercent: 10 }, { yPercent: -10, ease: "none", scrollTrigger: { trigger: ".hv-impact", start: "top bottom", end: "bottom top", scrub: 0.5 } });
        gsap.fromTo(".hv-trust blockquote", { xPercent: -7 }, { xPercent: 7, ease: "none", scrollTrigger: { trigger: ".hv-trust", start: "top bottom", end: "bottom top", scrub: 0.55 } });
      }
    });
    return () => context.revert();
  }, []);
}
