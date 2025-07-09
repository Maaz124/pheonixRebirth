import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Leaf, Brain, Wand2, Shield, FileText, Play
} from "lucide-react";
import type { Resource } from "@shared/schema";

export default function Resources() {
  const { data: resources = [] } = useQuery<Resource[]>({
    queryKey: ['/api/resources'],
  });

  const handleAccessResource = (resource: Resource) => {
    console.log('Accessing resource:', resource);
    // TODO: Implement resource access logic
  };

  const getResourcesByCategory = (category: string) => {
    return resources.filter(r => r.category === category);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mindfulness':
        return <Leaf className="phoenix-text-accent" size={20} />;
      case 'cbt':
        return <Brain className="phoenix-text-primary" size={20} />;
      case 'nlp':
        return <Wand2 className="phoenix-text-secondary" size={20} />;
      case 'trauma':
        return <Shield className="text-yellow-600" size={20} />;
      case 'worksheets':
        return <FileText className="phoenix-text-success" size={20} />;
      case 'videos':
        return <Play className="phoenix-text-accent" size={20} />;
      default:
        return <FileText className="phoenix-text-gray" size={20} />;
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'mindfulness':
        return 'Guided practices for present-moment awareness and emotional regulation';
      case 'cbt':
        return 'Cognitive-behavioral tools for thought pattern recognition and restructuring';
      case 'nlp':
        return 'Neuro-linguistic programming tools for reframing and transformation';
      case 'trauma':
        return 'Specialized resources for trauma recovery and nervous system regulation';
      case 'worksheets':
        return 'Printable resources for self-reflection and progress tracking';
      case 'videos':
        return 'Guided sessions and educational content from your coach';
      default:
        return 'Additional resources for your healing journey';
    }
  };

  const ResourceList = ({ categoryResources }: { categoryResources: Resource[] }) => (
    <div className="space-y-2">
      {categoryResources.map((resource) => (
        <Button
          key={resource.id}
          variant="ghost"
          className="w-full justify-start text-left phoenix-text-primary hover:phoenix-text-secondary transition-colors p-3"
          onClick={() => handleAccessResource(resource)}
        >
          <div>
            <div className="font-medium">{resource.title}</div>
            <div className="text-sm phoenix-text-gray">{resource.description}</div>
          </div>
        </Button>
      ))}
    </div>
  );

  return (
    <main className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resource Library</h1>
          <p className="text-xl phoenix-text-gray max-w-3xl mx-auto">
            Evidence-based tools and techniques for your healing journey. All resources are trauma-informed and designed to support your progress through the PHOENIX Method™.
          </p>
        </div>

        {/* Resource Categories */}
        <Tabs defaultValue="mindfulness" className="w-full">
          <TabsList className="grid grid-cols-6 w-full mb-8">
            <TabsTrigger value="mindfulness" className="flex items-center space-x-2">
              <Leaf size={16} />
              <span className="hidden sm:inline">Mindfulness</span>
            </TabsTrigger>
            <TabsTrigger value="cbt" className="flex items-center space-x-2">
              <Brain size={16} />
              <span className="hidden sm:inline">CBT</span>
            </TabsTrigger>
            <TabsTrigger value="nlp" className="flex items-center space-x-2">
              <Wand2 size={16} />
              <span className="hidden sm:inline">NLP</span>
            </TabsTrigger>
            <TabsTrigger value="trauma" className="flex items-center space-x-2">
              <Shield size={16} />
              <span className="hidden sm:inline">Trauma</span>
            </TabsTrigger>
            <TabsTrigger value="worksheets" className="flex items-center space-x-2">
              <FileText size={16} />
              <span className="hidden sm:inline">Worksheets</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center space-x-2">
              <Play size={16} />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mindfulness">
            <Card className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center">
                  {getCategoryIcon('mindfulness')}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Mindfulness Exercises</h2>
                  <p className="phoenix-text-gray">{getCategoryDescription('mindfulness')}</p>
                </div>
              </div>
              <ResourceList categoryResources={getResourcesByCategory('mindfulness')} />
            </Card>
          </TabsContent>

          <TabsContent value="cbt">
            <Card className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  {getCategoryIcon('cbt')}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">CBT Techniques</h2>
                  <p className="phoenix-text-gray">{getCategoryDescription('cbt')}</p>
                </div>
              </div>
              <ResourceList categoryResources={getResourcesByCategory('cbt')} />
            </Card>
          </TabsContent>

          <TabsContent value="nlp">
            <Card className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center">
                  {getCategoryIcon('nlp')}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">NLP Techniques</h2>
                  <p className="phoenix-text-gray">{getCategoryDescription('nlp')}</p>
                </div>
              </div>
              <ResourceList categoryResources={getResourcesByCategory('nlp')} />
            </Card>
          </TabsContent>

          <TabsContent value="trauma">
            <Card className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                  {getCategoryIcon('trauma')}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Trauma-Informed Tools</h2>
                  <p className="phoenix-text-gray">{getCategoryDescription('trauma')}</p>
                </div>
              </div>
              <ResourceList categoryResources={getResourcesByCategory('trauma')} />
            </Card>
          </TabsContent>

          <TabsContent value="worksheets">
            <Card className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  {getCategoryIcon('worksheets')}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Worksheets & Journals</h2>
                  <p className="phoenix-text-gray">{getCategoryDescription('worksheets')}</p>
                </div>
              </div>
              <ResourceList categoryResources={getResourcesByCategory('worksheets')} />
            </Card>
          </TabsContent>

          <TabsContent value="videos">
            <Card className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center">
                  {getCategoryIcon('videos')}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Video Library</h2>
                  <p className="phoenix-text-gray">{getCategoryDescription('videos')}</p>
                </div>
              </div>
              <ResourceList categoryResources={getResourcesByCategory('videos')} />
            </Card>
          </TabsContent>
        </Tabs>

        {/* Featured Resources */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured This Week</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-teal-50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="phoenix-text-primary" size={20} />
                </div>
                <h3 className="font-semibold text-gray-900">Boundary Setting Worksheet</h3>
              </div>
              <p className="text-sm phoenix-text-gray mb-4">
                A comprehensive guide to identifying, setting, and maintaining healthy boundaries in all areas of your life.
              </p>
              <Button className="w-full">Download Now</Button>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <Play className="phoenix-text-secondary" size={20} />
                </div>
                <h3 className="font-semibold text-gray-900">Self-Compassion Meditation</h3>
              </div>
              <p className="text-sm phoenix-text-gray mb-4">
                A 15-minute guided meditation to help you develop a kinder, more compassionate relationship with yourself.
              </p>
              <Button className="w-full">Listen Now</Button>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-teal-50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="phoenix-text-success" size={20} />
                </div>
                <h3 className="font-semibold text-gray-900">Grounding Technique Card</h3>
              </div>
              <p className="text-sm phoenix-text-gray mb-4">
                Quick reference card with 5 powerful grounding techniques for managing overwhelming emotions.
              </p>
              <Button className="w-full">Get Card</Button>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
