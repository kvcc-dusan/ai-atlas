# 🌍 AI Atlas

An internal knowledge base, dashboard, and playbook for AI tools, workflows, and best practices. AI Atlas serves as a centralized hub for managing and utilizing various AI capabilities.

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Backend/Database**: [Supabase](https://supabase.com/)
- **PWA Capabilities**: Vite PWA Plugin
- **Code Quality**: ESLint

## 📦 Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js**: v18 or higher recommended.
- **Package Manager**: npm or yarn.

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kvcc-dusan/ai-atlas.git
   cd ai-atlas
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your Supabase credentials. A template example:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The application will typically spin up at `http://localhost:5173/`.*

## 📜 Available Scripts

- `npm run dev`: Starts the local development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles and bundles the application into static files for production deployment.
- `npm run lint`: Runs ESLint over the codebase to enforce code style and catch potential issues.
- `npm run preview`: Bootstraps a local web server to locally preview the production build.

## 📂 Project Structure Overview

```text
ai-atlas/
├── src/
│   ├── admin/       # Administrator console and editing forms
│   ├── assets/      # Static images, icons, and SVGs
│   ├── components/  # Reusable UI fragments (Header, Details, Banners)
│   ├── hooks/       # Custom React hooks (e.g., useTheme for light/dark mode)
│   ├── lib/         # Utility libraries, helpers, and Supabase client config
│   ├── App.jsx      # Main application router and shell layout
│   └── main.jsx     # Application entry point
├── public/          # Public static assets (favicons, manifests)
├── supabase/        # Supabase configurations and/or database migrations
├── index.html       # Vite HTML template
└── package.json     # Project metadata, dependencies, and NPM scripts
```

## 🤝 Contributing

When contributing to this repository, please ensure that you run `npm run lint` to verify that your code adheres to standard conventions before submitting a pull request.
