import { site } from "@/data/site";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type SubmitResult = { ok: true; via: "endpoint" | "mail-client" } | { ok: false; error: string };

/**
 * Integration point for the contact form.
 *
 * If NEXT_PUBLIC_CONTACT_ENDPOINT is set (e.g. a Formspree/Resend/API route URL),
 * the message is POSTed there as JSON. Otherwise the visitor's mail client is
 * opened with the message pre-filled, so the form always works — nothing is
 * faked as "sent".
 */
export async function submitContact(data: ContactPayload): Promise<SubmitResult> {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      return { ok: true, via: "endpoint" };
    } catch {
      return {
        ok: false,
        error: `Something went wrong sending your message. You can email me directly at ${site.email}.`,
      };
    }
  }

  const subject = data.subject || `Hello from ${data.name}`;
  const body = `${data.message}\n\n— ${data.name}\n${data.email}`;
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { ok: true, via: "mail-client" };
}
