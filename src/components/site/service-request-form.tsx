"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Key,
  Cpu,
  ShieldCheck,
  Wrench,
  ArrowRight,
  ArrowLeft,
  Check,
  MessageCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { BRAND, SERVICES, type Service } from "@/lib/brand";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type ServiceId = Service["id"] | "other" | "";

const SERVICE_ICONS = {
  key: Key,
  chip: Cpu,
  shield: ShieldCheck,
  wrench: Wrench,
} as const;

type Urgency = "Standard" | "Urgent" | "Emergency (stranded)";
type PreferredContact = "WhatsApp" | "Phone call";

const STEPS = ["Service", "Vehicle", "Contact", "Review"] as const;
type StepKey = (typeof STEPS)[number];

const VEHICLE_MAKES = [
  "Toyota", "Volkswagen", "Ford", "Nissan", "Hyundai", "Kia", "Mercedes-Benz",
  "BMW", "Audi", "Isuzu", "Mazda", "Honda", "Suzuki", "Renault", "Chevrolet",
  "Land Rover", "Jeep", "Haval", "Chery", "Other / Not listed",
];

export function ServiceRequestForm() {
  const [step, setStep] = React.useState<number>(0);

  const [serviceId, setServiceId] = React.useState<ServiceId>("");
  const [make, setMake] = React.useState<string>("");
  const [model, setModel] = React.useState<string>("");
  const [year, setYear] = React.useState<string>("");
  const [vinOrKeycode, setVinOrKeycode] = React.useState<string>("");
  const [urgency, setUrgency] = React.useState<Urgency>("Standard");

  const [name, setName] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [preferredContact, setPreferredContact] = React.useState<PreferredContact>("WhatsApp");
  const [details, setDetails] = React.useState<string>("");

  const stepKey = STEPS[step] as StepKey;

  function validateStep(idx: number): string | null {
    if (idx === 0 && !serviceId) return "Please choose a service.";
    if (idx === 1) {
      if (!make) return "Please select the vehicle make.";
      if (!model.trim()) return "Please enter the vehicle model.";
    }
    if (idx === 2) {
      if (!name.trim()) return "Please enter your name.";
      if (!phone.trim() || phone.replace(/\D/g, "").length < 9)
        return "Please enter a valid contact number.";
    }
    return null;
  }

  function next() {
    const err = validateStep(step);
    if (err) {
      toast({
        title: "Missing details",
        description: err,
        variant: "destructive",
      });
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  const selectedService = React.useMemo(
    () => SERVICES.find((s) => s.id === serviceId) ?? null,
    [serviceId]
  );

  const composedMessage = React.useMemo(() => {
    const serviceLabel =
      serviceId === "other"
        ? "Other / not sure"
        : (selectedService?.label ?? "—");
    const lines = [
      `Hi ${BRAND.shortName} — I'd like to request a service via joedavis.co.za.`,
      "",
      `Service: ${serviceLabel}`,
      `Vehicle: ${[make, model, year].filter(Boolean).join(" ") || "—"}`,
      vinOrKeycode ? `VIN / key code: ${vinOrKeycode}` : null,
      `Urgency: ${urgency}`,
      "",
      `Name: ${name || "—"}`,
      `Contact: ${phone || "—"}`,
      `Location / suburb: ${location || "—"}`,
      `Preferred contact: ${preferredContact}`,
      details ? `Details: ${details}` : null,
    ].filter(Boolean) as string[];
    return lines.join("\n");
  }, [serviceId, selectedService, make, model, year, vinOrKeycode, urgency, name, phone, location, preferredContact, details]);

  function submit() {
    const err = validateStep(2);
    if (err) {
      toast({
        title: "Missing details",
        description: err,
        variant: "destructive",
      });
      return;
    }
    if (urgency.startsWith("Emergency")) {
      toast({
        title: "Emergency note",
        description:
          "For emergencies we'll try to reach you immediately on WhatsApp. If you can't wait, please call us directly.",
        variant: "default",
      });
    }
    const url = buildWhatsAppLink(composedMessage);
    window.open(url, "_blank", "noopener,noreferrer");
    toast({
      title: "Opening WhatsApp…",
      description: "Your request has been drafted. Tap send in WhatsApp to deliver it.",
    });
  }

  return (
    <div className="w-full">
      {/* Stepper */}
      <ol className="grid grid-cols-4 gap-1 sm:gap-2 mb-6" aria-label="Service request steps">
        {STEPS.map((label, i) => {
          const isDone = i < step;
          const isActive = i === step;
          return (
            <li key={label} className="flex flex-col items-center text-center">
              <div
                className={[
                  "h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors",
                  isActive
                    ? "border-[var(--brand-amber)] bg-[var(--brand-amber)] text-[var(--brand-amber-foreground)]"
                    : isDone
                    ? "border-[var(--brand-amber)] bg-[var(--brand-amber)]/10 text-[var(--brand-amber)]"
                    : "border-muted bg-background text-muted-foreground",
                ].join(" ")}
                aria-current={isActive ? "step" : undefined}
              >
                {isDone ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={[
                  "mt-1 text-[10px] sm:text-xs font-medium",
                  isActive ? "text-foreground" : "text-muted-foreground",
                ].join(" ")}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>

      <Card className="border-border/80 shadow-sm">
        <CardContent className="p-5 sm:p-7">
          <AnimatePresence mode="wait">
            {/* Step 1 — Service */}
            {stepKey === "Service" && (
              <motion.fieldset
                key="service"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                <legend className="text-base font-semibold mb-1">What do you need?</legend>
                <p className="text-sm text-muted-foreground -mt-1 mb-3">
                  Pick the service that best matches your situation. You can add more detail in the
                  final step.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((s) => {
                    const Icon = SERVICE_ICONS[s.icon];
                    const selected = serviceId === s.id;
                    return (
                      <label
                        key={s.id}
                        className={[
                          "group cursor-pointer rounded-lg border-2 p-4 flex gap-3 items-start transition-all",
                          selected
                            ? "border-[var(--brand-amber)] bg-[var(--brand-amber)]/10"
                            : "border-border hover:border-[var(--brand-amber)]/60 hover:bg-muted/40",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "shrink-0 h-9 w-9 rounded-md flex items-center justify-center transition-colors",
                            selected
                              ? "bg-[var(--brand-amber)] text-[var(--brand-amber-foreground)]"
                              : "bg-muted text-foreground",
                          ].join(" ")}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{s.label}</span>
                          </span>
                          <span className="block text-xs text-muted-foreground mt-1 line-clamp-3">
                            {s.shortDescription}
                          </span>
                          <span className="block text-xs text-muted-foreground mt-2">
                            From <span className="font-medium text-foreground">{s.indicativeFrom}</span>
                          </span>
                        </span>
                        <input
                          type="radio"
                          name="service"
                          value={s.id}
                          checked={selected}
                          onChange={() => setServiceId(s.id)}
                          className="sr-only"
                        />
                      </label>
                    );
                  })}
                  <label
                    className={[
                      "cursor-pointer rounded-lg border-2 p-4 flex gap-3 items-start transition-all",
                      serviceId === "other"
                        ? "border-[var(--brand-amber)] bg-[var(--brand-amber)]/10"
                        : "border-border hover:border-[var(--brand-amber)]/60 hover:bg-muted/40",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "shrink-0 h-9 w-9 rounded-md flex items-center justify-center transition-colors",
                        serviceId === "other"
                          ? "bg-[var(--brand-amber)] text-[var(--brand-amber-foreground)]"
                          : "bg-muted text-foreground",
                      ].join(" ")}
                    >
                      <Wrench className="h-4 w-4" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="font-semibold text-sm">Something else</span>
                      <span className="block text-xs text-muted-foreground mt-1">
                        Not sure which fits? Tell us what&apos;s happening in the final step.
                      </span>
                    </span>
                    <input
                      type="radio"
                      name="service"
                      value="other"
                      checked={serviceId === "other"}
                      onChange={() => setServiceId("other")}
                      className="sr-only"
                    />
                  </label>
                </div>
              </motion.fieldset>
            )}

            {/* Step 2 — Vehicle */}
            {stepKey === "Vehicle" && (
              <motion.div
                key="vehicle"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                <h2 className="text-base font-semibold mb-1">Vehicle details</h2>
                <p className="text-sm text-muted-foreground -mt-1 mb-3">
                  The make, model and year help us bring the right blanks and equipment to your
                  appointment.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="make">Make *</Label>
                    <Select value={make} onValueChange={setMake}>
                      <SelectTrigger id="make">
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        {VEHICLE_MAKES.map((m) => (
                          <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="model">Model *</Label>
                    <Input
                      id="model"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="e.g. Corolla Quest 1.6"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      inputMode="numeric"
                      value={year}
                      onChange={(e) =>
                        setYear(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))
                      }
                      placeholder="e.g. 2018"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="vin">VIN / key code (optional)</Label>
                    <Input
                      id="vin"
                      value={vinOrKeycode}
                      onChange={(e) => setVinOrKeycode(e.target.value)}
                      placeholder="Helps us pre-cut a key to code"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>How urgent is this?</Label>
                  <RadioGroup
                    value={urgency}
                    onValueChange={(v) => setUrgency(v as Urgency)}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                  >
                    {(["Standard", "Urgent", "Emergency (stranded)"] as Urgency[]).map((u) => (
                      <label
                        key={u}
                        className={[
                          "cursor-pointer rounded-md border p-3 text-sm flex items-center gap-2 transition-colors",
                          urgency === u
                            ? "border-[var(--brand-amber)] bg-[var(--brand-amber)]/10"
                            : "border-border hover:bg-muted/40",
                        ].join(" ")}
                      >
                        <RadioGroupItem value={u} id={`urg-${u.replace(/\W/g, "")}`} />
                        <span className="flex-1">{u}</span>
                        {u.startsWith("Emergency") && (
                          <AlertTriangle className="h-4 w-4 text-[var(--brand-amber)]" />
                        )}
                      </label>
                    ))}
                  </RadioGroup>
                  {urgency.startsWith("Emergency") && (
                    <p className="text-xs text-muted-foreground mt-1">
                      We&apos;ll prioritise your enquiry and aim to be on the road to you ASAP.
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3 — Contact */}
            {stepKey === "Contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                <h2 className="text-base font-semibold mb-1">Your details</h2>
                <p className="text-sm text-muted-foreground -mt-1 mb-3">
                  We&apos;ll only use this to follow up about your enquiry. No marketing lists.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Contact number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 082 123 4567"
                      autoComplete="tel"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="location">Location / suburb</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Randburg, Johannesburg"
                      autoComplete="address-level2"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label>Preferred follow-up</Label>
                    <RadioGroup
                      value={preferredContact}
                      onValueChange={(v) => setPreferredContact(v as PreferredContact)}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                    >
                      {(["WhatsApp", "Phone call"] as PreferredContact[]).map((c) => (
                        <label
                          key={c}
                          className={[
                            "cursor-pointer rounded-md border p-3 text-sm flex items-center gap-2 transition-colors",
                            preferredContact === c
                              ? "border-[var(--brand-amber)] bg-[var(--brand-amber)]/10"
                              : "border-border hover:bg-muted/40",
                          ].join(" ")}
                        >
                          <RadioGroupItem value={c} id={`contact-${c.replace(/\W/g, "")}`} />
                          <span className="flex-1">{c}</span>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="details">Anything else we should know?</Label>
                    <Textarea
                      id="details"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="e.g. only one key, key snapped in the lock, keyless-go button broken, etc."
                      rows={4}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4 — Review */}
            {stepKey === "Review" && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                <h2 className="text-base font-semibold mb-1">Review & send</h2>
                <p className="text-sm text-muted-foreground -mt-1 mb-3">
                  Tap the button below to open WhatsApp with this enquiry pre-filled. You can edit
                  the message before sending it.
                </p>
                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {composedMessage}
                  </pre>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your enquiry opens in WhatsApp addressed to <strong>{BRAND.name}</strong>. We typically
                  reply within 15–30 minutes during business hours.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={back}
              disabled={step === 0}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>

            {step < STEPS.length - 1 ? (
              <Button
                type="button"
                onClick={next}
                className="gap-1 bg-[var(--brand-amber)] text-[var(--brand-amber-foreground)] hover:bg-[var(--brand-amber)]/90"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={submit}
                className="gap-2 bg-[#25D366] text-white hover:bg-[#1ebd5a]"
              >
                <MessageCircle className="h-4 w-4" /> Send via WhatsApp
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
