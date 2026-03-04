import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group relative w-full bg-card border border-border hover:border-primary/30 rounded-2xl p-6 transition-all duration-500 overflow-hidden hover:shadow-[0_0_25px_oklch(0.62_0.26_278/0.12)] shadow-sm">
      {/* Subtle Gradient Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Avatar with subtle ring */}
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full border border-border group-hover:border-primary/40 transition-colors duration-500" />
          <div className="absolute inset-1 rounded-full overflow-hidden bg-muted">
            <Image
              src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${member.name}`}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Info */}
        <h3 className="text-lg font-medium text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium mb-6">
          {member.role}
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {[Linkedin, Twitter, Github].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="text-muted-foreground/40 hover:text-primary transition-colors duration-300 transform hover:-translate-y-1"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
