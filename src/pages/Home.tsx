// src/pages/Home.tsx
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import heroImg from '../assets/hero.png';

const FEATURES = [
  { icon: "⚡", title: "Lightning Fast", description: "Built with Vite for near-instant load times." },
  { icon: "🛡️", title: "Secure", description: "TypeScript ensures your data stays safe and typed." },
  { icon: "📱", title: "Responsive", description: "Looks amazing on mobile, tablet, and desktop." },
];

const Home = () => {
  return (
    <>
      <Hero
        title="Build Better Web Apps"
        subtitle="You already know React Native. Now, dominate the browser with the same logic and better tools."
        ctaText="Get Started"
        imageSrc={heroImg}
      />

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;