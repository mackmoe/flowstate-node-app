# 🚀 Run Instructions - FlowState FM

## Prerequisites

- **Node.js**: 18.0 or higher
- **npm**: 9.0 or higher (comes with Node.js)
- **OS**: Linux, macOS, or Windows

## Initial Setup

### 1. Install Dependencies

```bash
cd /home/monash/Git/demo-sites/flowstate-fm
npm install
```

**Expected output**: ~345 packages installed in ~30-60 seconds

### 2. Configure Environment Variables

Your `.env.local` file is already configured with:
- ✅ MailJet API credentials
- ⚠️ YouTube URL (needs to be added)

**To add YouTube URL:**

```bash
# Open .env.local
nano .env.local

# Add your YouTube embed URL:
NEXT_PUBLIC_YOUTUBE_LIVE_URL=https://www.youtube.com/embed/YOUR_VIDEO_ID
```

**How to get YouTube embed URL:**
1. Go to your YouTube video or live stream
2. Click "Share" → "Embed"
3. Copy the `src` URL from the iframe code
4. Paste it into `.env.local`

### 3. Start Development Server

```bash
npm run dev
```

**Output:**
```
▲ Next.js 16.1.6 (Turbopack)
- Local:   http://localhost:3001
- Network: http://192.168.50.234:3001

✓ Ready in 660ms
```

### 4. Open in Browser

Navigate to: **[http://localhost:3001](http://localhost:3001)**

**What you should see:**
- Homepage with animated gradient orbs
- Hero text "FlowState FM"
- Primary CTA "Listen Now"
- Sticky navigation at top

## Testing the Site

### Test Navigation
1. Click "Listen Now" → Should go to `/listen`
2. Click "Get Free Kit" → Should go to `/kit`
3. Test mobile menu (resize browser to <768px)
4. Test "After Hours" link → Should anchor to `/listen#after-hours`

### Test Email Capture
1. Go to [http://localhost:3001/kit](http://localhost:3001/kit)
2. Enter a valid email address
3. Click "Get Free Kit"
4. Check your inbox for the branded email

**Expected email subject**: "Your Free Focus Kit is Here!"

### Test Scroll Animations
1. On any page, scroll down slowly
2. Cards and sections should fade in as they enter viewport
3. Nav bar should become glassy after ~20px scroll
4. Scroll to bottom → "Back to top" button appears

### Test Accessibility
1. Press `Tab` key → Should see cyan focus rings
2. Navigate with keyboard only
3. Open DevTools → Lighthouse → Run accessibility audit
4. Should score 90+ on accessibility

## Production Build

### Build for Production

```bash
npm run build
```

**Expected output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (6/6)
✓ Finalizing page optimization

Route (app)                              Size
┌ ○ /                                    5.2 kB
├ ○ /after-hours                         137 B
├ ○ /flow-state                          2.1 kB
├ ○ /kit                                 1.8 kB
└ ○ /listen                              2.3 kB
```

### Start Production Server

```bash
npm start
```

Production server runs on: **[http://localhost:3001](http://localhost:3001)**

## Troubleshooting

### Port 3001 is Already in Use

```bash
# Find and kill the process
lsof -ti:3001 | xargs kill -9

# Or change the port
npm run dev -- -p 3002
```

### MailJet Emails Not Sending

1. Check credentials in `.env.local`
2. Verify API keys are active on [MailJet dashboard](https://app.mailjet.com)
3. Check console logs for error messages
4. Test with your own email first

**Common issues:**
- From email must match verified sender
- API keys copy-pasted with extra spaces
- Rate limiting (test with 1-2 emails first)

### YouTube Embed Not Showing

1. Verify `NEXT_PUBLIC_YOUTUBE_LIVE_URL` is set in `.env.local`
2. Must start with `https://www.youtube.com/embed/`
3. Restart dev server after adding env variable
4. Check browser console for CORS errors

**Valid format:**
```
NEXT_PUBLIC_YOUTUBE_LIVE_URL=https://www.youtube.com/embed/dQw4w9WgXcQ
```

### TypeScript Errors

```bash
# Regenerate types
rm -rf .next
npm run dev
```

### Styles Not Updating

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## Terminal Commands Quick Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Browser Support

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+  
⚠️ IE 11 (not supported)

## Development Tips

### Hot Reload
- Changes to `.tsx` files reload instantly
- Changes to `.env.local` require server restart
- CSS changes apply without refresh

### Console Logs
- Open DevTools (F12)
- Check Console tab for errors
- Network tab to inspect API calls

### Component Development
1. Edit component in `components/`
2. Changes reflect instantly
3. Check multiple breakpoints (mobile/tablet/desktop)

### Adding New Pages
1. Create `app/new-page/page.tsx`
2. Add metadata export
3. Update Nav component to include link
4. Test routing and metadata

## Next Steps After Setup

1. ✅ Verify all pages load correctly
2. ✅ Test email delivery
3. 🔴 Add YouTube live stream URL
4. 🔴 Create OpenGraph images (1200x630)
5. 🔴 Run Lighthouse audit
6. 🔴 Add Google Analytics
7. 🟡 Deploy to production

## Production Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in dashboard
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

### Environment Variables for Production

Add these to your hosting platform:
```
MAILJET_API_KEY=your_api_key
MAILJET_SECRET_KEY=your_secret_key
NEXT_PUBLIC_YOUTUBE_LIVE_URL=your_youtube_url
NODE_ENV=production
```

## Support

- **Documentation**: See [README.md](README.md)
- **Architecture**: See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- **Roadmap**: See [NEXT_STEPS.md](NEXT_STEPS.md)

---

**Ready to launch?** Start with `npm run dev` and test everything works! 🚀
