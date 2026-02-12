# FlowState FM

> Your sophisticated sound sanctuary for deep work and creative flow.

## 🎯 Project Overview

FlowState FM is a minimalist, cinematic landing page designed to help people achieve deep focus and flow states through curated soundscapes. Built with Next.js 16, TypeScript, and Tailwind CSS.

**Design Philosophy**: Sophisticated, intellectual, modern futuristic — evokes wealth, wisdom, minimalist refinement. No people, no faces, no clutter. Subtle animated atmosphere with clear conversion paths.

## ✨ Features

### Pages
- **Homepage** (`/`) - Link hub with video background and animated CTAs
- **Listen** (`/listen`) - YouTube live stream + session cards (25/60/180 min)
- **Flow State** (`/flow-state`) - Science-backed content + reading list
- **Free Kit** (`/kit`) - Email capture with MailJet integration
- **After Hours** (`/after-hours`) - Alias that anchors to `/listen#after-hours`

### Design System
- **9 Reusable Components**: Button, Card, Container, Callout, Nav, Footer, SectionHeader, ScrollReveal, ScrollToTop
- **Brand Colors**: Cyan, Pink, Yellow, Orange, Rose
- **Typography**: Inter (sans) + Lora (serif)
- **Effects**: Glass morphism, glows, gradients, smooth animations
- **Accessibility**: AAA contrast, focus rings, keyboard nav, reduced motion support

### UX Enhancements
- ✅ Scroll-triggered reveal animations
- ✅ Mobile menu with full-screen overlay
- ✅ Smooth anchor navigation
- ✅ Floating "back to top" button
- ✅ Nav transforms on scroll
- ✅ Responsive layouts (mobile → desktop)

### Integrations
- **MailJet API**: Email capture + branded welcome emails
- **YouTube Embed**: Live stream player (configurable)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Configuration

1. Copy environment variables:
```bash
cp .env.example .env.local
```

2. Add your YouTube live stream URL to `.env.local`:
```env
NEXT_PUBLIC_YOUTUBE_LIVE_URL=https://www.youtube.com/embed/YOUR_VIDEO_ID
```

3. MailJet credentials are already configured in `.env.local` (stored securely, gitignored)

### Development

```bash
# Start dev server on port 3001
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed file tree and architecture.

```
app/
├── api/subscribe/          # MailJet email endpoint
├── after-hours/            # Redirect alias
├── flow-state/             # Educational content
├── kit/                    # Email capture
├── listen/                 # YouTube embed + sessions
└── page.tsx                # Homepage

components/
├── Button.tsx              # 4 variants
├── Card.tsx                # Glass morphism
├── Nav.tsx                 # Sticky nav + mobile menu
├── Footer.tsx              # 3-column layout
└── ... (9 total)
```

## 🎨 Brand Colors

| Color  | Hex       | RGB           | Usage                  |
|--------|-----------|---------------|------------------------|
| Cyan   | `#76d4d2` | 118, 212, 210 | Primary CTA, focus     |
| Pink   | `#ff71a9` | 255, 113, 169 | Secondary, gradients   |
| Yellow | `#ffc30a` | 255, 195, 10  | Accents, highlights    |
| Orange | `#ffa35a` | 255, 163, 90  | Warm gradients         |
| Rose   | `#fbabd3` | 251, 171, 211 | Soft highlights        |

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Fonts**: Google Fonts (Inter, Lora)
- **Email**: MailJet API v3.1
- **Deployment**: Node.js runtime (port 3001)

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MAILJET_API_KEY` | MailJet API key | Yes |
| `MAILJET_SECRET_KEY` | MailJet secret key | Yes |
| `NEXT_PUBLIC_YOUTUBE_LIVE_URL` | YouTube embed URL | No |

## 📊 Performance

- **Lighthouse Scores**: Aim for 90+ (run audit after YouTube URL added)
- **Animations**: CSS-only (no framer-motion)
- **Scroll**: Intersection Observer (efficient)
- **Fonts**: Optimized with `swap` strategy

## ♿ Accessibility

- Semantic HTML5
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus rings (high contrast cyan)
- Smooth scroll respects `prefers-reduced-motion`
- Color contrast: AAA compliance

## 🧪 Testing the Email Flow

1. Navigate to [http://localhost:3001/kit](http://localhost:3001/kit)
2. Enter your email address
3. Click "Get Free Kit"
4. Check your inbox for the branded welcome email

## 📝 Next Steps

See [NEXT_STEPS.md](NEXT_STEPS.md) for the complete roadmap:

**Priority Tasks:**
1. ✅ MVP Complete
2. 🔴 Add YouTube live stream URL
3. 🔴 Create OpenGraph images
4. 🔴 Test email delivery
5. 🔴 Add Google Analytics

## 🤝 Development Workflow

### Adding a New Page
1. Create `app/your-page/page.tsx`
2. Add metadata export
3. Use design system components
4. Add route to Nav component
5. Test mobile responsiveness

### Creating a New Component
1. Create `components/YourComponent.tsx`
2. Follow existing patterns (props interface, TypeScript)
3. Use Tailwind utilities
4. Add hover states and transitions
5. Ensure accessibility

## 📄 License

Private project. All rights reserved.

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [MailJet](https://mailjet.com)
- [Google Fonts](https://fonts.google.com)

---

**Built by**: Dev + Design collaboration  
**Stack**: Next.js + TypeScript + Tailwind  
**Philosophy**: One glance. One click. Start focusing.
