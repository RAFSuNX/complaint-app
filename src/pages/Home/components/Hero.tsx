import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-bd-green py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Voice Your Concerns
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-100">
            Submit and track complaints about government services. We ensure your voice is heard while maintaining your privacy and security.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link to="/submit">
              <Button 
                variant="secondary" 
                size="lg"
                className="font-semibold"
              >
                Submit a Complaint
              </Button>
            </Link>
            <Link to="/track">
              <Button 
                variant="outline"
                size="lg"
                className="font-semibold text-white border-white hover:bg-white/10"
              >
                Track Complaint
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}