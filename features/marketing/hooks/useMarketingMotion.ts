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
        .from(".m-hero-copy > p, .m-hero-copy h1, .m-hero-copy > span, .m-search", { opacity: 0, y: reduced ? 0 : 24, duration: 0.7, stagger: 0.06 }, "-=0.24")
        .from(".m-tour-badge", { opacity: 0, scale: reduced ? 1 : 0.97, duration: 0.35 }, "-=0.35");
      if (!reduced) {
        gsap.to(".m-hero-image", { yPercent: 5, scale: 1.06, ease: "none", scrollTrigger: { trigger: ".m-hero", start: "top top", end: "bottom top", scrub: 0.6 } });
        gsap.to(".m-nav", { y: -8, scaleX: 0.97, ease: "none", scrollTrigger: { trigger: ".m-hero", start: "top top", end: "35% top", scrub: 0.45 } });
      }
      gsap.utils.toArray<HTMLElement>(".m-proof-intro, .m-proof-main").forEach((element, index) => gsap.from(element, { opacity: 0, x: reduced ? 0 : index === 0 ? -28 : 28, duration: 0.65, ease: "power4.out", scrollTrigger: { trigger: element, start: "top 82%", once: true } }));
      gsap.from(".m-feature-image", { opacity: 0, scale: reduced ? 1 : 0.97, duration: 0.75, ease: "power4.out", scrollTrigger: { trigger: ".m-feature-grid", start: "top 82%", once: true } });
      gsap.from(".m-feature-card", { opacity: 0, x: reduced ? 0 : 36, duration: 0.65, ease: "power4.out", scrollTrigger: { trigger: ".m-feature-grid", start: "top 78%", once: true } });
      gsap.from(".m-location", { opacity: 0, y: reduced ? 0 : 20, duration: 0.55, stagger: 0.05, ease: "power4.out", scrollTrigger: { trigger: ".m-location-list", start: "top 84%", once: true } });
    });
    return () => context.revert();
  }, []);
}
