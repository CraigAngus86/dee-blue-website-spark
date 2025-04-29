markdown# Sanity Configuration for Banks o' Dee FC

This directory contains the configuration files for connecting to the Sanity CMS project for Banks o' Dee FC.

## How to Use

1. Install Sanity packages in your main project:
npm install @sanity/client @sanity/image-url

2. Copy the client.js file to your project's lib directory

3. Import and use the client in your components:
```javascript
import { sanityClient } from '../lib/client';

// Example query
const fetchNews = async () => {
  return await sanityClient.fetch(`*[_type == "newsArticle"]`);
}
Accessing Sanity Studio
To access the Sanity Studio directly:

Go to: https://gxtptap2.sanity.studio/
Log in with your Sanity credentials

Implementation Instructions
To implement the full schema for your content types, follow the detailed instructions provided by Claude for setting up:

News Articles
Player Profiles
Sponsors
Commercial Packages
Match Galleries
Stadium Information

After setting up your Sanity Studio, you can start creating content that will be accessible through the client API.
