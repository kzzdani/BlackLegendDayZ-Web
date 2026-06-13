import { Hero } from "@/components/sections/Hero";
import { ConnectBar } from "@/components/sections/ConnectBar";
import { StorySection } from "@/components/sections/StorySection";
import { Features } from "@/components/sections/Features";
import { QuickStart } from "@/components/sections/QuickStart";
import { MapsSection } from "@/components/sections/MapsSection";
import { ClipsSection } from "@/components/sections/ClipsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { AnnouncementsSection } from "@/components/sections/AnnouncementsSection";
import { Gallery } from "@/components/sections/Gallery";
import { Faq } from "@/components/sections/Faq";
import { JoinCTA } from "@/components/sections/JoinCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ConnectBar />
      <StorySection />
      <Features />
      <QuickStart />
      <MapsSection />
      <ClipsSection />
      <EventsSection />
      <AnnouncementsSection />
      <Gallery />
      <Faq />
      <JoinCTA />
    </>
  );
}
