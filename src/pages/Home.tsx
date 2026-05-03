import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';

const FEATURES = [
  { icon: 'FAST', title: 'Lightning Fast', description: 'Built with Vite for near-instant load times.' },
  { icon: 'SAFE', title: 'Secure', description: 'TypeScript keeps app data typed and predictable.' },
  { icon: 'FLEX', title: 'Responsive', description: 'Looks great on mobile, tablet, and desktop.' },
];

const Home = () => {
  return (
    <>
      <Hero />

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.title}
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
