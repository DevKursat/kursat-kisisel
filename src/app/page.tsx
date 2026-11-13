import Navbar from "@/components/Navbar";
import VideoScroller from "@/components/VideoScroller";
import { ScrollTextLines } from "@/components/core/scroll-text-lines";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main className="relative bg-[#000000] min-h-screen text-white">
      {/* Precision Custom Fluid Cursor */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar />

      {/* Apple Keynote Scroller (143 Frames Canvas Engine) */}
      <VideoScroller totalFrames={143} />

      {/* Kinetic Alternating Ticker Lines */}
      <ScrollTextLines />

      {/* Flagship Works & Rising Blog Section Deck */}
      <div className="relative">
        <ProjectsSection />
        <BlogSection />
      </div>

      {/* Cinematic Finale: Contact Scroller with Integrated Monumental Footer */}
      <ContactSection />
    </main>
  );
}
