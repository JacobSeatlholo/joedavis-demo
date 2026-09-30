"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Key,
  ShieldCheck,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Mail,
  BadgeCheck,
  Car,
  ChevronRight,
  Star,
  Lock,
  Building2,
  ChevronDown,
  Facebook,
  ArrowRight,
  CheckCircle2,
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
import {
  BRAND,
  SERVICES,
  WORK_PROCESS,
  PRODUCT_CATEGORIES,
  SUPPLIERS,
  TRUST_INDICATORS,
} from "@/lib/brand";
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import { ServiceRequestForm } from "@/components/site/service-request-form";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";

export default function Home() {
  const waLink = buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE);
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-40 w-full border-b border-black/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <a href="#top" className="flex items-center gap-2 min-w-0" aria-label={`${BRAND.name} — home`}>
            <Image
              src="/logo.png"
              alt={`${BRAND.name} — locksmiths since ${BRAND.established}`}
              width={170}
              height={51}
              priority
              className="h-8 sm:h-10 w-auto shrink-0"
            />
          </a>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            <a href="#services" className="px-3 py-2 rounded-md hover:bg-black/5 transition-colors font-medium">Services</a>
            <a href="#about" className="px-3 py-2 rounded-md hover:bg-black/5 transition-colors font-medium">About</a>
            <a href="#accreditation" className="px-3 py-2 rounded-md hover:bg-black/5 transition-colors font-medium">Accreditation</a>
            <a href="#branches" className="px-3 py-2 rounded-md hover:bg-black/5 transition-colors font-medium">Branches</a>
            <a href="#request" className="px-3 py-2 rounded-md hover:bg-black/5 transition-colors font-medium">Request a service</a>
            <a href="#faq" className="px-3 py-2 rounded-md hover:bg-black/5 transition-colors font-medium">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${BRAND.branches[0].phoneTel}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-md hover:bg-black/5 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              {BRAND.branches[0].phoneDisplay}
            </a>
            <Button asChild size="sm" className="bg-[#25D366] text-white hover:bg-[#1ebd5a] gap-1.5 shrink-0">
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden bg-[var(--brand-black)] text-white">
          {/* Background image with overlay */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/assets/hero-workshop.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-[#2b2b2b]/85 to-[#2b2b2b]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent" />
          </div>

          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-14 sm:py-20 lg:py-28">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <Badge className="mb-4 bg-[var(--brand-gold)] text-[var(--brand-gold-foreground)] hover:bg-[var(--brand-gold)] gap-1.5 px-3 py-1.5">
                <BadgeCheck className="h-3.5 w-3.5" />
                Est. {BRAND.established} · LASA accredited · PSIRA registered
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                Security
                <span className="block text-[var(--brand-gold)] mt-1">for life.</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">
                We don&apos;t just install locks, we install confidence. From advanced access controls
                to everyday solutions, {BRAND.name} has been keeping Gqeberha and the Eastern Cape
                secure since {BRAND.established} — nearly 80 years.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {TRUST_INDICATORS.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium backdrop-blur"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-gold)]" />
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-[var(--brand-gold)] text-[var(--brand-gold-foreground)] hover:bg-[var(--brand-gold-soft)] gap-2 px-6 h-12 text-base font-semibold"
                >
                  <a href="#request">
                    Request a service
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white gap-2 h-12 px-6"
                >
                  <a href={waLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp {BRAND.whatsappDisplay}
                  </a>
                </Button>
              </div>

              <p className="mt-4 text-xs text-white/60 flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                24/7 emergency callouts · Typical WhatsApp reply within 15–30 minutes
              </p>
            </motion.div>
          </div>

          {/* Suppliers strip */}
          <div className="border-t border-white/10 bg-black/40 backdrop-blur">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2 text-center">
                Trusted suppliers & partners
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-white/70 text-xs sm:text-sm font-semibold">
                {SUPPLIERS.map((s) => (
                  <span key={s} className="opacity-70 hover:opacity-100 transition-opacity">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Work process ---------- */}
        <section className="py-10 sm:py-14 bg-white border-b border-black/5">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)] mb-2">
                Our work process
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--brand-black)]">
                Swift, efficient, secure
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                We work swiftly and efficiently, using advanced tools to assess, resolve, and secure
                your property with precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {WORK_PROCESS.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="relative rounded-xl border border-black/10 bg-[var(--brand-cream)] p-5 sm:p-6"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="h-9 w-9 rounded-full bg-[var(--brand-gold)] text-[var(--brand-gold-foreground)] flex items-center justify-center font-bold text-sm shrink-0">
                      {i + 1}
                    </span>
                    <h3 className="font-bold uppercase tracking-wide text-sm text-[var(--brand-black)]">
                      {p.step}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                  {i < WORK_PROCESS.length - 1 && (
                    <ChevronRight
                      className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-black/20"
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Services ---------- */}
        <section id="services" className="scroll-mt-20 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)] mb-2">
                Top services
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--brand-black)]">
                What we do
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                Five core services covering everything from a single cut key to a fully integrated
                access-control system. Each is delivered by trained, in-house professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="group"
                >
                  <Card className="h-full border-black/10 hover:border-[var(--brand-gold)] hover:shadow-xl hover:shadow-[var(--brand-gold)]/10 transition-all overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-[3/2] overflow-hidden bg-[var(--brand-cream)] relative">
                        { }
                        <img
                          src={s.imageSrc}
                          alt={`${BRAND.name} — ${s.label}`}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                          <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow">
                            {s.label}
                          </h3>
                        </div>
                      </div>
                      <div className="p-4 sm:p-5">
                        <p className="text-xs uppercase tracking-wider text-[var(--brand-gold)] font-semibold mb-2">
                          {s.shortDescription}
                        </p>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          {s.longDescription}
                        </p>
                        <a
                          href="#request"
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-black)] hover:text-[var(--brand-gold)] transition-colors"
                        >
                          Request this service
                          <ChevronRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* CTA card */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: SERVICES.length * 0.06 }}
                className="rounded-xl bg-[var(--brand-black)] text-white p-5 sm:p-6 flex flex-col justify-between min-h-[260px]"
              >
                <div>
                  <h3 className="text-lg font-bold">Not sure which fits?</h3>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">
                    Send us a WhatsApp describing the situation — lost a key, locked out, want to upgrade
                    the office access system — and we&apos;ll tell you which service applies and what it&apos;ll cost.
                  </p>
                </div>
                <Button
                  asChild
                  className="mt-4 bg-[var(--brand-gold)] text-[var(--brand-gold-foreground)] hover:bg-[var(--brand-gold-soft)] gap-2"
                >
                  <a href={waLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" /> Ask us on WhatsApp
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section id="about" className="scroll-mt-20 py-12 sm:py-16 lg:py-20 bg-[var(--brand-cream)]">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/5 relative">
                  <Image
                    src="/assets/hero-workshop.jpg"
                    alt={`${BRAND.name} — locksmith at work`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                {/* Est. badge */}
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 rounded-xl bg-[var(--brand-gold)] text-[var(--brand-gold-foreground)] px-4 py-3 shadow-lg">
                  <p className="text-[10px] uppercase tracking-wider font-semibold">Established</p>
                  <p className="text-2xl sm:text-3xl font-bold leading-none">{BRAND.established}</p>
                </div>
              </motion.div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)] mb-2">
                  About us
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--brand-black)]">
                  Nearly 80 years of keeping the Eastern Cape secure
                </h2>
                <div className="mt-4 space-y-4 text-sm sm:text-base text-foreground/80 leading-relaxed">
                  <p>
                    Established in {BRAND.established}, {BRAND.name} has proudly served Port Elizabeth
                    (now Gqeberha), the Eastern Cape, and beyond for nearly 80 years. Over the decades,
                    the company has grown significantly, backed by a team of dedicated in-house and mobile
                    professionals who are expertly trained to keep clients safe and secure.
                  </p>
                  <p>
                    We&apos;re a real trade business — not a call centre. Our branches in Newton Park and
                    North End are staffed by trained locksmiths, and our mobile units cover the broader
                    Gqeberha area for on-site work. Every job we do is backed by LASA accreditation and
                    PSIRA registration.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <Stat label="Years of service" value={`${new Date().getFullYear() - BRAND.established}+`} />
                  <Stat label="Branches" value="2" />
                  <Stat label="Accreditations" value="2" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Product categories ---------- */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)] mb-2">
                Products
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--brand-black)]">
                Stocked, supplied and installed
              </h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-2xl mx-auto">
                A selection of the product categories we carry. Visit either branch to browse the full range.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {PRODUCT_CATEGORIES.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                >
                  <Card className="overflow-hidden border-black/10 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="aspect-[15/14] bg-[var(--brand-cream)] overflow-hidden">
                        { }
                        <img src={c.image} alt={c.label} className="h-full w-full object-cover" />
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <h3 className="font-semibold text-sm sm:text-base text-[var(--brand-black)]">{c.label}</h3>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Accreditation ---------- */}
        <section id="accreditation" className="scroll-mt-20 py-12 sm:py-16 lg:py-20 bg-[var(--brand-black)] text-white">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)] mb-2">
                Accreditation
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Registered, accredited, accountable
              </h2>
              <p className="mt-3 text-sm text-white/70 max-w-2xl mx-auto">
                We hold the two accreditations that matter most in the South African security industry.
                That&apos;s not a marketing claim — both are verifiable on the official registers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <Card className="bg-white/5 border-white/10 text-white backdrop-blur">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 h-12 w-12 rounded-lg bg-[var(--brand-gold)]/15 text-[var(--brand-gold)] flex items-center justify-center">
                      <ShieldCheck className="h-6 w-6" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--brand-gold)] font-semibold">LASA</p>
                      <h3 className="text-lg font-bold mt-0.5">Locksmiths&apos; Association of South Africa</h3>
                      <p className="mt-2 text-sm text-white/80 leading-relaxed">
                        {BRAND.lasaDescription}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 text-white backdrop-blur">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 h-12 w-12 rounded-lg bg-[var(--brand-gold)]/15 text-[var(--brand-gold)] flex items-center justify-center">
                      <BadgeCheck className="h-6 w-6" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--brand-gold)] font-semibold">PSIRA</p>
                      <h3 className="text-lg font-bold mt-0.5">Private Security Industry Regulatory Authority</h3>
                      <p className="mt-2 text-sm text-white/80 leading-relaxed">
                        {BRAND.psiraDescription}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 rounded-lg border border-[var(--brand-gold)]/30 bg-[var(--brand-gold)]/10 p-4 flex gap-3 items-start">
              <CheckCircle2 className="h-5 w-5 text-[var(--brand-gold)] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-white/90">
                <strong>Proof of ownership is required</strong> for every vehicle or property we work on —
                either original registration papers or a signed letter of authority from the registered owner.
                This protects you and is a condition of our LASA membership.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Service request form ---------- */}
        <section id="request" className="scroll-mt-20 py-12 sm:py-16 lg:py-20 bg-[var(--brand-cream)]">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)] mb-2">
                Service request
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--brand-black)]">
                Request a service in under a minute
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground">
                Fill in four quick steps. We&apos;ll get your request on WhatsApp and follow up with a quote and proposed time.
              </p>
            </div>
            <ServiceRequestForm />
          </div>
        </section>

        {/* ---------- Branches ---------- */}
        <section id="branches" className="scroll-mt-20 py-12 sm:py-16 lg:py-20 bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)] mb-2">
                Branches
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--brand-black)]">
                Two branches in Gqeberha
              </h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-2xl mx-auto">
                Visit either branch in person, or call ahead to confirm stock and availability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {BRAND.branches.map((b, i) => (
                <motion.div
                  key={b.name}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                >
                  <Card className="border-black/10 h-full">
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="h-10 w-10 rounded-lg bg-[var(--brand-gold)]/15 text-[var(--brand-gold)] flex items-center justify-center">
                          <Building2 className="h-5 w-5" />
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-[var(--brand-black)]">{b.name} branch</h3>
                      </div>

                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 mt-0.5 text-[var(--brand-gold)] shrink-0" />
                          <a
                            href={b.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[var(--brand-gold)] transition-colors"
                          >
                            {b.address}
                          </a>
                        </li>
                        <li className="flex items-start gap-3">
                          <Phone className="h-4 w-4 mt-0.5 text-[var(--brand-gold)] shrink-0" />
                          <a href={`tel:${b.phoneTel}`} className="hover:text-[var(--brand-gold)] transition-colors">
                            {b.phoneDisplay}
                          </a>
                        </li>
                        <li className="flex items-start gap-3">
                          <Mail className="h-4 w-4 mt-0.5 text-[var(--brand-gold)] shrink-0" />
                          <a href={`mailto:${b.email}`} className="hover:text-[var(--brand-gold)] transition-colors break-all">
                            {b.email}
                          </a>
                        </li>
                        <li className="flex items-start gap-3">
                          <Clock className="h-4 w-4 mt-0.5 text-[var(--brand-gold)] shrink-0" />
                          <span className="text-muted-foreground">{BRAND.hours}</span>
                        </li>
                      </ul>

                      <div className="mt-5 flex gap-2">
                        <Button
                          asChild
                          size="sm"
                          className="bg-[var(--brand-gold)] text-[var(--brand-gold-foreground)] hover:bg-[var(--brand-gold-soft)] gap-1.5"
                        >
                          <a href={`tel:${b.phoneTel}`}>
                            <Phone className="h-3.5 w-3.5" /> Call branch
                          </a>
                        </Button>
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="border-black/15 text-[var(--brand-black)] hover:bg-black/5"
                        >
                          <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                            <MapPin className="h-3.5 w-3.5" /> Directions
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section id="faq" className="scroll-mt-20 py-12 sm:py-16 lg:py-20 bg-[var(--brand-cream)]">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)] mb-2">
                Before you ask
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--brand-black)]">
                Common questions
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f) => (
                <AccordionItem key={f.q} value={f.q} className="bg-white border border-black/10 rounded-lg mb-2 px-4 shadow-sm">
                  <AccordionTrigger className="text-left text-sm sm:text-base hover:no-underline py-4">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4">
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
                  <MessageCircle className="h-4 w-4" /> Chat to {BRAND.shortName}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="bg-[var(--brand-black-deep)] text-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Image
                src="/logo.png"
                alt={`${BRAND.name} logo`}
                width={200}
                height={60}
                className="h-10 sm:h-12 w-auto brightness-0 invert"
              />
              <p className="mt-4 text-sm text-white/70 max-w-md leading-relaxed">
                {BRAND.tagline} Established {BRAND.established}, {BRAND.name} has proudly served
                Gqeberha, the Eastern Cape, and beyond for nearly 80 years.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="border-[var(--brand-gold)]/40 text-[var(--brand-gold)] bg-[var(--brand-gold)]/10 gap-1">
                  <ShieldCheck className="h-3 w-3" /> LASA accredited
                </Badge>
                <Badge variant="outline" className="border-white/20 text-white/80 bg-white/5 gap-1">
                  <BadgeCheck className="h-3 w-3" /> PSIRA registered
                </Badge>
                <Badge variant="outline" className="border-white/20 text-white/80 bg-white/5 gap-1">
                  <Clock className="h-3 w-3" /> 24/7 callouts
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--brand-gold)] mb-3 font-semibold">
                Branches
              </p>
              <ul className="space-y-3 text-sm">
                {BRAND.branches.map((b) => (
                  <li key={b.name}>
                    <p className="font-semibold">{b.name}</p>
                    <p className="text-white/70 text-xs mt-0.5">{b.address}</p>
                    <a href={`tel:${b.phoneTel}`} className="text-white/80 hover:text-[var(--brand-gold)] transition-colors text-xs">
                      {b.phoneDisplay}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--brand-gold)] mb-3 font-semibold">
                Quick links
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  { href: "#services", label: "Services" },
                  { href: "#about", label: "About us" },
                  { href: "#accreditation", label: "Accreditation" },
                  { href: "#branches", label: "Branches" },
                  { href: "#request", label: "Request a service" },
                  { href: "#faq", label: "FAQ" },
                ].map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-white/70 hover:text-[var(--brand-gold)] transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={BRAND.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/5 hover:bg-[var(--brand-gold)] hover:text-[var(--brand-gold-foreground)] transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/50">
            <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <Key className="h-3 w-3" />
              LASA accredited · PSIRA registered · Est. {BRAND.established}
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
    <div className="rounded-lg border border-black/10 bg-white p-3 text-center">
      <p className="text-xl sm:text-2xl font-bold text-[var(--brand-black)]">{value}</p>
      <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 uppercase tracking-wider">{label}</p>
    </div>
  );
}

const FAQS = [
  {
    q: "Do I need to bring the car/property to you, or do you come to me?",
    a:
      "Both. Our two branches in Newton Park and North End are open during business hours for walk-in key cutting and product sales, and we run mobile units that cover the broader Gqeberha area for on-site work — particularly useful for vehicle key coding, lockouts and safe installations.",
  },
  {
    q: "What do I need to prove ownership?",
    a:
      "Either the original vehicle registration papers in your name, or a signed letter of authority from the registered owner along with a copy of their ID. For properties we accept a utility bill or similar proof of address. This is a LASA requirement and protects both you and us.",
  },
  {
    q: "Can you cut a key if I've lost the only one?",
    a:
      "Usually yes. Where the lock or VIN supports it we can decode the lock or pull the key code from the manufacturer's database. For newer vehicles we pair the new transponder to the immobiliser on-site at your location.",
  },
  {
    q: "Do you do insurance and stolen-key work?",
    a:
      "Yes. As a LASA-accredited and PSIRA-registered locksmith we issue formal key-cutting records, invoices and stolen-key assessment reports that South African insurers and SAPS will accept.",
  },
  {
    q: "How do I pay?",
    a:
      "We accept cash, card and EFT. Payment is due on completion of the job, once you've verified the work is satisfactory. For larger installations (safes, access-control systems) we may require a deposit on quote acceptance.",
  },
  {
    q: "Is the WhatsApp quote binding?",
    a:
      "The WhatsApp quote is indicative based on what you tell us. If we arrive and find the job differs — different immobiliser, snapped blade, non-standard lock — we'll re-quote on the spot before starting any work. No surprise charges.",
  },
  {
    q: "Do you work after hours?",
    a:
      "Yes, for emergencies. Standard branch hours are Mon–Fri 08:00–17:00 and Sat 08:00–13:00, but we run 24/7 emergency callouts for lockouts, break-in securing and similar urgent situations. Use the WhatsApp form or call either branch number.",
  },
];
