
import React from 'react';

const StadiumLocation: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center uppercase text-[#00105A] mb-10">Location & Directions</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md aspect-video">
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(/assets/images/stadium/Spain Park.jpg)` }} />
          </div>
          
          {/* Directions Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">Address</h3>
              <p className="text-dark-gray">Spain Park Stadium<br />Victoria Road<br />Aberdeen<br />AB11 9DB</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">Getting Here</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-dark-gray mb-1">By Car</h4>
                  <p className="text-dark-gray text-sm">Located just off Victoria Road in Aberdeen. Free parking available on-site and in surrounding streets.</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-dark-gray mb-1">Public Transport</h4>
                  <p className="text-dark-gray text-sm">Multiple bus routes stop within walking distance of the stadium. The nearest bus stop is on Victoria Road.</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-dark-gray mb-1">Parking</h4>
                  <p className="text-dark-gray text-sm">Free parking is available at the stadium with overflow parking available on adjacent streets.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StadiumLocation;
