import { Hero } from "@/components/sections/Hero";
import { SkillsMarquee } from "@/components/sections/SkillsMarquee";
import { Intro } from "@/components/sections/Intro";
import { Stats } from "@/components/sections/Stats";
import { SelectedWork } from "@/components/sections/SelectedWork";

export default function Home() {
  return (
    <>
      <Hero />
      <SkillsMarquee />
      <Intro />
      <Stats />
      <SelectedWork />
    </>
  );
}
