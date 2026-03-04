import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 bg-background w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
            <div className="h-3 w-3 rounded-full bg-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">
            NextHire
          </span>
        </div>
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} NextHire AI. All rights reserved.
        </p>
        <div className="flex gap-6 text-muted-foreground">
          <Link href="#" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Twitter
          </Link>
        </div>
      </div>
    </footer>
  );
}
