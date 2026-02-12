# FlowState FM - Project Structure

```
flowstate-fm/
├── app/
│   ├── api/
│   │   └── subscribe/
│   │       └── route.ts                 # MailJet email API endpoint
│   ├── after-hours/
│   │   └── page.tsx                     # Redirects to /listen#after-hours
│   ├── flow-state/
│   │   └── page.tsx                     # Flow state science + reading list
│   ├── kit/
│   │   └── page.tsx                     # Email capture + Kit+ upsell
│   ├── listen/
│   │   └── page.tsx                     # YouTube embed + session cards
│   ├── globals.css                       # Tailwind + custom utilities
│   ├── layout.tsx                        # Root layout with Nav/Footer
│   └── page.tsx                          # Homepage (link hub)
│
├── components/
│   ├── Button.tsx                        # 4 variants, hover effects
│   ├── Callout.tsx                       # Info/success/warning boxes
│   ├── Card.tsx                          # Glass morphism cards
│   ├── Container.tsx                     # Responsive container (4 sizes)
│   ├── Footer.tsx                        # 3-column + newsletter embed
│   ├── Nav.tsx                           # Sticky nav + mobile menu
│   ├── ParallaxLayer.tsx                 # CSS parallax wrapper
│   ├── ScrollReveal.tsx                  # Intersection Observer animations
│   ├── ScrollToTop.tsx                   # Floating back-to-top button
│   └── SectionHeader.tsx                 # Large serif headers
│
├── .env.example                          # Template for env variables
├── .env.local                            # Your actual keys (gitignored)
├── .gitignore                            # Ignores node_modules, .env, etc.
├── eslint.config.mjs                     # ESLint configuration
├── next.config.ts                        # Next.js config
├── package.json                          # Dependencies + scripts
├── postcss.config.mjs                    # PostCSS for Tailwind
├── README.md                             # Project documentation
├── tailwind.config.ts                    # Extended theme + brand colors
└── tsconfig.json                         # TypeScript configuration
```

## Component Architecture

### Design System Hierarchy
```
Layout (Root)
├── Nav (Sticky, glass effect)
├── Page Content
│   ├── Container (Responsive wrapper)
│   ├── SectionHeader (Titles + subtitles)
│   ├── Card (Glass morphism)
│   ├── Button (4 variants)
│   ├── Callout (Bordered highlights)
│   └── ScrollReveal (Animation wrapper)
├── Footer (3-column + email)
└── ScrollToTop (Floating button)
```

## Route Structure

| Route | Purpose | Key Features |
|-------|---------|--------------|
| `/` | Link hub homepage | Hero + video background + CTAs |
| `/listen` | Listen page | YouTube embed + session cards (25/60/180) + After Hours |
| `/flow-state` | Educational content | Science of flow + 4 pillars + reading list |
| `/kit` | Lead capture | Email form + MailJet integration + Kit+ upsell |
| `/after-hours` | Alias redirect | Redirects to `/listen#after-hours` |
| `/api/subscribe` | API endpoint | MailJet email sending |

## Design Tokens

### Brand Colors
- **Cyan**: `#76d4d2` - Primary CTA, focus states
- **Pink**: `#ff71a9` - Secondary actions, gradients
- **Yellow**: `#ffc30a` - Accents, gradients
- **Orange**: `#ffa35a` - Warm gradients
- **Rose**: `#fbabd3` - Soft highlights

### Typography
- **Sans**: Inter (UI, body text)
- **Serif**: Lora (headlines, brand moments)

### Effects
- Glass morphism: `backdrop-blur(10px)` + subtle borders
- Glow shadows: `0 0 40px rgba(color, 0.3)`
- Smooth transitions: `cubic-bezier(0.4, 0, 0.2, 1)`
- Hover scales: `1.02` - `1.1`

## Motion System

### Animations
- **fade-in**: 0.6s opacity transition
- **slide-up**: 0.8s translate + opacity
- **scale-in**: 0.5s scale + opacity
- **float**: 6s infinite vertical bob
- **pulse**: 4s infinite opacity

### Scroll Effects
- **ScrollReveal**: Elements fade/slide in on viewport entry
- **Parallax**: CSS transform-based (respects reduced motion)
- **Nav scroll**: Becomes glassy with shadow after 20px

## API Integration

### MailJet Email Service
- **Endpoint**: `POST /api/subscribe`
- **Payload**: `{ email: string }`
- **Response**: Success/error with message
- **Features**: HTML + plain text emails, branded template

## Accessibility Features

✅ Proper ARIA labels on all interactive elements  
✅ Focus rings with high contrast (cyan)  
✅ Keyboard navigation support  
✅ Body scroll lock when mobile menu is open  
✅ Smooth scroll respects `prefers-reduced-motion`  
✅ High contrast text (AAA compliance)  
✅ Semantic HTML structure  

## Performance Optimizations

⚡ Next.js 16 with Turbopack  
⚡ CSS-only animations (no framer-motion)  
⚡ Intersection Observer for scroll reveals  
⚡ Debounced scroll listeners  
⚡ Optimized font loading (swap strategy)  
⚡ Component code splitting  
⚡ Static pages (no SSR overhead)
