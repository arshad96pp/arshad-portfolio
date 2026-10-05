import { PageIntro } from "@/components/ui/PageIntro";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageIntro
      label="404"
      title={
        <>
          This page <span className="font-light italic text-muted">doesn’t exist</span>
          <span className="text-accent">.</span>
        </>
      }
    >
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/">Back home</Button>
        <Button href="/work" variant="outline">
          View work
        </Button>
      </div>
    </PageIntro>
  );
}
