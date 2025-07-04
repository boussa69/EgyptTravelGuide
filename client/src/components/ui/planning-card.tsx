import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Link } from "wouter";

interface PlanningCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function PlanningCard({ icon: Icon, title, description }: PlanningCardProps) {
  const getColorClasses = (title: string) => {
    switch (title) {
      case "Best Time to Visit":
        return { bg: "bg-gold-accent/10", text: "text-gold-accent" };
      case "Visa & Entry":
        return { bg: "bg-teal-oasis/10", text: "text-teal-oasis" };
      case "Packing Guide":
        return { bg: "bg-accent-coral/10", text: "text-accent-coral" };
      case "Cultural Etiquette":
        return { bg: "bg-gold-accent/10", text: "text-gold-accent" };
      case "Getting Around":
        return { bg: "bg-blue-600/10", text: "text-blue-600" };
      default:
        return { bg: "bg-teal-oasis/10", text: "text-teal-oasis" };
    }
  };

  const getLinkPath = (title: string) => {
    switch (title) {
      case "Best Time to Visit":
        return "/planning/best-time-to-visit";
      case "Visa & Entry":
        return "/planning/visa-entry";
      case "Packing Guide":
        return "/planning/packing-guide";
      case "Cultural Etiquette":
        return "/planning/cultural-etiquette";
      case "Getting Around":
        return "/planning/getting-around";
      default:
        return "/planning";
    }
  };

  const colors = getColorClasses(title);
  const linkPath = getLinkPath(title);

  return (
    <Link href={linkPath}>
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-white card-hover cursor-pointer">
        <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-6`}>
          <Icon className={`w-8 h-8 ${colors.text}`} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <Button variant="ghost" className={`${colors.text} font-semibold hover:text-accent-coral transition-colors`}>
          Learn More →
        </Button>
      </div>
    </Link>
  );
}
