import React, { useEffect, useState, useRef } from "react";
import Link from 'next/link'
import { motion } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Star,
  Check,
  Zap,
  ShieldCheck,
  Users,
  Twitter,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";

// Single-file landing page component
export default function LandingPage() {
  // UI state
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [pricingAnnual, setPricingAnnual] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [faqOpen, setFaqOpen] = useState(null);

  // Refs for sections
  const sections = {
    home: useRef(null),
    features: useRef(null),
    how: useRef(null),
    pricing: useRef(null),
    faq: useRef(null),
    contact: useRef(null),
  };

  // Stats count refs
  const statRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState({ users: 0, uptime: 0, rating: 0 });

  // Testimonials
  const testimonials = [
    {
      name: "Rhea Kapoor",
      role: "Founder, Finlytics",
      company: "Finlytics",
      rating: 5,
      quote:
        "Switched to this platform and reduced threat triage time by 70%. Truly instant insights.",
    },
    {
      name: "Arjun Mehta",
      role: "CTO, AgroChain",
      company: "AgroChain",
      rating: 5,
      quote:
        "Integration was effortless — the automation saved our ops team dozens of hours weekly.",
    },
    {
      name: "Simran Gill",
      role: "Head of Security, ShopMore",
      company: "ShopMore",
      rating: 5,
      quote:
        "The accuracy and speed are unmatched. Our SOC team trusts these alerts implicitly.",
    },
  ];

  // Scroll listener for navbar blur and active link
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      // update active link by checking section top positions
      let current = "home";
      Object.entries(sections).forEach(([key, ref]) => {
        if (ref.current) {
          const top = ref.current.getBoundingClientRect().top + window.scrollY - 120;
          if (y >= top) current = key;
        }
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto rotate testimonials
  useEffect(() => {
    const id = setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Stats count-up when in view
  useEffect(() => {
    if (!statRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setStatsVisible(true);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(statRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    let raf;
    const start = performance.now();
    const duration = 1200;
    const animate = (t) => {
      const p = Math.min(1, (t - start) / duration);
      setCounts({
        users: Math.floor(10000 * p),
        uptime: Math.floor(99.9 * p * 10) / 10,
        rating: Math.floor(49 * p) / 10 + 4,
      });
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [statsVisible]);

  // Smooth scroll to section
  const scrollTo = (k) => {
    setMobileOpen(false);
    const el = sections[k].current;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // FAQ toggle
  const toggleFaq = (i) => setFaqOpen(faqOpen === i ? null : i);

  return (
    <div className="font-sans text-gray-900 bg-white antialiased">
      {/* Global styles and keyframes */}
      <style>{`
        @keyframes floaty { 0%{transform:translateY(0)}50%{transform:translateY(-14px)}100%{transform:translateY(0)} }
        @keyframes marquee { 0%{transform:translateX(0)}100%{transform:translateX(-50%)} }
        .glass { backdrop-filter: blur(8px); background: rgba(255,255,255,0.6); }
        [data-reveal] { opacity:0; transform: translateY(24px); transition: all 700ms ease; }
        [data-reveal].visible{ opacity:1; transform:none; }
        .hero-shape { animation: floaty 6s ease-in-out infinite; }
      `}</style>

      {/* NAVBAR */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo("home")}
              className="text-2xl font-extrabold tracking-tight text-indigo-700"
              aria-label="Homepage"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">NeuraGuard</span>
            </button>
            <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
              {[
                ["Home", "home"],
                ["Features", "features"],
                ["How it works", "how"],
                ["Pricing", "pricing"],
                ["FAQ", "faq"],
              ].map(([label, key]) => (
                <button
                  key={key}
                  onClick={() => scrollTo(key)}
                  className={`py-2 px-1 hover:text-indigo-600 transition ${
                    active === key ? "text-indigo-600" : "text-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

            <div className="flex items-center gap-4">
            <Link href="/register" className="hidden md:inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:scale-105 transform transition" aria-label="Get started">
              Get Started Free <ArrowRight size={16} />
            </Link>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu />
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`md:hidden fixed inset-0 z-40 ${mobileOpen ? "" : "pointer-events-none"}`}>
          <div
            className={`absolute inset-0 bg-black/30 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setMobileOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: mobileOpen ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div className="font-bold text-lg text-indigo-700">NeuraGuard</div>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></button>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              {[
                ["Home", "home"],
                ["Features", "features"],
                ["How it works", "how"],
                ["Pricing", "pricing"],
                ["FAQ", "faq"],
              ].map(([label, key]) => (
                <button key={key} onClick={() => scrollTo(key)} className="text-left py-2 text-gray-700 font-medium">{label}</button>
              ))}
              <Link href="/register" className="mt-4 bg-indigo-600 text-white py-3 rounded-full flex items-center justify-center gap-2">Get Started</Link>
            </div>
          </motion.aside>
        </div>
      </header>

      <main className="pt-24">
        {/* HERO */}
        <section ref={sections.home} className="relative min-h-[92vh] flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute -left-32 top-8 w-96 opacity-40 hero-shape" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="80" fill="url(#g1)" />
            </svg>

            <div className="absolute right-12 bottom-12 w-64 h-64 rounded-2xl bg-gradient-to-tr from-pink-300 to-yellow-300 opacity-40 blur-2xl" />

            <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white/60 pointer-events-none" />
          </div>

          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="py-12" data-reveal>
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
                  Predict Threats. Stop Incidents. <span className="text-indigo-600">Instantly.</span>
                </h1>
                <p className="mt-6 text-lg text-gray-700 max-w-2xl leading-relaxed">
                  NeuraGuard gives security teams real-time, AI-driven threat intelligence so you can detect, prioritize and remediate threats without the noise.
                </p>

                <div className="mt-8 flex gap-4">
                  <Link href="/register" className="px-6 py-3 rounded-full bg-indigo-600 text-white shadow-lg hover:scale-105 transform transition">
                    Get Started Free
                  </Link>
                  <Link href="/contact" className="px-6 py-3 rounded-full border border-gray-200 hover:bg-gray-50 transition">
                    Request Demo
                  </Link>
                </div>

                <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex -space-x-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-xs">RK</div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center text-white text-xs">AM</div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center text-white text-xs">SG</div>
                  </div>
                  <div>Trusted by <strong>10,000+</strong> security teams worldwide</div>
                </div>
              </div>

              <div className="flex justify-center md:justify-end" data-reveal>
                <div className="w-[420px] md:w-[520px] rounded-2xl p-6 bg-gradient-to-br from-white/80 to-white/60 border border-gray-100 shadow-2xl">
                  <div className="w-full h-64 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm text-indigo-600 font-semibold">Live Threat Feed</div>
                      <div className="mt-3 text-xl font-bold">3 critical • 12 high</div>
                      <div className="mt-1 text-sm text-gray-500">Top signal: IP reputation • New IoC matches</div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                    <div className="p-2 bg-white rounded-xl text-center border">Avg Detection <div className="font-bold">1.2s</div></div>
                    <div className="p-2 bg-white rounded-xl text-center border">False Positives <div className="font-bold">1.7%</div></div>
                    <div className="p-2 bg-white rounded-xl text-center border">Integrations <div className="font-bold">25+</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST / LOGOS */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="overflow-hidden">
              <div className="flex items-center gap-8 whitespace-nowrap animate-[marquee_25s_linear_infinite]">
                {[
                  "Razorbyte",
                  "StackLane",
                  "Finlytics",
                  "AgroChain",
                  "ShopMore",
                  "NetSecure",
                ].map((c, i) => (
                  <div key={i} className="px-6 py-3 text-sm text-gray-600 border rounded-full bg-white/60">{c}</div>
                ))}
                {[
                  "Razorbyte",
                  "StackLane",
                  "Finlytics",
                  "AgroChain",
                  "ShopMore",
                  "NetSecure",
                ].map((c, i) => (
                  <div key={`dup-${i}`} className="px-6 py-3 text-sm text-gray-600 border rounded-full bg-white/60">{c}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section ref={sections.features} className="py-24" data-reveal>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold">Security that acts before incidents occur</h2>
              <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Combine context-rich signals with automated workflows to stop threats faster and with less effort.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <Zap />, title: "SignalIQ", desc: "AI-curated indicators from web, open-source, and vendor feeds." },
                  { icon: <ShieldCheck />, title: "Auto-Triage", desc: "Prioritize alerts with context and confidence scores." },
                  { icon: <Users />, title: "CollabOps", desc: "Assign incidents, annotate evidence, and centralize response." },
                  { icon: <Check />, title: "One-Click Response", desc: "Run playbooks or block vectors in your stack instantly." },
                  { icon: <Star />, title: "Trusted Signals", desc: "Proven signal models trained on real-world incidents." },
                  { icon: <ShieldCheck />, title: "Compliance", desc: "Exportable audit trails for SOC and compliance reviews." },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    className="p-6 rounded-2xl bg-white border shadow-sm hover:shadow-xl transition transform"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">{f.icon}</div>
                      <div>
                        <div className="font-semibold">{f.title}</div>
                        <div className="mt-2 text-sm text-gray-600">{f.desc}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex flex-col justify-center">
                <div className="text-sm uppercase tracking-wider opacity-90">Big Feature</div>
                <h3 className="text-2xl font-bold mt-3">Unified Threat Map</h3>
                <p className="mt-4 text-sm opacity-90">Visualize threats across your environment with correlation, timelines and one-click actions.</p>
                <div className="mt-6">
                  <button className="bg-white text-indigo-600 rounded-full px-4 py-2 font-semibold">Explore Map</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section ref={sections.how} className="py-24 bg-gray-50" data-reveal>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold">How it works</h2>
              <p className="mt-3 text-gray-600 max-w-2xl mx-auto">A simple flow that captures, analyzes and automates response.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-start">
              {[
                { n: 1, title: "Collect Signals", desc: "Ingest telemetry, feeds and custom connectors.", icon: <Users /> },
                { n: 2, title: "Analyze & Score", desc: "AI ranks and correlates indicators with risk context.", icon: <Zap /> },
                { n: 3, title: "Act Automatically", desc: "Trigger playbooks, enrich alerts, and notify teams.", icon: <Check /> },
              ].map((s) => (
                <div key={s.n} className="flex gap-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white border shadow">{s.icon}</div>
                  <div>
                    <div className="text-sm font-semibold text-indigo-600">Step {s.n}</div>
                    <div className="font-bold text-lg mt-1">{s.title}</div>
                    <div className="text-gray-600 mt-2">{s.desc}</div>
                  </div>
                </div>
              ))}

              <div className="md:col-span-3 mt-6">
                <div className="w-full h-44 rounded-2xl bg-gradient-to-r from-white to-indigo-50 border flex items-center justify-center">
                  <div className="text-center text-sm text-gray-600">Illustrative mockup: workflow timeline and playbook preview</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24" data-reveal>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold">Loved by security teams</h2>
              <p className="mt-3 text-gray-600">Real results, across industries.</p>
            </div>

            <div className="relative">
              <div className="overflow-hidden">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold">{testimonials[testimonialIndex].name.split(" ")[0][0]}</div>
                    <div>
                      <div className="font-bold">{testimonials[testimonialIndex].name} <span className="text-sm text-gray-500">— {testimonials[testimonialIndex].role}</span></div>
                      <div className="text-sm text-gray-500">{testimonials[testimonialIndex].company}</div>
                    </div>
                    <div className="ml-auto flex items-center gap-1 text-yellow-500"><Star /><span className="font-semibold">{testimonials[testimonialIndex].rating}.0</span></div>
                  </div>
                  <div className="mt-4 text-gray-700">“{testimonials[testimonialIndex].quote}”</div>
                </motion.div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-3">
                {testimonials.map((t, i) => (
                  <button key={i} onClick={() => setTestimonialIndex(i)} className={`w-3 h-3 rounded-full ${i === testimonialIndex ? "bg-indigo-600" : "bg-gray-300"}`}></button>
                ))}
              </div>

              <div ref={statRef} className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-6 bg-indigo-50 rounded-2xl">
                  <div className="text-3xl font-bold">{counts.users.toLocaleString()}+</div>
                  <div className="text-sm text-gray-600">Users</div>
                </div>
                <div className="p-6 bg-indigo-50 rounded-2xl">
                  <div className="text-3xl font-bold">{counts.uptime}%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
                <div className="p-6 bg-indigo-50 rounded-2xl">
                  <div className="text-3xl font-bold">{counts.rating.toFixed(1)}★</div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section ref={sections.pricing} className="py-24 bg-gradient-to-b from-white to-gray-50" data-reveal>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold">Pricing</h2>
              <p className="mt-2 text-gray-600">Clear pricing for teams of any size. Scale as you grow.</p>
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-sm text-gray-600">Monthly</div>
              <button onClick={() => setPricingAnnual(!pricingAnnual)} className={`relative w-14 h-8 bg-gray-200 rounded-full p-1 transition ${pricingAnnual ? "bg-indigo-600" : ""}`} aria-pressed={pricingAnnual}>
                <div className={`w-6 h-6 bg-white rounded-full shadow transform transition ${pricingAnnual ? "translate-x-6" : ""}`}></div>
              </button>
              <div className="text-sm text-gray-600">Annual <span className="ml-2 text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">Save 20%</span></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Free", priceM: 0, priceA: 0, perks: ["Up to 3 users", "Community support", "Basic signals"] },
                { name: "Pro", priceM: 49, priceA: 39, perks: ["Everything in Free", "Priority alerts", "Playbooks & integrations"] , popular: true},
                { name: "Enterprise", priceM: 199, priceA: 159, perks: ["SAML & SSO", "Dedicated CSM", "Custom SLAs"] },
              ].map((p, i) => (
                <div key={i} className={`p-8 rounded-2xl border ${p.popular ? "border-indigo-600 shadow-xl" : "border-gray-100 shadow-sm"} bg-white`}
                >
                  {p.popular && <div className="inline-block px-3 py-1 bg-indigo-600 text-white rounded-full text-xs">Most popular</div>}
                  <div className="mt-4">
                    <div className="text-lg font-semibold">{p.name}</div>
                    <div className="mt-4 text-3xl font-bold">{pricingAnnual ? `₹${p.priceA * 1000}/yr` : p.priceM === 0 ? "Free" : `₹${p.priceM * 1000}/mo`}</div>
                    <div className="mt-2 text-sm text-gray-500">{p.name === 'Free' ? 'No credit card required' : 'Billed monthly or annually'}</div>
                    <ul className="mt-6 space-y-2">
                      {p.perks.map((k, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm"><Check className="text-green-500"/> {k}</li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <button className={`w-full py-3 rounded-full ${p.popular ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>{p.name === 'Free' ? 'Get Started' : 'Choose plan'}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">No credit card required • Cancel anytime</div>
          </div>
        </section>

        {/* FAQ */}
        <section ref={sections.faq} className="py-24" data-reveal>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold">Frequently asked questions</h2>
              <p className="mt-2 text-gray-600">Answers to common concerns about security, pricing, and onboarding.</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <input aria-label="Search FAQ" placeholder="Search questions" className="w-full p-3 border rounded-lg" />
              </div>

              <div className="space-y-4">
                {[
                  { q: "How secure is my data?", a: "We encrypt data at rest and in transit, maintain strict access controls, and provide audit logs for compliance." },
                  { q: "Can I integrate with my SIEM?", a: "Yes — we provide native connectors for leading SIEMs and a flexible ingestion API." },
                  { q: "What about false positives?", a: "Our models include confidence scores and contextual enrichments to minimize noise." },
                  { q: "Do you offer enterprise contracts?", a: "Yes — Enterprise includes SLAs, dedicated CSMs and custom integration support." },
                  { q: "Can I try before buying?", a: "Start with the Free tier or request a demo for a guided proof-of-value." },
                  { q: "How is support provided?", a: "Email, priority chat for Pro customers, and dedicated support for Enterprise." },
                ].map((f, i) => (
                  <div key={i} className="border rounded-2xl overflow-hidden">
                    <button onClick={() => toggleFaq(i)} className="w-full p-4 flex items-center justify-between">
                      <div className="text-left">
                        <div className="font-semibold">{f.q}</div>
                        <div className="text-sm text-gray-500">{faqOpen === i ? 'Close' : 'Read answer'}</div>
                      </div>
                      <ChevronDown className={`transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
                    </button>
                    <div style={{ height: faqOpen === i ? 'auto' : 0, transition: 'height 300ms ease' }} className="px-4">
                      <div className={`p-4 text-gray-700 ${faqOpen === i ? '' : 'hidden'}`}>{f.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section ref={sections.contact} className="py-24 bg-indigo-700 text-white" data-reveal>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-extrabold">Start protecting your business today</h2>
            <p className="mt-3 max-w-2xl mx-auto">Join thousands of teams that trust NeuraGuard to reduce risk and accelerate response.</p>

            <div className="mt-6 flex justify-center gap-3">
              <input aria-label="Email" placeholder="Your work email" className="px-4 py-3 rounded-l-full text-gray-800" />
              <Link href="/register" className="px-6 py-3 rounded-r-full bg-white text-indigo-700 font-semibold">Get started — it’s free</Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 bg-gray-100">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
            <div>
              <div className="font-extrabold text-indigo-700">NeuraGuard</div>
              <div className="mt-2 text-sm text-gray-600">Actionable threat intelligence, built for modern teams.</div>
              <div className="mt-4 text-sm text-gray-600">Connect with Akash Koli</div>
              <div className="mt-3 flex items-center gap-3">
                <a href="https://github.com/AkashKoli4475" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 rounded-full bg-white shadow-sm text-gray-700 hover:bg-gray-50 transition">
                  <Github />
                </a>
                <a href="https://www.linkedin.com/in/akash-koli-056777248" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 rounded-full bg-white shadow-sm text-blue-600 hover:bg-gray-50 transition">
                  <Linkedin />
                </a>
                <a href="https://www.instagram.com/_akash.1711_?igsh=MXUwNjI4YmlrM3IxYg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-3 rounded-full bg-white shadow-sm text-pink-500 hover:bg-gray-50 transition">
                  <Instagram />
                </a>
              </div>
            </div>

            <div>
              <div className="font-semibold">Product</div>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>Features</li>
                <li>Integrations</li>
                <li>Pricing</li>
              </ul>
            </div>

            <div>
              <div className="font-semibold">Company</div>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <div className="font-semibold">Resources</div>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>Docs</li>
                <li>Blog</li>
                <li>Security</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <div>© {new Date().getFullYear()} NeuraGuard. All rights reserved.</div>
            <div className="mt-2 md:mt-0">Built by Akash Koli</div>
          </div>
        </footer>
      </main>

      {/* Simple scroll reveal observer */}
      <ScrollReveal />
    </div>
  );
}

// Helper component for scroll reveal
function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
