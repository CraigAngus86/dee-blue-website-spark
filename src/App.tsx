
'use client';

import { useEffect } from 'react';
import { configureImageService } from '@/lib/config/imageConfig';

function App() {
  useEffect(() => {
    configureImageService();
  }, []);

  return null;
}

export default App;
