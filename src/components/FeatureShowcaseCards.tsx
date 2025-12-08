import { motion } from "framer-motion";
import featureDashboard from "@/assets/feature-dashboard.png";
import featureIncome from "@/assets/feature-income.png";
import featureExpenses from "@/assets/feature-expenses.png";
import featureGoals from "@/assets/feature-goals.png";
import featureAI from "@/assets/feature-ai.png";

interface FeatureCard {
  title: string;
  subtitle: string;
  image: string;
}

const features: FeatureCard[] = [
  {
    title: "Visualize Your Finances",
    subtitle: "Clean charts and dashboards help you understand where your money goes",
    image: featureDashboard,
  },
  {
    title: "Track Income With Clarity",
    subtitle: "Monitor income sources month-to-month and see which streams drive your financial growth",
    image: featureIncome,
  },
  {
    title: "Stay on Top of Expenses",
    subtitle: "Categorized expense tracking helps you identify overspending and optimize your budget",
    image: featureExpenses,
  },
  {
    title: "Set and Reach Your Savings Goals",
    subtitle: "Create goals, track progress visually, and stay motivated with clear milestone insights",
    image: featureGoals,
  },
  {
    title: "Smart AI Insights Tailored to You",
    subtitle: "Personalized suggestions help you save more, reduce debt, and improve financial habits",
    image: featureAI,
  },
];

const FeatureCard = ({ feature, index }: { feature: FeatureCard; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 12px 35px rgba(0,255,200,0.15)",
        borderColor: "rgba(0,255,200,0.30)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="
        relative rounded-[18px] p-4 md:p-5
        bg-[rgba(15,25,30,0.55)] backdrop-blur-xl backdrop-saturate-[160%]
        border border-white/[0.08] 
        shadow-[0_4px_15px_rgba(0,0,0,0.25)]
        flex flex-col md:flex-row-reverse
        overflow-hidden
      "
    >
      {/* Image - right side on desktop, full width on mobile */}
      <div className="relative w-full md:w-[70%] h-56 sm:h-64 md:h-72 overflow-hidden flex-shrink-0 rounded-xl">
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover object-top opacity-[0.92]"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[rgba(15,25,30,0.4)] hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(15,25,30,0.4)] md:hidden" />
      </div>
      
      {/* Content - left side on desktop, vertically centered */}
      <div className="w-full md:w-[30%] p-4 md:p-5 flex flex-col justify-center md:text-left">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#d9e6e9] mb-3">
          {feature.title}
        </h3>
        <p className="text-sm sm:text-base text-[#a8c0c5] leading-relaxed">
          {feature.subtitle}
        </p>
      </div>
    </motion.div>
  );
};

export const FeatureShowcaseCards = () => {
  return (
    <div className="flex flex-col gap-6 lg:gap-8 max-w-4xl mx-auto">
      {features.map((feature, index) => (
        <FeatureCard key={feature.title} feature={feature} index={index} />
      ))}
    </div>
  );
};
