import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { WorkIndex } from "@/components/projects/WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects by Muhammed Arshad, full stack developer — full stack products, web applications and a cross-platform Electron desktop app.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageIntro label="Selected Works" title="Latest Works">
        <p className="mt-6 max-w-xl text-sm text-muted sm:text-base md:text-lg">
          From a cross-platform Electron app to hospital management, CRM and e-commerce
          products — the work I’ve built and shipped, end to end.
        </p>
      </PageIntro>
      <WorkIndex />
    </>
  );
}
