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
  const isLastCard = index === 4;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`
        relative overflow-hidden rounded-[18px] 
        bg-[rgba(15,25,30,0.55)] backdrop-blur-xl backdrop-saturate-[160%]
        border border-white/[0.08] 
        shadow-[0_4px_15px_rgba(0,0,0,0.25)]
        transition-all duration-[350ms] ease-out
        hover:scale-[1.03] hover:shadow-[0_8px_25px_rgba(0,255,200,0.12)] hover:border-[rgba(0,255,200,0.25)]
        ${isLastCard ? 'md:col-span-2 lg:col-span-1 lg:max-w-md lg:mx-auto' : ''}
      `}
    >
      {/* Image - fills top portion with gradient overlay */}
      <div className="relative w-full h-40 sm:h-48 overflow-hidden">
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover object-top opacity-[0.92]"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-[#d9e6e9] mb-2">
          {feature.title}
        </h3>
        <p className="text-sm text-[#a8c0c5] leading-relaxed">
          {feature.subtitle}
        </p>
      </div>
    </motion.div>
  );
};

export const FeatureShowcaseCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {features.map((feature, index) => (
        <FeatureCard key={feature.title} feature={feature} index={index} />
      ))}
    </div>
  );
};
