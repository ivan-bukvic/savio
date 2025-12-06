import { motion } from "framer-motion";

// Import all logos
import bungeLogo from "@/assets/logos/bunge.png";
import openRatingsLogo from "@/assets/logos/open-ratings.png";
import pyramidLogo from "@/assets/logos/pyramid-analytics.png";
import abstractLogo from "@/assets/logos/abstract.png";
import independerLogo from "@/assets/logos/independer.png";
import shapeLogo from "@/assets/logos/shape.png";
import predicteasyLogo from "@/assets/logos/predicteasy.png";
import tectonicLogo from "@/assets/logos/tectonic.png";

const logos = [{
  src: bungeLogo,
  alt: "Bunge",
  invert: false
}, {
  src: openRatingsLogo,
  alt: "Open Ratings",
  invert: false
}, {
  src: pyramidLogo,
  alt: "Pyramid Analytics",
  invert: false
}, {
  src: abstractLogo,
  alt: "Abstract",
  invert: false
}, {
  src: independerLogo,
  alt: "Independer",
  invert: false
}, {
  src: shapeLogo,
  alt: "Shape",
  invert: false
}, {
  src: predicteasyLogo,
  alt: "PredictEasy",
  invert: true
}, {
  src: tectonicLogo,
  alt: "Tectonic",
  invert: true
}];
export const TrustedBySection = () => {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];
  return <section className="py-4 md:py-6 -mt-16 md:-mt-24 relative z-10 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-6 md:mb-8">
          <h2 className="text-base md:text-lg font-semibold text-muted-foreground">
            Trusted by Leading Innovators
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex overflow-hidden group">
          <div className="flex items-center gap-12 md:gap-16 lg:gap-20 shrink-0 animate-marquee group-hover:[animation-play-state:paused]">
            {duplicatedLogos.map((logo, index) => <div key={`${logo.alt}-${index}`} className="flex items-center justify-center shrink-0 transition-all duration-300 hover:opacity-70">
                <img src={logo.src} alt={logo.alt} className={`h-6 md:h-7 lg:h-8 w-auto object-contain grayscale opacity-70 hover:opacity-80 transition-opacity duration-300 ${logo.invert ? 'invert' : ''}`} />
              </div>)}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex items-center gap-12 md:gap-16 lg:gap-20 shrink-0 animate-marquee group-hover:[animation-play-state:paused]" aria-hidden="true">
          {duplicatedLogos.map((logo, index) => <div key={`${logo.alt}-dup-${index}`} className="flex items-center justify-center shrink-0 transition-all duration-300 hover:opacity-70">
                <img src={logo.src} alt={logo.alt} className={`h-6 md:h-7 lg:h-8 w-auto object-contain grayscale opacity-70 hover:opacity-80 transition-opacity duration-300 ${logo.invert ? 'invert' : ''}`} />
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};