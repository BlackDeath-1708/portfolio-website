"use client";

import { useState } from "react";
import { Magnetic } from "@/components/Magnetic";
import { siteConfig } from "@/lib/site-config";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name: string, email: string, message: string): Errors {
  const errors: Errors = {};
  if (!name.trim()) errors.name = "Tell me who you are.";
  if (!email.trim()) {
    errors.email = "An email so I can reply.";
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "That doesn't look like a valid email.";
  }
  if (!message.trim()) {
    errors.message = "What's this about?";
  } else if (message.trim().length < 10) {
    errors.message = "A bit more detail would help.";
  }
  return errors;
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(name, email, message);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = `Portfolio contact from ${name.trim()}`;
    const body = `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`;
    const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-10 flex max-w-xl flex-col gap-5">
      <div>
        <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="mt-2 w-full rounded-lg border border-black/10 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent dark:border-white/10"
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-xs text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="mt-2 w-full rounded-lg border border-black/10 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent dark:border-white/10"
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-xs text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="font-mono text-xs uppercase tracking-widest text-foreground-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-2 w-full resize-none rounded-lg border border-black/10 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent dark:border-white/10"
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Magnetic>
          <button
            type="submit"
            className="w-fit rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Send message
          </button>
        </Magnetic>
        {sent && (
          <p className="text-xs text-foreground-muted">
            Opening your email client — nothing sends automatically from here.
          </p>
        )}
      </div>
    </form>
  );
}
