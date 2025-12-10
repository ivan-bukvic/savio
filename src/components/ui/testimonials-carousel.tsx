import React, { useState, useEffect, useCallback, useRef, TouchEvent } from 'react';
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

const testimonials: Testimonial[] = [
  {
    image: testimonialSarah,
    quote: "Savio helped me finally understand my expenses and start saving for the first time. I can't imagine managing my finances without it.",
    name: 'Sarah Mitchell',
    role: 'Marketing Manager',
    rating: 5
  },
  {
    image: testimonialJames,
    quote: "The AI insights are spot on — it feels like having a personal financial coach. My savings have doubled in just six months.",
    name: 'James Chen',
    role: 'Software Developer',
    rating: 5
  },
  {
    image: testimonialMaria,
    quote: "My debt payoff plan has never been clearer. This app is a game changer. I finally feel in control of my financial future.",
    name: 'Maria Rodriguez',
    role: 'Small Business Owner',
    rating: 5
  },
  {
    image: testimonialDaniel,
    quote: "The savings goals and AI insights completely changed how I plan my cash flow. It feels like having a personal financial advisor.",
    name: 'Daniel R.',
    role: 'Freelance Designer',
    rating: 5
  },
  {
    image: testimonialJessica,
    quote: "Savio helps me stay on top of my income from multiple clients without the stress. The dashboard feels clean and empowering.",
    name: 'Jessica M.',
    role: 'Project Manager',
    rating: 5
  }
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < rating ? "text-primary fill-primary" : "text-muted-foreground/30"
        )}
      />
    ))}
  </div>
);

interface TestimonialCardProps {
  testimonial: Testimonial;
  position: 'left' | 'center' | 'right';
}

const TestimonialCard = ({ testimonial, position }: TestimonialCardProps) => {
  const isCenter = position === 'center';
  const isLeft = position === 'left';

  return (
    <div
      className={cn(
        "relative rounded-2xl transition-all duration-500 w-full h-full",
        "border border-white/[0.08]",
        isCenter
          ? "p-8 bg-[rgba(28,32,36,0.85)] backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,200,0.20)]"
          : "p-6 bg-[rgba(20,24,27,0.55)] backdrop-blur-lg"
      )}
      style={{
        minHeight: isCenter ? '260px' : '240px',
        transform: isCenter ? 'scale(1)' : 'scale(0.93)',
        opacity: isCenter ? 1 : 0.65,
        filter: isCenter ? 'none' : 'brightness(0.85)',
      }}
    >
      {/* Spotlight glow effect for center card */}
      {isCenter && (
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-primary/15 via-primary/5 to-transparent pointer-events-none -z-10 blur-xl" />
      )}

      {/* Directional fade overlay for side cards */}
      {!isCenter && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: isLeft
              ? 'linear-gradient(to right, rgba(0,0,0,0.35), rgba(0,0,0,0))'
              : 'linear-gradient(to left, rgba(0,0,0,0.35), rgba(0,0,0,0))',
          }}
        />
      )}

      {/* Quote */}
      <p
        className={cn(
          "leading-relaxed mb-8 relative z-10",
          isCenter
            ? "text-base md:text-lg text-foreground/95"
            : "text-sm text-foreground/80"
        )}
      >
        "{testimonial.quote}"
      </p>

      {/* Author info */}
      <div className="flex items-center gap-4 relative z-10">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className={cn(
            "rounded-full object-cover",
            isCenter
              ? "w-14 h-14 border-2 border-primary/40"
              : "w-10 h-10 border border-white/20"
          )}
        />
        <div className="flex-1">
          <p
            className={cn(
              "font-semibold",
              isCenter ? "text-foreground text-base" : "text-foreground/80 text-sm"
            )}
          >
            {testimonial.name}
          </p>
          <p
            className={cn(
              isCenter
                ? "text-muted-foreground text-sm"
                : "text-muted-foreground/70 text-xs"
            )}
          >
            {testimonial.role}
          </p>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>
    </div>
  );
};

export const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleNext = useCallback(() => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsSliding(false), 600);
  }, [isSliding]);

  const handlePrev = useCallback(() => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsSliding(false), 600);
  }, [isSliding]);

  const goToSlide = useCallback((index: number) => {
    if (isSliding || index === currentIndex) return;
    setIsSliding(true);
    setCurrentIndex(index);
    setTimeout(() => setIsSliding(false), 600);
  }, [isSliding, currentIndex]);

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Auto-cycle every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Get visible slides (previous, current, next)
  const getVisibleSlides = () => {
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    const nextIndex = (currentIndex + 1) % testimonials.length;
    return [
      { index: prevIndex, position: 'left' as const },
      { index: currentIndex, position: 'center' as const },
      { index: nextIndex, position: 'right' as const },
    ];
  };

  const visibleSlides = getVisibleSlides();

  return (
    <div
      className="relative w-full py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        background: 'radial-gradient(circle at center, rgba(0, 255, 200, 0.08), transparent 60%)',
      }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
          Don't take our word for it.
        </h2>
        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground/70">
          Over 100+ people trust us.
        </p>
      </motion.div>

      {/* Carousel Container */}
      <div
        className="relative max-w-7xl mx-auto overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slider Track */}
        <div
          ref={trackRef}
          className="flex items-center justify-center transition-transform duration-[600ms] ease-in-out"
          style={{
            transform: `translateX(0)`,
          }}
        >
          {/* Cards Container - Show 3 cards with smooth transitions */}
          <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8 px-4 w-full">
            {visibleSlides.map(({ index, position }) => (
              <div
                key={`${position}-${index}`}
                className={cn(
                  "transition-all duration-[600ms] ease-in-out flex-shrink-0",
                  position === 'center'
                    ? "w-full max-w-[480px] lg:max-w-[560px] z-10"
                    : "hidden md:block w-full max-w-[400px] lg:max-w-[480px] z-0"
                )}
                style={{
                  transform: position === 'left' 
                    ? 'translateX(0) perspective(1000px) rotateY(2deg)' 
                    : position === 'right' 
                    ? 'translateX(0) perspective(1000px) rotateY(-2deg)'
                    : 'translateX(0)',
                }}
              >
                <TestimonialCard
                  testimonial={testimonials[index]}
                  position={position}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Edge fade overlays - cinematic gradient fades */}
        <div
          className="absolute inset-y-0 left-0 w-[12%] md:w-[18%] pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(to right, rgba(15,17,19,0.95) 0%, rgba(15,17,19,0.7) 40%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-[12%] md:w-[18%] pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(to left, rgba(15,17,19,0.95) 0%, rgba(15,17,19,0.7) 40%, transparent 100%)',
          }}
        />
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center justify-center gap-4 mt-12">
        <button
          onClick={handlePrev}
          disabled={isSliding}
          className="group inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(15,25,35,0.6)] border border-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(0,200,180,0.25)] hover:bg-[rgba(15,35,40,0.8)] disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
        <button
          onClick={handleNext}
          disabled={isSliding}
          className="group inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(15,25,35,0.6)] border border-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(0,200,180,0.25)] hover:bg-[rgba(15,35,40,0.8)] disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              currentIndex === index
                ? "w-6 bg-primary"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
