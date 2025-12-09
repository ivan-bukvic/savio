import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import testimonial images
import testimonialSarah from '@/assets/testimonial-sarah.jpg';
import testimonialJames from '@/assets/testimonial-james.jpg';
import testimonialMaria from '@/assets/testimonial-maria.jpg';
import testimonialDaniel from '@/assets/testimonial-daniel.jpg';
import testimonialJessica from '@/assets/testimonial-jessica.jpg';
interface Testimonial {
  image: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
}
const testimonials: Testimonial[] = [{
  image: testimonialSarah,
  quote: "Savio helped me finally understand my expenses and start saving for the first time. I can't imagine managing my finances without it.",
  name: 'Sarah Mitchell',
  role: 'Marketing Manager',
  rating: 5
}, {
  image: testimonialJames,
  quote: "The AI insights are spot on — it feels like having a personal financial coach. My savings have doubled in just six months.",
  name: 'James Chen',
  role: 'Software Developer',
  rating: 5
}, {
  image: testimonialMaria,
  quote: "My debt payoff plan has never been clearer. This app is a game changer. I finally feel in control of my financial future.",
  name: 'Maria Rodriguez',
  role: 'Small Business Owner',
  rating: 5
}, {
  image: testimonialDaniel,
  quote: "The savings goals and AI insights completely changed how I plan my cash flow. It feels like having a personal financial advisor.",
  name: 'Daniel R.',
  role: 'Freelance Designer',
  rating: 5
}, {
  image: testimonialJessica,
  quote: "Savio helps me stay on top of my income from multiple clients without the stress. The dashboard feels clean and empowering.",
  name: 'Jessica M.',
  role: 'Project Manager',
  rating: 5
}];
const StarRating = ({
  rating
}: {
  rating: number;
}) => <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => <Star key={i} className={cn("h-4 w-4", i < rating ? "text-primary fill-primary" : "text-muted-foreground/30")} />)}
  </div>;
interface TestimonialCardProps {
  testimonial: Testimonial;
  position: 'left' | 'center' | 'right';
}
const TestimonialCard = ({
  testimonial,
  position
}: TestimonialCardProps) => {
  const isCenter = position === 'center';
  return <div className={cn("relative rounded-2xl transition-all duration-500 w-full", "border border-white/[0.08]", isCenter ? "p-8 bg-[rgba(15,30,40,0.75)] backdrop-blur-xl shadow-[0_0_60px_rgba(0,200,180,0.12)] transform scale-[1.02] -translate-y-1" : "p-6 bg-[rgba(10,20,30,0.6)] backdrop-blur-md opacity-40 blur-[1.5px] scale-[0.92]")} style={{
    minHeight: isCenter ? '260px' : '240px'
  }}>
      {/* Spotlight glow effect for center card */}
      {isCenter && <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none -z-10 blur-xl" />}
      
      {/* Quote */}
      <p className={cn("leading-relaxed mb-8", isCenter ? "text-base md:text-lg text-foreground/95" : "text-sm text-foreground/50")}>
        "{testimonial.quote}"
      </p>
      
      {/* Author info */}
      <div className="flex items-center gap-4">
        <img src={testimonial.image} alt={testimonial.name} className={cn("rounded-full object-cover", isCenter ? "w-14 h-14 border-2 border-primary/40" : "w-10 h-10 border border-white/10")} />
        <div className="flex-1">
          <p className={cn("font-semibold", isCenter ? "text-foreground text-base" : "text-foreground/60 text-sm")}>
            {testimonial.name}
          </p>
          <p className={cn("text-muted-foreground", isCenter ? "text-sm" : "text-xs")}>
            {testimonial.role}
          </p>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>
    </div>;
};
export const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const getIndex = (offset: number) => {
    return (currentIndex + offset + testimonials.length) % testimonials.length;
  };
  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  }, []);
  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-cycle every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);
  return <div className="relative w-full" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      {/* Section Header */}
      <motion.div initial={{
      opacity: 0,
      y: 30
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true
    }} transition={{
      duration: 0.6
    }} className="text-center mb-16">
        {/* Subtitle tag */}
        
        
        {/* Two-line title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
          Don't take our word for it.
        </h2>
        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground/70">
          Over 100+ people trust us.
        </p>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto px-4 overflow-hidden">
        {/* Cards Container - Always show 3 cards */}
        <div className="relative flex items-center justify-center gap-6 lg:gap-8 py-4">
          {/* Left Card */}
          <motion.div key={`left-${getIndex(-1)}`} className="hidden md:block w-full max-w-[400px] lg:max-w-[480px] flex-shrink-0" initial={{
          opacity: 0,
          x: -30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.5,
          ease: "easeOut"
        }}>
            <TestimonialCard testimonial={testimonials[getIndex(-1)]} position="left" />
          </motion.div>

          {/* Center Card - Main Focus */}
          <motion.div key={`center-${currentIndex}`} className="w-full max-w-[480px] lg:max-w-[560px] flex-shrink-0 z-10" initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.4,
          ease: "easeOut"
        }}>
            <TestimonialCard testimonial={testimonials[currentIndex]} position="center" />
          </motion.div>

          {/* Right Card */}
          <motion.div key={`right-${getIndex(1)}`} className="hidden md:block w-full max-w-[400px] lg:max-w-[480px] flex-shrink-0" initial={{
          opacity: 0,
          x: 30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.5,
          ease: "easeOut"
        }}>
            <TestimonialCard testimonial={testimonials[getIndex(1)]} position="right" />
          </motion.div>
        </div>

        {/* Edge fade overlays - cinematic gradient fades */}
        <div className="absolute inset-y-0 left-0 w-[15%] md:w-[20%] pointer-events-none z-20" style={{
        background: 'linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background) / 0.9) 30%, transparent 100%)'
      }} />
        <div className="absolute inset-y-0 right-0 w-[15%] md:w-[20%] pointer-events-none z-20" style={{
        background: 'linear-gradient(to left, hsl(var(--background)) 0%, hsl(var(--background) / 0.9) 30%, transparent 100%)'
      }} />
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center justify-center gap-4 mt-12">
        <button onClick={handlePrev} className="group inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(15,25,35,0.6)] border border-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(0,200,180,0.25)] hover:bg-[rgba(15,35,40,0.8)]" aria-label="Previous testimonial">
          <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
        <button onClick={handleNext} className="group inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(15,25,35,0.6)] border border-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(0,200,180,0.25)] hover:bg-[rgba(15,35,40,0.8)]" aria-label="Next testimonial">
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={cn("h-2 rounded-full transition-all duration-300", currentIndex === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50")} aria-label={`Go to testimonial ${index + 1}`} />)}
      </div>
    </div>;
};