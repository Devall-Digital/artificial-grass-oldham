# 🚀 React + Tailwind Migration Plan

## 📋 Project Understanding

### Current State
- **Static Website**: HTML/CSS/JavaScript website with multiple pages (home.html, about.html, services.html, gallery.html, contact.html)
- **Next.js Starter**: Partial Next.js implementation in `artificial-grass-nextjs/` directory with some React components already created
- **Business Focus**: Artificial grass installation services in Oldham, UK and surrounding areas
- **Key Objectives**: SEO dominance, lead generation, local search optimization

### Migration Goals
1. **Modern Tech Stack**: Migrate from static HTML to React + Next.js with TypeScript
2. **Styling**: Use Tailwind CSS for consistent, maintainable styling
3. **Code Quality**: Implement ESLint and Husky to enforce standards and prevent code drift
4. **Maintainability**: Create a structure that allows multiple agents to work without conflicts
5. **SEO Preservation**: Maintain all existing SEO features and improve where possible

### Key Features to Preserve
- Lead generation forms (quote requests)
- SEO optimization (meta tags, structured data, sitemap)
- Google Analytics integration
- Responsive design (mobile-first)
- Performance optimization
- Local business schema markup
- Multi-page structure (Home, About, Services, Gallery, Contact)

## 🎯 Migration Strategy

### Phase 1: Foundation Setup (Tasks 1-3)
**Goal**: Establish the development environment and code quality tools

1. **Project Foundation**
   - Clean up and consolidate the Next.js project structure
   - Ensure TypeScript is properly configured
   - Set up Tailwind CSS with custom configuration matching existing design
   - Create proper folder structure for components, pages, utils, hooks

2. **Code Quality Tools**
   - Configure ESLint with strict rules for React, TypeScript, and Next.js
   - Set up Prettier for code formatting
   - Install and configure Husky for Git hooks
   - Create pre-commit hook that runs linting and type checking
   - Add scripts to package.json for linting, formatting, and type checking

### Phase 2: Design System Migration (Task 4)
**Goal**: Establish consistent styling foundation

- Extract color palette from existing CSS
- Map typography system to Tailwind
- Create spacing and sizing utilities
- Set up CSS custom properties for design tokens
- Document design system in Tailwind config

### Phase 3: Component Migration (Tasks 5-8)
**Goal**: Convert static HTML to React components

1. **Layout Components**
   - Header with navigation and mobile menu
   - Footer with contact info and links
   - Quote modal component

2. **Home Page Components** (Already partially done, needs completion)
   - Hero section with CTA form
   - Services grid
   - Benefits section
   - Areas served
   - Testimonials carousel
   - FAQ accordion
   - CTA section

3. **Other Pages**
   - About page
   - Services page (detailed)
   - Gallery page
   - Contact page

4. **Forms**
   - Quote request form with validation
   - Contact form
   - Form submission handling
   - Success/error states

### Phase 4: Functionality & Integration (Tasks 9-12)
**Goal**: Implement backend functionality and integrations

1. **API Routes**
   - Lead processing endpoint
   - Form submission handler
   - Data validation

2. **Animations**
   - Convert CSS animations to Tailwind/React
   - Implement scroll animations
   - Add micro-interactions

3. **SEO Setup**
   - Next.js metadata configuration
   - Structured data (JSON-LD)
   - Sitemap generation
   - Robots.txt

4. **Analytics**
   - Google Analytics integration
   - Event tracking setup
   - Conversion tracking

### Phase 5: Optimization & Testing (Tasks 13-14)
**Goal**: Ensure performance and reliability

1. **Performance**
   - Image optimization
   - Code splitting
   - Lazy loading
   - Core Web Vitals optimization

2. **Testing**
   - Unit tests for components
   - Form validation tests
   - Integration tests for critical flows

### Phase 6: Documentation & Deployment (Tasks 15-16)
**Goal**: Enable smooth deployment and maintenance

1. **Documentation**
   - Updated README
   - Component documentation
   - Setup instructions
   - Migration notes

2. **Deployment**
   - Build configuration
   - Environment variables setup
   - Deployment instructions

## 📝 Detailed Todo List

### ✅ Task 1: Set up Project Foundation
- [ ] Clean up `artificial-grass-nextjs` directory structure
- [ ] Verify TypeScript configuration (`tsconfig.json`)
- [ ] Configure Tailwind CSS with custom theme
- [ ] Set up proper folder structure:
  ```
  artificial-grass-nextjs/
  ├── app/              # Next.js app directory
  ├── components/       # React components
  ├── lib/             # Utilities and helpers
  ├── hooks/           # Custom React hooks
  ├── types/           # TypeScript types
  └── public/          # Static assets
  ```

### ✅ Task 2: Configure Code Quality Tools
- [ ] Install ESLint dependencies
- [ ] Create `.eslintrc.json` with strict rules
- [ ] Install Prettier and create `.prettierrc`
- [ ] Install Husky: `npm install --save-dev husky`
- [ ] Initialize Husky: `npx husky install`
- [ ] Create `.husky/pre-commit` hook
- [ ] Add lint-staged for staged file checking
- [ ] Update `package.json` scripts

### ✅ Task 3: Create Configuration Files
- [ ] `.eslintrc.json` - ESLint configuration
- [ ] `.prettierrc` - Prettier configuration
- [ ] `.prettierignore` - Files to ignore
- [ ] `.husky/pre-commit` - Pre-commit hook script
- [ ] Update `package.json` with scripts:
  - `lint`: Run ESLint
  - `lint:fix`: Auto-fix ESLint issues
  - `format`: Format with Prettier
  - `type-check`: Run TypeScript compiler check

### ✅ Task 4: Migrate Design System
- [ ] Extract colors from existing CSS to `tailwind.config.ts`
- [ ] Map typography (Inter font) to Tailwind
- [ ] Create spacing scale
- [ ] Set up CSS custom properties in `globals.css`
- [ ] Document design tokens

### ✅ Task 5: Migrate Layout Components
- [ ] Convert Header component (check existing `Header.tsx`)
- [ ] Convert Footer component (check existing `Footer.tsx`)
- [ ] Ensure mobile menu functionality
- [ ] Add proper TypeScript types
- [ ] Style with Tailwind classes

### ✅ Task 6: Migrate Home Page
- [ ] Review existing home components in `components/home/`
- [ ] Complete any missing components
- [ ] Ensure all sections match original HTML structure
- [ ] Add proper TypeScript types
- [ ] Style with Tailwind
- [ ] Test responsive design

### ✅ Task 7: Migrate Other Pages
- [ ] Create `app/about/page.tsx`
- [ ] Create `app/services/page.tsx`
- [ ] Create `app/gallery/page.tsx`
- [ ] Create `app/contact/page.tsx`
- [ ] Ensure SEO metadata for each page
- [ ] Style with Tailwind

### ✅ Task 8: Migrate Forms
- [ ] Review existing `QuoteModal.tsx`
- [ ] Create form validation utilities
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Connect to API routes
- [ ] Add success/error feedback

### ✅ Task 9: Set up API Routes
- [ ] Create `app/api/leads/route.ts` (check if exists)
- [ ] Implement form data validation
- [ ] Add error handling
- [ ] Set up response formatting
- [ ] Add rate limiting (if needed)

### ✅ Task 10: Migrate Animations
- [ ] Review existing animation CSS
- [ ] Convert to Tailwind utilities where possible
- [ ] Use Framer Motion or CSS transitions for complex animations
- [ ] Implement scroll-triggered animations
- [ ] Ensure performance

### ✅ Task 11: Set up SEO
- [ ] Configure metadata in `app/layout.tsx`
- [ ] Add page-specific metadata
- [ ] Implement structured data (JSON-LD)
- [ ] Create `app/sitemap.ts` for dynamic sitemap
- [ ] Create `app/robots.ts` for robots.txt
- [ ] Verify Open Graph tags

### ✅ Task 12: Set up Analytics
- [ ] Review existing `GoogleAnalytics.tsx`
- [ ] Configure Google Analytics 4
- [ ] Set up event tracking:
  - Form submissions
  - Button clicks
  - Phone number clicks
  - Email clicks
- [ ] Test tracking implementation

### ✅ Task 13: Optimize Performance
- [ ] Optimize images (use Next.js Image component)
- [ ] Implement code splitting
- [ ] Add lazy loading for components
- [ ] Minimize bundle size
- [ ] Test Core Web Vitals:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

### ✅ Task 14: Set up Testing
- [ ] Install Jest and React Testing Library
- [ ] Configure Jest for Next.js
- [ ] Write tests for:
  - Form validation
  - Component rendering
  - API routes
- [ ] Add test scripts to package.json

### ✅ Task 15: Create Documentation
- [ ] Update main README.md
- [ ] Document component structure
- [ ] Add setup instructions
- [ ] Document environment variables
- [ ] Create component usage examples

### ✅ Task 16: Set up Deployment
- [ ] Configure build process
- [ ] Create `.env.example` file
- [ ] Document deployment process
- [ ] Set up environment variable requirements
- [ ] Note: Webhook deployment will need to be reconfigured for Next.js build process

## 🔧 Technical Decisions

### ESLint Configuration
- Use `eslint-config-next` as base
- Add strict TypeScript rules
- Enforce React best practices
- Disallow `any` types
- Require explicit return types for functions

### Husky Pre-commit Hook
- Run ESLint on staged files
- Run TypeScript type checking
- Run Prettier formatting
- Prevent commit if checks fail

### Tailwind Configuration
- Match existing color scheme
- Use Inter font family
- Create custom utilities for animations
- Set up responsive breakpoints

### Component Structure
- Use functional components with TypeScript
- Implement proper prop types
- Use custom hooks for reusable logic
- Follow Next.js 13+ App Router conventions

## 📊 Success Criteria

- [ ] All static HTML pages converted to Next.js pages
- [ ] All forms functional with proper validation
- [ ] SEO metadata preserved and enhanced
- [ ] Performance scores meet targets (90+ Lighthouse)
- [ ] ESLint passes with no errors
- [ ] TypeScript compiles without errors
- [ ] All tests passing
- [ ] Responsive design works on all devices
- [ ] Analytics tracking functional

## 🚨 Important Notes

1. **Webhook Deployment**: The existing `webhook-deploy.php` setup for automatic GitHub → 20i server deployment will need to be reconfigured for Next.js. Next.js requires a build step, so the deployment process will change from simple file copy to build + deploy.

2. **Static vs Dynamic**: Consider whether to use static generation (SSG) or server-side rendering (SSR) for each page based on content needs.

3. **Backward Compatibility**: Ensure all existing URLs are preserved or properly redirected.

4. **Environment Variables**: Document all required environment variables for the new setup.

## 📚 Resources

- Next.js Documentation: https://nextjs.org/docs
- Tailwind CSS Documentation: https://tailwindcss.com/docs
- ESLint Configuration: https://eslint.org/docs/user-guide/configuring
- Husky Documentation: https://typicode.github.io/husky/

---

**Last Updated**: December 2024  
**Status**: Planning Phase  
**Next Steps**: Begin with Task 1 - Project Foundation Setup
