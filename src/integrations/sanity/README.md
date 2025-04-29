
# Sanity CMS Integration for Banks o' Dee FC

## Setup Instructions

### Step 1: Install Sanity CLI
```bash
npm install -g @sanity/cli
```

### Step 2: Initialize Sanity Studio
Run the following command to initialize your Sanity Studio project with your existing project ID:
```bash
npm create sanity@latest -- --project gxtptap2 --dataset production --template clean
```

Follow the prompts to complete the setup. This will create a new Sanity Studio project in a directory of your choosing.

### Step 3: Configure GitHub Authentication

If you're experiencing a 404 error when trying to authenticate with GitHub, try the following steps:

1. Make sure you're logged into GitHub in your browser
2. Check that your GitHub account has access to the Sanity project
3. Check the Sanity project's OAuth settings:
   - Go to https://www.sanity.io/manage/project/gxtptap2
   - Navigate to the API section
   - Verify that GitHub is configured as an authentication provider
   - Make sure the callback URL is correctly set up

4. Clear browser cache and cookies related to sanity.io and github.com
5. Try using a different browser or incognito mode

### Step 4: Set Up Your Schema

Inside your Sanity Studio project, navigate to the `schemas` directory and create the necessary schema files based on the reference schemas provided in `src/integrations/sanity/schema-reference.ts`.

1. Create a `news.js` file for your news schema
2. Create a `blockContent.js` file for rich text content
3. Create a `teamMember.js` file for team member data
4. Update your `schema.js` to include these schemas

### Step 5: Launch Sanity Studio
```bash
cd your-sanity-studio-directory
npm run dev
```

This will start your Sanity Studio at http://localhost:3333

### Step 6: Configure CORS Settings

1. Go to https://www.sanity.io/manage/project/gxtptap2
2. Navigate to the API tab
3. Under CORS Origins, add:
   - Your development URL (e.g., http://localhost:8080)
   - Your production URL if applicable
4. Check "Allow credentials" for both origins

### Step 7: Create Content

Use your Sanity Studio to create and manage content for your website. The content will be automatically available through the hooks we've created:
- `useSanityNews()` - for news content
- `useSanityTeamData()` - for team member data

## Troubleshooting

If you continue to experience issues with GitHub authentication:

1. Try using email/password authentication instead
2. Contact Sanity support at help@sanity.io
3. Check the Sanity community forums at https://www.sanity.io/exchange/community

For any issues with the integration code, review the console logs for error messages.
