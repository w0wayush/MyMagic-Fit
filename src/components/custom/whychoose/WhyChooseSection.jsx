import { AnimatedSection } from "@/home/Home";

export const WhyChooseSection = () => {
  return (
    <AnimatedSection className="py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Why Choose MagicFit?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "AI-Powered Styling", icon: "🧠" },
            { title: "Perfect Fit Guarantee", icon: "✨" },
            { title: "Sustainable Fashion", icon: "🌿" },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};
