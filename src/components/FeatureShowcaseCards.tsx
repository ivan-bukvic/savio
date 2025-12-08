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
        relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 
        shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]
        ${isLastCard ? 'md:col-span-2 lg:col-span-1 lg:max-w-md lg:mx-auto' : ''}
      `}
    >
      {/* Image - positioned at top right with fade */}
      <div className="absolute top-0 right-0 w-[65%] h-32 sm:h-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-card/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/80 z-10" />
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover object-top-left opacity-80 rounded-bl-xl"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-20 p-6 pt-36 sm:pt-44">
        <h3 className="text-xl font-bold text-foreground mb-2">
          {feature.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
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
