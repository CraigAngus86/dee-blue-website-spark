import { useState, useEffect } from 'react';
import { fetchSanityData } from '@/lib/sanity/sanityClient';

export interface TimelineMilestone {
  year: number;
  title: string;
  description: string;
  heroImage: {
    _type: string;
    alt?: string;
    asset: {
      public_id: string;
      url: string;
    };
  };
  expandedContent?: any;
}

export interface StadiumData {
  _id: string;
  title: string;
  description: string;
  capacity: number;
  location: any;
  timeline: TimelineMilestone[];
  facilities: any[];
  gallery: any[];
}

export function useStadiumData() {
  const [data, setData] = useState<StadiumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStadiumData = async () => {
      try {
        setLoading(true);
        setError(null);

        const query = `*[_type == "stadiumInfo"][0] {
          _id,
          title,
          description,
          capacity,
          location,
          timeline[] {
            year,
            title,
            description,
            heroImage,
            expandedContent
          },
          facilities[] {
            name,
            description,
            icon,
            image
          },
          gallery
        }`;

        const stadiumData = await fetchSanityData(query, {}, false);
        
        if (stadiumData) {
          setData(stadiumData);
        } else {
          setError('Stadium information not found');
        }
      } catch (err) {
        console.error('Error fetching stadium data:', err);
        setError('Failed to load stadium information');
      } finally {
        setLoading(false);
      }
    };

    fetchStadiumData();
  }, []);

  return { data, loading, error };
}
