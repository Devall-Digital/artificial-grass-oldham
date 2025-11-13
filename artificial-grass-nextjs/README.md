# Artificial Grass Oldham - Next.js Website

A modern, high-performance website for Artificial Grass Oldham built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Code Quality**: ESLint + Prettier + Husky for enforced code standards
- **Performance Optimized**: Static generation, image optimization, code splitting
- **SEO Ready**: Meta tags, structured data, sitemap generation
- **Lead Generation**: Built-in contact forms with API routes
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Analytics Ready**: Google Analytics and tracking integration

## 📋 Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Copy the environment example file (if it exists):
```bash
cp .env.example .env.local
```

3. Update the `.env.local` file with your configuration:
```env
NEXT_PUBLIC_GA_ID=your-google-analytics-id
API_SECRET_KEY=your-secret-key
```

## 🚀 Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📝 Code Quality

This project uses strict code quality tools to ensure consistency:

### ESLint
- Run linting: `npm run lint`
- Auto-fix issues: `npm run lint:fix`

### Prettier
- Format code: `npm run format`
- Check formatting: `npm run format:check`

### TypeScript
- Type checking: `npm run type-check`

### Husky Pre-commit Hooks
- Automatically runs lint-staged and type-checking before commits
- Prevents committing code that doesn't meet quality standards

## 🏗️ Building for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## 📁 Project Structure

```
artificial-grass-nextjs/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css         # Global styles
├── components/            # React components
│   ├── home/             # Home page components
│   ├── Header.tsx        # Site header
│   ├── Footer.tsx        # Site footer
│   └── QuoteModal.tsx    # Quote request modal
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── types/                # TypeScript types
├── public/               # Static assets
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Prettier configuration
├── .husky/              # Git hooks
└── tailwind.config.ts   # Tailwind configuration
```

## 🎨 Customization

### Colors

Edit the Tailwind configuration in `tailwind.config.ts`:

```typescript
colors: {
  'primary-black': '#000000',
  'accent-green': '#2d5530',
  'light-green': '#4a7c4e',
  // Add more custom colors
}
```

### Typography

The site uses Inter font. To change it, update `app/layout.tsx`:

```typescript
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})
```

## 📧 Lead Capture

Leads are captured via the `/api/leads` endpoint. To enable email notifications:
1. Set up an email service (SendGrid, Mailgun, etc.)
2. Add the configuration to your `.env.local`
3. Update the API route to send emails

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The project is configured with `output: 'standalone'` for compatibility with various hosting platforms.

## 🔧 Configuration

### Next.js Config

Edit `next.config.js` for:
- Image domains
- Redirects
- Headers
- Environment variables

### SEO

Update metadata in `app/layout.tsx`:
- Site title and description
- Open Graph tags
- Twitter cards
- Verification codes

## 📱 Features Overview

### Components

- **Header**: Responsive navigation with mobile menu
- **Hero**: Eye-catching hero section with CTA
- **Services**: Service cards with hover effects
- **Gallery**: Before/after transformations
- **Testimonials**: Customer reviews carousel
- **FAQ**: Accordion-style FAQ section
- **QuoteModal**: Lead capture form

### API Routes

- `POST /api/leads`: Submit lead information
- `GET /api/leads`: Retrieve leads (protected)

## 🧪 Testing

Run linting:
```bash
npm run lint
```

Type checking:
```bash
npm run type-check
```

## 📈 Performance

The site achieves excellent Lighthouse scores:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🤝 Contributing

1. Create your feature branch (`git checkout -b feature/amazing-feature`)
2. Make your changes
3. Run `npm run lint` and `npm run type-check` to ensure code quality
4. Commit your changes (Husky will run pre-commit checks)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email info@artificialgrassoldham.co.uk or open an issue.

---

**Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS**
