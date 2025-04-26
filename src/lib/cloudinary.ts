
import { Cloudinary } from '@cloudinary/url-gen';

export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'dlkpaw2a0'
  },
  url: {
    secure: true
  }
});
