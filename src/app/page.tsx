import { Hero } from "@/components/sections/Hero";
import { ConnectBar } from "@/components/sections/ConnectBar";
import { StorySection } from "@/components/sections/StorySection";
import { Features } from "@/components/sections/Features";
import { MapsSection } from "@/components/sections/MapsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { JoinCTA } from "@/components/sections/JoinCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ConnectBar />
      <StorySection />
      <Features />
      <MapsSection />
      <EventsSection />
      <JoinCTA />
    </>
  );
}
