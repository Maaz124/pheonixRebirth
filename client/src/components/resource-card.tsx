import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Leaf, Brain, Wand2, Shield, FileText, Play
} from "lucide-react";
import type { Resource } from "@shared/schema";

interface ResourceCardProps {
  resource: Resource;
  onAccessResource: (resource: Resource) => void;
}

export function ResourceCard({ resource, onAccessResource }: ResourceCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mindfulness':
        return <Leaf className="phoenix-text-accent text-xl" size={24} />;
      case 'cbt':
        return <Brain className="phoenix-text-primary text-xl" size={24} />;
      case 'nlp':
        return <Wand2 className="phoenix-text-secondary text-xl" size={24} />;
      case 'trauma':
        return <Shield className="text-yellow-600 text-xl" size={24} />;
      case 'worksheets':
        return <FileText className="phoenix-text-success text-xl" size={24} />;
      case 'videos':
        return <Play className="phoenix-text-accent text-xl" size={24} />;
      default:
        return <FileText className="phoenix-text-gray text-xl" size={24} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mindfulness':
        return 'bg-teal-50';
      case 'cbt':
        return 'bg-blue-50';
      case 'nlp':
        return 'bg-pink-50';
      case 'trauma':
        return 'bg-yellow-50';
      case 'worksheets':
        return 'bg-green-50';
      case 'videos':
        return 'bg-teal-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'mindfulness':
        return 'Mindfulness Exercises';
      case 'cbt':
        return 'CBT Techniques';
      case 'nlp':
        return 'NLP Techniques';
      case 'trauma':
        return 'Trauma-Informed Tools';
      case 'worksheets':
        return 'Worksheets & Journals';
      case 'videos':
        return 'Video Library';
      default:
        return 'Resources';
    }
  };

  return (
    <Card className="hover:shadow-xl transition-shadow p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-12 h-12 ${getCategoryColor(resource.category)} rounded-full flex items-center justify-center`}>
          {getCategoryIcon(resource.category)}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{getCategoryTitle(resource.category)}</h3>
      </div>
      
      <p className="phoenix-text-gray text-sm mb-4">{resource.description}</p>
      
      <div className="space-y-2 mb-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-left phoenix-text-primary text-sm hover:phoenix-text-secondary transition-colors p-2"
          onClick={() => onAccessResource(resource)}
        >
          {resource.title}
        </Button>
      </div>
    </Card>
  );
}
