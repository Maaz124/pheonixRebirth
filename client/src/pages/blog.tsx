import { useState } from "react";
import { Link } from "wouter"; // Keeping Link if used elsewhere, but maybe removable
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Search, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const categories = ["All", "Neuroscience", "Recovery", "Boundaries", "Trauma", "Self-Compassion", "PTSD"];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const filteredPosts = blogPosts.filter(post => {
    // Filter logic
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.tags && Array.isArray(post.tags) && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.slice(0, 2); // Just take first two as featured for now since 'featured' flag isn't in DB yet or we can add it later

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-orange-600" /></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* SEO Head would go here in a real implementation */}

      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Phoenix Method™ Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Evidence-based insights on trauma recovery, healing, and transformation.
            Written by experts and survivors who understand your journey.
          </p>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search articles about trauma, healing, boundaries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-orange-600 hover:bg-orange-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === "All" && searchTerm === "" && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.coverImage || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=300&fit=crop"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <Clock size={14} />
                        5 min read
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:text-orange-600" onClick={() => setSelectedPost(post)}>
                        Read More
                        <ArrowRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {searchTerm ? `Search Results for "${searchTerm}"` :
              selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">No articles found.</p>
              <Button
                onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.coverImage || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=300&fit=crop"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <Clock size={14} />
                        5 min read
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-orange-600 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:text-orange-600" onClick={() => setSelectedPost(post)}>
                        Read
                        <ArrowRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Never Miss a Healing Insight
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get our latest trauma recovery articles, free resources, and healing tips delivered to your inbox weekly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-1 h-12 text-gray-900"
            />
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8">
              Subscribe
            </Button>
          </div>

          <p className="text-sm mt-4 opacity-75">
            No spam, unsubscribe anytime. Your email is safe with us.
          </p>
        </div>
      </section>

      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
          <ScrollArea className="h-full w-full">
            <div className="p-6">
              <DialogHeader className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge>{selectedPost?.category}</Badge>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar size={14} />
                    {selectedPost?.publishedAt ? new Date(selectedPost.publishedAt).toLocaleDateString() : ''}
                  </span>
                </div>
                <DialogTitle className="text-3xl font-bold leading-tight mb-4">{selectedPost?.title}</DialogTitle>
                <DialogDescription className="text-lg text-gray-700">
                  {selectedPost?.excerpt}
                </DialogDescription>
              </DialogHeader>

              {selectedPost?.coverImage && (
                <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
                  <img
                    src={selectedPost.coverImage}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div
                className="prose prose-orange max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedPost?.content || '' }}
              />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}