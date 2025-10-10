import { getSpecialties } from '../lib/specialties';
import AdvocateSearchPage from './AdvocateSearchPage';

export default async function Home() {
  try {
    // Fetch specialties server-side for performance
    const specialties = await getSpecialties();

    return <AdvocateSearchPage specialties={specialties} />;
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="max-w-md mx-auto text-center p-8 bg-neutral-white/90 backdrop-blur-sm rounded-2xl border-2 border-accent-gold-light shadow-card">
          <h1 className="font-heading text-2xl font-normal mb-4 text-primary-default">
            Service Temporarily Unavailable
          </h1>
          <p className="text-neutral-dark-grey mb-6">
            We&apos;re experiencing technical difficulties. Please try again in a few moments.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-default text-neutral-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
}
