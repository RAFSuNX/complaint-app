import { Hero } from './components/Hero';
import { Stats } from './components/Stats';

export function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <Stats />
    </div>
  );
}