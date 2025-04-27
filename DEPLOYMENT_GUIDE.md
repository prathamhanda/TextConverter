# Deployment Guide for TextConverter

This guide will help you deploy the TextConverter application (both frontend and backend) for free using popular hosting services.

## Backend Deployment (Render)

1. **Sign up for Render** at [render.com](https://render.com)

2. **Create a new Web Service**:
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository (you'll need to sign in with GitHub)
   - Select the "TextConverter" repository

3. **Configure the service**:
   - Name: `text-converter-api` (or any name you prefer)
   - Root Directory: `server` (important: specify the server subdirectory)
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free

4. **Add environment variables**:
   - Go to "Environment" tab and add all the variables from your `.env.example` file:
     - `PORT`: 10000 (Render assigns its own port)
     - `NODE_ENV`: production 
     - `JWT_SECRET`: <your_secret_key>
     - `EMAIL_USER`: <your_email@gmail.com>
     - `EMAIL_PASS`: <your_email_app_password>
     - `UPI_ID`: <your_upi_id@provider>
     - `CLIENT_URL`: <your_frontend_url> (leave blank for now until frontend is deployed)

5. **Deploy the service**:
   - Click "Create Web Service"
   - Wait for deployment to complete (takes a few minutes)
   - Note the URL assigned to your service (e.g., `https://text-converter-api.onrender.com`)

## Frontend Deployment (Netlify)

1. **Sign up for Netlify** at [netlify.com](https://netlify.com)

2. **Deploy your site**:
   - Click "Add new site" → "Import an existing project"
   - Connect to your GitHub account
   - Select the "TextConverter" repository

3. **Configure build settings**:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `dist` (this is where Vite outputs built files)

4. **Add environment variables**:
   - Go to "Site settings" → "Environment variables"
   - Add `VITE_API_URL` with the value of your backend URL (from Render)

5. **Deploy the site**:
   - Click "Deploy site"
   - Wait for the build and deployment to complete
   - Note the URL assigned to your site (e.g., `https://text-converter-app.netlify.app`)

## Connecting Frontend and Backend

1. **Update the backend environment variables**:
   - Go back to Render dashboard
   - Update the `CLIENT_URL` environment variable with your Netlify URL
   - Trigger a manual redeploy for the changes to take effect

2. **Test the application**:
   - Visit your frontend URL and try a full conversion flow
   - Check that emails are sent properly
   - Verify that payments work correctly

## Additional Free Hosting Options

### Backend Alternatives
- **Railway**: Offers simple deployment and a generous free tier
- **Fly.io**: Good free tier with global deployment options
- **Cyclic.sh**: Easy deployment from GitHub

### Frontend Alternatives
- **Vercel**: Great for React apps with an excellent free tier
- **GitHub Pages**: Free but requires some configuration for SPAs
- **Surge.sh**: Simple CLI-based deployment

## Domain Setup (Optional)

If you have a custom domain:

1. **Add your domain in Netlify**:
   - Site settings → Domain management → Add custom domain
   - Follow the DNS configuration instructions

2. **Update environment variables**:
   - Update `CLIENT_URL` in your backend service to use your custom domain
   - Update any hardcoded URLs in your frontend code

## Monitoring and Maintenance

- Set up GitHub Actions for continuous deployment
- Check Render and Netlify dashboards for usage metrics
- Keep dependencies updated using `npm outdated` and `npm update`

Remember that free tiers have limitations on bandwidth, build minutes, and sometimes require services to "sleep" after periods of inactivity. For production use with high traffic, you might need to upgrade to paid plans. 