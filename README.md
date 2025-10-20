# LMS Course Platform

> A modern Learning Management System (LMS) built with Next.js 15, React 19, and a powerful tech stack for creating and managing online courses.

![Application Screenshot](/preview/nextlearn-lms-course-platform.png "Application Screenshot")

## 🚀 Features

- **Modern Stack**: Built with Next.js 15 and React 19
- **Authentication**: Secure auth system with better-auth
- **Course Management**: Create and manage online courses
- **Rich Text Editor**: Advanced content editing with Tiptap
- **Drag and Drop**: Intuitive course content organization with dnd-kit
- **File Upload**: S3 integration for course materials
- **Payment Processing**: Stripe integration for course purchases
- **Email Notifications**: Automated emails with Resend
- **Modern UI**: Built with Radix UI components and TailwindCSS
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark Mode**: Built-in theme support via next-themes
- **Charts & Analytics**: Course analytics with Recharts
- **Form Handling**: Robust forms with react-hook-form and zod validation

## 🛠️ Tech Stack

- **Framework**: Next.js 15, React 19
- **Styling**: TailwindCSS, CVA, tailwind-merge
- **UI Components**: Radix UI, Lucide Icons
- **Database**: Prisma ORM
- **Authentication**: better-auth
- **Forms**: react-hook-form, zod
- **File Upload**: AWS S3, react-dropzone
- **Rich Text**: Tiptap
- **Payments**: Stripe
- **Email**: Resend
- **Security**: Arcjet
- **Analytics**: Recharts
- **Development**: TypeScript, ESLint, Prettier

## 📂 Project Structure

```
app/                # Next.js app directory
├── (auth)/        # Authentication routes
├── (public)/      # Public routes
├── admin/         # Admin panel
├── api/           # API routes
├── dashboard/     # User dashboard
└── payment/       # Payment routes
components/        # Reusable components
├── file-uploader/ # File upload components
├── general/       # General components
├── rich-text-editor/ # Rich text editor
├── sidebar/       # Navigation components
└── ui/           # UI components library
hooks/            # Custom React hooks
lib/              # Utility functions
prisma/           # Database schema and migrations
public/           # Static assets
```

## ⚡ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/KayqueGoldner/nextlearn-lms-course-platform-nextjs.git
   cd nextlearn-lms-course-platform-nextjs
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file with your configuration (see `.env.example` for required variables)

4. **Set up the database**
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🔐 Environment Variables

Create a `.env` file in the root with the following:

```env
# better-auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# database
DATABASE_URL=

# github
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# resend
RESEND_API_KEY=

# arcjet
ARCJET_KEY=

# tigris
NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_ENDPOINT_URL_S3=
AWS_ENDPOINT_URL_IAM=
AWS_REGION=

# stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
