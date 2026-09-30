"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Key,
  Cpu,
  ShieldCheck,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Mail,
  BadgeCheck,
  Car,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { BRAND, SERVICES, TRUST_INDICATORS } from "@/lib/brand";
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import { ServiceRequestForm } from "@/components/site/service-request-form";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";

const SERVICE_ICONS = {
  key: Key,
  chip: Cpu,
  shield: ShieldCheck,
  wrench: Wrench,
} as const;

export default function Home() {
  const waLink = buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/65">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <a href="#top" className="flex items-center gap-2 min-w-0">
            <span className="h-8 w-8 rounded-md bg-[var(--brand-amber)] text-[var(--brand-amber-foreground)] flex items-center justify-center shrink-0">
              <Key className="h-4 w-4" />
            </span>
            <span className="flex flex-col leading-tight min-w-0">
              <span className="font-semibold text-sm sm:text-base truncate">{BRAND.name}</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground truncate">
                {BRAND.domain}
              </span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            <a href="#services" className="px-3 py-2 rounded-md hover:bg-muted/60 transition-colors">
              Services
            </a>
            <a href="#about" className="px-3 py-2 rounded-md hover:bg-muted/60 transition-colors">
              Trade profile
            </a>
            <a href="#lasa" className="px-3 py-2 rounded-md hover:bg-muted/60 transition-colors">
              LASA
            </a>
            <a href="#request" className="px-3 py-2 rounded-md hover:bg-muted/60 transition-colors">
              Request a service
            </a>
            <a href="#faq" className="px-3 py-2 rounded-md hover:bg-muted/60 transition-colors">
              FAQ
            </a>
          </nav>
          <Button asChild size="sm" className="bg-[#25D366] text-white hover:bg-[#1ebd5a] gap-1.5 shrink-0">
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden xs:inline sm:inline">WhatsApp</span>
            </a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[oklch(0.21_0.015_250)] via-[oklch(0.18_0.012_250)] to-[oklch(0.14_0.01_250)]" />
          <div
            className="absolute inset-0 -z-10 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6) 0, transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.4) 0, transparent 35%)",
            }}
            aria-hidden="true"
          />
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20 text-[var(--brand-slate-foreground)]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl"
            >
              <Badge
                variant="outline"
                className="mb-4 border-[var(--brand-amber)]/40 text-[var(--brand-amber)] bg-[var(--brand-amber)]/10 gap-1.5"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                LASA-accredited · Mobile service
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                Lost a car key? Need a spare?
                <span className="block text-[var(--brand-amber)] mt-1">
                  We come to you.
                </span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[var(--brand-slate-foreground)]/80 max-w-xl">
                {BRAND.name} is a mobile auto locksmith covering {BRAND.serviceArea}. We cut keys,
                program transponders, and carry out LASA-accredited work — fast, professional, and
                recognised by South African insurers.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {TRUST_INDICATORS.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-amber)]" />
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-[var(--brand-amber)] text-[var(--brand-amber-foreground)] hover:bg-[var(--brand-amber)]/90 gap-2"
                >
                  <a href="#request">
                    Request a service
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-white/5 text-[var(--brand-slate-foreground)] hover:bg-white/10 hover:text-[var(--brand-slate-foreground)] gap-2"
                >
                  <a href={waLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp us
                  </a>
                </Button>
              </div>

              <p className="mt-4 text-xs text-[var(--brand-slate-foreground)]/60">
                Typical reply within 15–30 minutes during business hours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ---------- Services ---------- */}
        <section id="services" className="scroll-mt-20 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl mb-8 sm:mb-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-amber)] mb-2">
                What we do
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Three services, one mobile workshop
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground">
                Every job is carried out by a registered, LASA-accredited locksmith. Pricing depends
                on the vehicle and key type — use the form below for a quote.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {SERVICES.map((s, i) => {
                const Icon = SERVICE_ICONS[s.icon];
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                  >
                    <Card className="h-full hover:shadow-md transition-shadow border-border/70">
                      <CardContent className="p-5 sm:p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-3">
                          <span className="h-10 w-10 rounded-lg bg-[var(--brand-amber)]/15 text-[var(--brand-amber)] flex items-center justify-center">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                            From {s.indicativeFrom}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold">{s.label}</h3>
                        <p className="mt-1.5 text-sm text-muted-foreground">{s.shortDescription}</p>
                        <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
                          {s.longDescription}
                        </p>
                        <ul className="mt-4 space-y-1.5 text-sm">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand-amber)] shrink-0" />
                              <span className="text-foreground/80">{b}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 pt-4 border-t border-border/60">
                          <a
                            href="#request"
                            className="text-sm font-medium text-[var(--brand-amber)] hover:underline"
                          >
                            Request this service →
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- Trade profile / About ---------- */}
        <section id="about" className="scroll-mt-20 py-12 sm:py-16 lg:py-20 bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-amber)] mb-2">
                  Trade profile
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  A registered South African locksmith, not a call-centre
                </h2>
                <div className="mt-4 space-y-4 text-sm sm:text-base text-foreground/80 leading-relaxed">
                  <p>
                    {BRAND.name} is operated by {BRAND.shortName}, a mobile automotive locksmith with
                    more than a decade of experience on South African roads. The business is built on
                    the simple idea that a stuck driver shouldn&apos;t have to wait for a workshop
                    appointment to get a key cut or a transponder paired.
                  </p>
                  <p>
                    Our van is kitted out with on-board key-cutting and diagnostic equipment,
                    covering the major immobiliser platforms used by Toyota, Volkswagen, Ford, Nissan,
                    Hyundai, Kia, the German premium brands, and most of the other makes you&apos;ll
                    see on SA roads. We carry a wide range of blanks — conventional, laser and
                    sidewinder — so the first visit usually solves the problem.
                  </p>
                  <p>
                    Because we&apos;re LASA-accredited, the work we do is recognised by South African
                    insurers and produces documentation that holds up for claims, stolen-key
                    assessments and SAPS-related matters. You&apos;re not dealing with a back-street
                    cutter — you&apos;re dealing with a registered trade.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Stat label="Years on the road" value="12+" />
                  <Stat label="Vehicles supported" value="40+" />
                  <Stat label="Mobile service area" value="Gauteng" />
                </div>
              </div>

              <Card className="border-border/70">
                <CardContent className="p-5 sm:p-6">
                  <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
                    <Car className="h-4 w-4 text-[var(--brand-amber)]" />
                    How a typical job works
                  </h3>
                  <ol className="space-y-4">
                    {[
                      {
                        t: "You send the request",
                        d: "Use the form below to send us your service, vehicle and contact details via WhatsApp.",
                      },
                      {
                        t: "We quote and confirm",
                        d: "We reply with an indicative price and a proposed time. No workshop queue, no slot-holding fees.",
                      },
                      {
                        t: "We come to you",
                        d: "The van arrives with the blanks, code-cutting kit and diagnostic tooling for your make.",
                      },
                      {
                        t: "Work is done on-site",
                        d: "Key cut, transponder paired and tested — ignition and central locking verified before we leave.",
                      },
                      {
                        t: "LASA invoice & report",
                        d: "You receive a formal, insurance-recognised invoice and, where needed, a key-cutting record.",
                      },
                    ].map((step, i) => (
                      <li key={step.t} className="flex gap-3">
                        <span className="shrink-0 h-7 w-7 rounded-full bg-[var(--brand-amber)]/15 text-[var(--brand-amber)] flex items-center justify-center text-xs font-semibold">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{step.t}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{step.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ---------- LASA accreditation ---------- */}
        <section id="lasa" className="scroll-mt-20 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <Card className="overflow-hidden border-border/70">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="bg-gradient-to-br from-[oklch(0.21_0.015_250)] to-[oklch(0.14_0.01_250)] text-[var(--brand-slate-foreground)] p-6 sm:p-8 lg:p-10">
                  <div className="h-14 w-14 rounded-xl bg-[var(--brand-amber)]/15 text-[var(--brand-amber)] flex items-center justify-center mb-4">
                    <BadgeCheck className="h-7 w-7" />
                  </div>
                  <p className="text-xs uppercase tracking-wider text-[var(--brand-amber)] mb-2">
                    LASA-accredited
                  </p>
                  <h2 className="text-2xl font-bold leading-tight">
                    Locksmith Association of South Africa
                  </h2>
                  <p className="mt-3 text-sm text-[var(--brand-slate-foreground)]/80">
                    Membership no. <span className="font-mono">{BRAND.lasaRegNo}</span>
                  </p>
                  <p className="mt-6 text-sm text-[var(--brand-slate-foreground)]/70">
                    Recognised by South African insurers, vehicle finance houses and SAPS for
                    key-cutting records and stolen-key assessment reports.
                  </p>
                </div>

                <div className="lg:col-span-2 p-6 sm:p-8 lg:p-10">
                  <h3 className="font-semibold text-lg">What LASA accreditation means for you</h3>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        t: "Insurance-recognised work",
                        d: "Lost-key and break-in claims typically require a registered locksmith's report. Our documentation satisfies that requirement.",
                      },
                      {
                        t: "Verified trade identity",
                        d: "LASA members are vetted and listed on a public register — you can confirm our accreditation independently.",
                      },
                      {
                        t: "Code of conduct",
                        d: "We operate under LASA's code of conduct, including proof-of-ownership checks before cutting or programming vehicle keys.",
                      },
                      {
                        t: "Formal records",
                        d: "Key-cutting records and invoices that hold up for finance houses, insurers and police matters.",
                      },
                    ].map((b) => (
                      <div key={b.t} className="rounded-lg border border-border/60 p-4">
                        <p className="font-medium text-sm">{b.t}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{b.d}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-lg bg-[var(--brand-amber)]/10 border border-[var(--brand-amber)]/30 p-4 flex gap-3">
                    <ShieldCheck className="h-5 w-5 text-[var(--brand-amber)] shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground/80">
                      <strong>Proof of ownership is required</strong> for every vehicle we work on —
                      either the original registration papers or a signed letter of authority from
                      the registered owner. This protects you and is a condition of LASA membership.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* ---------- Service request form ---------- */}
        <section id="request" className="scroll-mt-20 py-12 sm:py-16 lg:py-20 bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-amber)] mb-2">
                Service request
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Request a service in under a minute
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground">
                Fill in four quick steps. We&apos;ll get your request on WhatsApp and follow up with a
                quote and proposed time.
              </p>
            </div>
            <ServiceRequestForm />
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section id="faq" className="scroll-mt-20 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-amber)] mb-2">
                Before you ask
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Common questions
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left text-sm sm:text-base">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Still not sure? Send us a WhatsApp and we&apos;ll talk it through.
              </p>
              <Button asChild className="bg-[#25D366] text-white hover:bg-[#1ebd5a] gap-2">
                <a href={waLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Chat to {BRAND.shortName}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-border/60 bg-[oklch(0.21_0.015_250)] text-[var(--brand-slate-foreground)]">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-md bg-[var(--brand-amber)] text-[var(--brand-amber-foreground)] flex items-center justify-center">
                  <Key className="h-4 w-4" />
                </span>
                <span className="font-semibold">{BRAND.name}</span>
              </div>
              <p className="mt-3 text-sm text-[var(--brand-slate-foreground)]/70 max-w-xs">
                {BRAND.tagline}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="border-[var(--brand-amber)]/40 text-[var(--brand-amber)] bg-[var(--brand-amber)]/10 gap-1">
                  <ShieldCheck className="h-3 w-3" /> LASA-accredited
                </Badge>
                <Badge variant="outline" className="border-white/20 text-[var(--brand-slate-foreground)]/80 bg-white/5">
                  Mobile service
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--brand-amber)] mb-3">
                Contact
              </p>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <MessageCircle className="h-4 w-4 mt-0.5 text-[var(--brand-amber)] shrink-0" />
                  <div className="min-w-0">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline break-words"
                    >
                      WhatsApp · {BRAND.phoneDisplay}
                    </a>
                    <p className="text-xs text-[var(--brand-slate-foreground)]/60">Fastest reply</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="h-4 w-4 mt-0.5 text-[var(--brand-amber)] shrink-0" />
                  <div className="min-w-0">
                    <a href={`tel:${BRAND.phoneDisplay.replace(/\s/g, "")}`} className="hover:underline break-words">
                      {BRAND.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="h-4 w-4 mt-0.5 text-[var(--brand-amber)] shrink-0" />
                  <div className="min-w-0">
                    <a href={`mailto:${BRAND.email}`} className="hover:underline break-words">
                      {BRAND.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 mt-0.5 text-[var(--brand-amber)] shrink-0" />
                  <span className="text-[var(--brand-slate-foreground)]/80">{BRAND.serviceArea}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 mt-0.5 text-[var(--brand-amber)] shrink-0" />
                  <span className="text-[var(--brand-slate-foreground)]/80">{BRAND.hours}</span>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--brand-amber)] mb-3">
                Quick links
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  { href: "#services", label: "Services" },
                  { href: "#about", label: "Trade profile" },
                  { href: "#lasa", label: "LASA accreditation" },
                  { href: "#request", label: "Request a service" },
                  { href: "#faq", label: "FAQ" },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-[var(--brand-slate-foreground)]/80 hover:text-[var(--brand-amber)] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[var(--brand-slate-foreground)]/60">
            <p>
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </p>
            <p className="flex items-center gap-1.5">
              <Wrench className="h-3 w-3" />
              LASA reg. <span className="font-mono">{BRAND.lasaRegNo}</span>
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppFab />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-background p-3">
      <p className="text-xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}

const FAQS = [
  {
    q: "Do I need to bring the car to you?",
    a: "No. We're a mobile service — we come to your home, office or roadside location across " +
      BRAND.serviceArea +
      ". For non-urgent jobs we'll agree a time that suits you.",
  },
  {
    q: "What do I need to prove ownership?",
    a: "Either the original vehicle registration papers in your name, or a signed letter of authority from the registered owner along with a copy of their ID. This is a LASA requirement and protects both you and us.",
  },
  {
    q: "Can you cut a key if I've lost the only one?",
    a: "Usually yes. Where the lock or VIN supports it we can decode the lock or pull the key code from the manufacturer's database. For newer vehicles we pair the new transponder to the immobiliser on-site.",
  },
  {
    q: "Do you work on insurance and stolen-key cases?",
    a: "Yes. As a LASA-accredited locksmith we issue formal key-cutting records, invoices and stolen-key assessment reports that South African insurers and SAPS will accept.",
  },
  {
    q: "How do I pay?",
    a: "We accept EFT, card and cash. Payment is due on completion of the job, once you've verified that the new key starts the vehicle and the central locking works.",
  },
  {
    q: "Is the WhatsApp quote binding?",
    a: "The WhatsApp quote is indicative based on what you tell us. If we arrive and find the job differs (different immobiliser, snapped blade, etc.), we'll re-quote on the spot before starting any work.",
  },
];
