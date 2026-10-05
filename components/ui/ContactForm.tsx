"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { submitContact, type ContactPayload } from "@/lib/contact";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Errors = Partial<Record<keyof ContactPayload, string>>;
type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "done"; message: string }
  | { state: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: ContactPayload): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = "Please add your name.";
  if (!data.email.trim()) errors.email = "Please add your email.";
  else if (!EMAIL_RE.test(data.email)) errors.email = "That email doesn’t look quite right.";
  if (data.message.trim().length < 10) errors.message = "A sentence or two helps — at least 10 characters.";
  return errors;
}

export function ContactForm() {
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: ContactPayload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const found = validate(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ state: "sending" });
    const result = await submitContact(data);
    if (!result.ok) {
      setStatus({ state: "error", message: result.error });
      return;
    }
    if (result.via === "endpoint") form.reset();
    setStatus({
      state: "done",
      message:
        result.via === "endpoint"
          ? "Thanks — your message is on its way. I’ll get back to you soon."
          : "Your email app should open with the message ready to send. If it didn’t, copy the address shown on this page.",
    });
  };

  const field = (name: keyof ContactPayload, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => {
    const id = `${uid}-${name}`;
    const err = errors[name];
    return (
      <div className="group relative">
        <label htmlFor={id} className="label-xs block transition-colors group-focus-within:text-accent">
          {label}
        </label>
        <input
          id={id}
          name={name}
          aria-invalid={Boolean(err) || undefined}
          aria-describedby={err ? `${id}-err` : undefined}
          className="mt-3 w-full rounded-xl border border-input bg-bg/60 px-4 py-3 text-base text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-accent aria-[invalid]:border-danger"
          {...props}
        />
        {err && (
          <p id={`${id}-err`} className="mt-2 text-sm text-danger">
            {err}
          </p>
        )}
      </div>
    );
  };

  const messageId = `${uid}-message`;

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6" aria-label="Contact form">
      <div className="grid gap-6 sm:grid-cols-2">
        {field("name", "Name", { autoComplete: "name", placeholder: "Your name" })}
        {field("email", "Email", { type: "email", autoComplete: "email", placeholder: "you@company.com" })}
      </div>
      {field("subject", "Project / Subject", { placeholder: "What’s it about?" })}
      <div className="group">
        <label htmlFor={messageId} className="label-xs block transition-colors group-focus-within:text-accent">
          Message
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={5}
          aria-invalid={Boolean(errors.message) || undefined}
          aria-describedby={errors.message ? `${messageId}-err` : undefined}
          placeholder="Tell me a little about the project, timeline and what you need."
          className="mt-3 w-full resize-y rounded-xl border border-input bg-bg/60 px-4 py-3 text-base text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-accent aria-[invalid]:border-danger"
        />
        {errors.message && (
          <p id={`${messageId}-err`} className="mt-2 text-sm text-danger">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status.state === "sending"}
          className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-medium tracking-tight text-accent-ink shadow-[var(--shadow-primary)] transition-all duration-200 hover:gap-3 hover:brightness-105 disabled:opacity-60"
        >
          {status.state === "sending" ? "Sending…" : "Send Message"}
          <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:rotate-45" />
        </button>
        <p className="text-sm text-muted">Subject is optional.</p>
      </div>

      <div role="status" aria-live="polite" className="min-h-6">
        <AnimatePresence mode="wait">
          {(status.state === "done" || status.state === "error") && (
            <motion.p
              key={status.state}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className={cn("text-[0.9375rem]", status.state === "error" ? "text-danger" : "text-fg/85")}
            >
              {status.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
