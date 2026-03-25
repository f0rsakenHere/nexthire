import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 bg-background w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-6">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-4 max-w-sm">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <div className="h-3 w-3 rounded-full bg-white/90" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground hover:opacity-90 transition-opacity">
              NextHire
            </span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your AI-powered interview coach and job application tracker. Elevate your career with smart tools and personalized feedback.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
          {/* Product */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Product</h4>
            <Link href="/features" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Features
            </Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Pricing
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Dashboard
            </Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Company</h4>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              About
            </Link>
            <Link href="/faqs" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              FAQs
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Contact
            </Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Twitter
            </Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} NextHire AI. All rights reserved.</p>
        <div className="flex items-center gap-1">
          Made with <Zap className="size-4 text-primary" fill="currentColor" /> by the NextHire Team
        </div>
      </div>
    </footer>
  );
}
