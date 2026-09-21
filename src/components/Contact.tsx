import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { IconArrowRight, IconCheck, IconMail, IconPhone, IconPin } from "./Icons";
import { Reveal, SectionLabel } from "./Reveal";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!form.email.trim()) next.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.message.trim()) next.message = "Tell me a little about your project";
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    }, 900);
  };

  return (
    <section id="contact" className="border-b border-white/6">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 lg:grid-cols-12 lg:px-8 lg:py-20">
        <Reveal className="lg:col-span-4">
          <SectionLabel num="08" extra="Contact" />
          <h2 className="text-[36px] leading-[1.1] font-semibold tracking-tight text-white lg:text-[44px]">
            Let's create
            <br />
            <span className="text-[#8b7cff]">something.</span>
          </h2>
          <p className="mt-5 max-w-[320px] text-[13.5px] leading-relaxed text-white/45">
            Have a project in mind, a collaboration idea, or just want to say hi? I'd love to hear from you.
          </p>
        </Reveal>

        <Reveal delay={80} className="flex flex-col justify-center gap-6 lg:col-span-3">
          <Info icon={<IconMail size={16} />} label="Email" value="abhishek@gmail.com" href="mailto:abhishek@gmail.com" />
          <Info icon={<IconPhone size={16} />} label="Phone" value="+91 98765 43210" href="tel:+919876543210" />
          <Info icon={<IconPin size={16} />} label="Location" value="India" />
        </Reveal>

        <Reveal delay={140} className="lg:col-span-5">
          {status === "sent" ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl bg-[#0c1018] p-8 text-center ring-1 ring-white/8">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#8b7cff]/20 text-[#c4b5fd]">
                <IconCheck size={22} />
              </span>
              <h3 className="text-lg font-semibold">Message sent</h3>
              <p className="mt-2 max-w-xs text-[13px] text-white/50">Thanks for reaching out. I'll get back to you soon.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-[13px] text-[#8ea0ff] hover:text-white"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="rounded-2xl bg-[#0c1018] p-5 ring-1 ring-white/8 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Name *" error={errors.name}>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-white/8 bg-[#0a0d14] px-3 py-2.5 text-[13px] text-white placeholder:text-white/25"
                  />
                </Field>
                <Field label="Email *" error={errors.email}>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="Your email"
                    className="w-full rounded-lg border border-white/8 bg-[#0a0d14] px-3 py-2.5 text-[13px] text-white placeholder:text-white/25"
                  />
                </Field>
              </div>
              <Field label="Message *" error={errors.message} className="mt-3">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-lg border border-white/8 bg-[#0a0d14] px-3 py-2.5 text-[13px] text-white placeholder:text-white/25"
                />
              </Field>
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#c4b5fd] py-3 text-[13px] font-semibold text-[#1a1033] transition hover:bg-[#d4c8ff] disabled:opacity-70"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
                <IconArrowRight size={14} />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[11px] text-white/40">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-[11px] text-rose-400">{error}</span> : null}
    </label>
  );
}

function Info({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60">
        {icon}
      </span>
      <span>
        <span className="block text-[11px] text-white/35">{label}</span>
        <span className="text-[13px] text-white/80">{value}</span>
      </span>
    </>
  );
  if (href) {
    return (
      <a href={href} className="flex items-start gap-3 transition hover:text-white">
        {inner}
      </a>
    );
  }
  return <div className="flex items-start gap-3">{inner}</div>;
}
