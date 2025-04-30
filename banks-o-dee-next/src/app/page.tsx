
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Banks o\' Dee FC',
  description: 'Welcome to the official website of Banks o\' Dee Football Club',
};

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-primary mb-6">Banks o&apos; Dee FC</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Welcome to the official website of Banks o&apos; Dee Football Club
        </p>
        
        <div className="animate-fade-in bg-gray-100 rounded-lg p-8 mt-12 max-w-3xl mx-auto">
          <h2 className="text-h3 text-primary mb-4">Next.js Implementation</h2>
          <p className="mb-4">
            This is the initial setup of the Banks o&apos; Dee FC website using Next.js. 
            The project structure follows the App Router pattern with TypeScript and Tailwind CSS.
          </p>
          <div className="mt-8 inline-block">
            <span className="bg-accent px-4 py-2 rounded text-primary font-semibold">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
