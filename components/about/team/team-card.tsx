import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TeamMember } from "@/components/types.ts";

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="border rounded-2xl p-6 text-center hover:shadow-lg transition">
      <Avatar className="mx-auto  mb-4">
        <AvatarFallback>{member.name[0]}</AvatarFallback>
      </Avatar>

      <h3 className="font-semibold hover:text-cyan-300 text-xl">
        {member.name}
      </h3>
      <p className="text-sm text-muted-foreground">{member.role}</p>
    </div>
  );
}
