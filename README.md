# NextHire - AI-Powered Interview Preparation Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-orange)](https://firebase.google.com/)

NextHire is an AI-powered platform designed to help job seekers prepare for interviews, improve their resumes, and land their dream jobs.

---

## ✨ Features

- 🎯 **AI Resume Scorer** - Get detailed ATS score and formatting feedback
- 🎤 **Mock Interviews** - Practice with role-based interview questions
- 🔊 **Voice Interaction** - Real-time speech-to-text for realistic practice
- 📊 **Progress Analytics** - Track your improvement over time
- 🔍 **Keyword Gap Analysis** - Compare resume against job descriptions
- 💡 **Instant Feedback** - Get better answer suggestions immediately
- 🎓 **Multiple Tech Stacks** - Support for React, Node.js, Django, and more

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Firebase account (free)
- MongoDB Atlas account (free)
- NVIDIA API key (free)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/nexthire.git

# Navigate to project directory
cd nexthire

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your credentials to .env.local
# See docs/ENV_LOCAL_TEMPLATE.md for template

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📚 Documentation

### 🌟 **[Complete Setup Guide](./docs/COMPLETE_SETUP_GUIDE.md)** - START HERE!

Comprehensive guide covering:
- Firebase setup (step-by-step)
- MongoDB Atlas configuration
- Environment variables setup
- Project installation
- Testing and deployment

### 📖 Additional Documentation

| Document | Description | Language |
|----------|-------------|----------|
| [MongoDB Integration](./docs/MONGODB_INTEGRATION_BANGLA.md) | Database structure and API details | 🇧🇩 Bangla |
| [Environment Setup](./docs/ENV_SETUP_GUIDE.md) | Environment variables guide | 🇬🇧 English |
| [ENV Template](./docs/ENV_LOCAL_TEMPLATE.md) | Quick copy-paste template | 🇬🇧 English |
| [Docs Index](./docs/README.md) | Documentation index | 🇧🇩 Bangla + 🇬🇧 English |

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Backend
- **Authentication:** Firebase Auth
- **Database:** MongoDB Atlas
- **API Routes:** Next.js API Routes
- **AI Models:** NVIDIA API, OpenAI

### Deployment
- **Platform:** Vercel
- **CI/CD:** GitHub Actions (coming soon)

---

## 📁 Project Structure

```
nexthire/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main routes (landing, auth)
│   ├── (dashboard)/       # Dashboard routes
│   ├── api/               # API endpoints
│   └── firebase/          # Firebase config
├── components/            # React components
│   ├── home/             # Home page components
│   ├── features/         # Features page components
│   ├── shared/           # Shared components
│   └── ui/               # UI components (shadcn)
├── lib/                  # Utility functions
│   ├── mongodb.ts        # MongoDB connection
│   └── utils.ts          # Helper functions
├── docs/                 # Documentation
│   ├── COMPLETE_SETUP_GUIDE.md
│   ├── MONGODB_INTEGRATION_BANGLA.md
│   ├── ENV_SETUP_GUIDE.md
│   └── ENV_LOCAL_TEMPLATE.md
└── public/               # Static assets
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Authentication
NEXT_PUBLIC_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_PROJECT_ID=your_project_id
NEXT_PUBLIC_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_APP_ID=your_app_id

# MongoDB Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexthire

# AI API Keys
NVIDIA_API_KEY=your_nvidia_api_key
```

**📖 See [ENV_LOCAL_TEMPLATE.md](./docs/ENV_LOCAL_TEMPLATE.md) for complete template**

---

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Manual Testing

1. **Sign Up:** Create account with email/password
2. **Sign In:** Login with email or social auth (Google/GitHub)
3. **MongoDB:** Verify user data saved in database
4. **Features:** Test resume upload and mock interview

---

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

**📖 See [COMPLETE_SETUP_GUIDE.md](./docs/COMPLETE_SETUP_GUIDE.md#১১-ডপলযমনট) for detailed instructions**

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
```bash
# Check your MONGODB_URI in .env.local
# Verify IP whitelist in MongoDB Atlas
# Ensure password is URL encoded
```

**Firebase Auth Error:**
```bash
# Verify all NEXT_PUBLIC_ variables are set
# Check Firebase Console for enabled auth methods
# Restart development server
```

**📖 See [Troubleshooting Guide](./docs/COMPLETE_SETUP_GUIDE.md#১২-টরবলশটং) for more solutions**

---

## 📞 Support

- **Documentation:** [docs/](./docs/)
- **Issues:** [GitHub Issues](https://github.com/your-username/nexthire/issues)
- **Email:** support@nexthire.com

---

## 🌟 Features Roadmap

- [x] User authentication (Email, Google, GitHub)
- [x] MongoDB integration
- [x] Landing page with features
- [ ] Resume upload and analysis
- [ ] Mock interview system
- [ ] AI-powered feedback
- [ ] Progress tracking dashboard
- [ ] Payment integration
- [ ] Mobile app

---

## 👥 Team

- **Development Team:** NextHire Developers
- **Documentation:** Complete guides in Bangla + English
- **Support:** Active community support

---

## 📊 Stats

- **Total Documentation:** 55+ pages
- **Supported Languages:** Bangla + English
- **Setup Time:** ~30 minutes
- **Tech Stack:** 10+ technologies

---

## 🎯 Quick Links

- 📖 [Complete Setup Guide](./docs/COMPLETE_SETUP_GUIDE.md)
- 🗄️ [MongoDB Integration](./docs/MONGODB_INTEGRATION_BANGLA.md)
- ⚙️ [Environment Setup](./docs/ENV_SETUP_GUIDE.md)
- 📋 [ENV Template](./docs/ENV_LOCAL_TEMPLATE.md)
- 📚 [All Documentation](./docs/README.md)

---

## 💡 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Built with ❤️ by NextHire Team**

**Version:** 1.0.0  
**Last Updated:** 2024  
**Status:** Active Development

---

## ⭐ Star this repo if you find it helpful!
