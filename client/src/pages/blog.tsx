import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Search, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Neuroscience Behind Trauma: Why Your Brain Gets Stuck in Survival Mode",
    excerpt: "Discover the fascinating science of how trauma rewires your brain and why traditional therapy sometimes isn't enough to heal deep wounds.",
    content: "Understanding trauma from a neuroscience perspective...",
    author: "Dr. Sarah Phoenix",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    category: "Neuroscience",
    tags: ["trauma", "neuroscience", "healing", "brain"],
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=300&fit=crop",
    featured: true,
    seoTitle: "The Neuroscience Behind Trauma: Why Your Brain Gets Stuck in Survival Mode | Phoenix Method",
    seoDescription: "Learn the fascinating science of trauma's impact on your brain and discover why traditional therapy sometimes isn't enough to heal deep wounds.",
    slug: "neuroscience-behind-trauma-survival-mode"
  },
  {
    id: 2,
    title: "7 Signs You're Healing from Narcissistic Abuse (And It's Not What You Think)",
    excerpt: "Healing from narcissistic abuse looks different than you might expect. These subtle signs show you're making real progress.",
    content: "The signs of healing from narcissistic abuse...",
    author: "Phoenix Method Team",
    publishedAt: "2024-01-12",
    readTime: "6 min read",
    category: "Recovery",
    tags: ["narcissistic abuse", "healing", "recovery", "boundaries"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=300&fit=crop",
    featured: true,
    seoTitle: "7 Signs You're Healing from Narcissistic Abuse | Phoenix Method Recovery",
    seoDescription: "Discover the 7 subtle signs that show you're truly healing from narcissistic abuse. Learn what real recovery looks like.",
    slug: "signs-healing-narcissistic-abuse"
  },
  {
    id: 3,
    title: "How to Set Boundaries Without Feeling Guilty: A Step-by-Step Guide",
    excerpt: "Boundary-setting doesn't have to feel selfish or scary. Learn the psychology behind boundary guilt and how to overcome it.",
    content: "Setting boundaries without guilt...",
    author: "Phoenix Method Team",
    publishedAt: "2024-01-10",
    readTime: "10 min read",
    category: "Boundaries",
    tags: ["boundaries", "guilt", "relationships", "self-care"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=300&fit=crop",
    featured: false,
    seoTitle: "How to Set Boundaries Without Feeling Guilty: Complete Guide | Phoenix Method",
    seoDescription: "Master guilt-free boundary setting with our step-by-step guide. Learn the psychology behind boundary guilt and overcome it.",
    slug: "set-boundaries-without-guilt-guide"
  },
  {
    id: 4,
    title: "The Hidden Connection Between Perfectionism and Trauma",
    excerpt: "Your perfectionism isn't about high standards—it's a trauma response. Learn how to heal the wounds driving your need to be perfect.",
    content: "The connection between perfectionism and trauma...",
    author: "Dr. Sarah Phoenix",
    publishedAt: "2024-01-08",
    readTime: "7 min read",
    category: "Trauma",
    tags: ["perfectionism", "trauma", "healing", "self-compassion"],
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=300&fit=crop",
    featured: false,
    seoTitle: "The Hidden Connection Between Perfectionism and Trauma | Phoenix Method",
    seoDescription: "Discover why perfectionism is actually a trauma response and learn how to heal the wounds driving your need to be perfect.",
    slug: "perfectionism-trauma-connection"
  },
  {
    id: 5,
    title: "Why Self-Compassion Is More Powerful Than Self-Esteem for Trauma Recovery",
    excerpt: "Self-esteem can be fragile and conditional. Self-compassion is the unshakeable foundation for lasting healing and transformation.",
    content: "Self-compassion vs self-esteem in trauma recovery...",
    author: "Phoenix Method Team",
    publishedAt: "2024-01-05",
    readTime: "9 min read",
    category: "Self-Compassion",
    tags: ["self-compassion", "self-esteem", "trauma recovery", "healing"],
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=300&fit=crop",
    featured: false,
    seoTitle: "Why Self-Compassion Beats Self-Esteem for Trauma Recovery | Phoenix Method",
    seoDescription: "Learn why self-compassion is more powerful than self-esteem for trauma recovery and how to develop this crucial healing skill.",
    slug: "self-compassion-vs-self-esteem-trauma"
  },
  {
    id: 6,
    title: "Understanding Complex PTSD: When Trauma Becomes Your Identity",
    excerpt: "Complex PTSD affects millions but remains misunderstood. Learn the symptoms, causes, and most importantly, the path to healing.",
    content: "Understanding Complex PTSD...",
    author: "Dr. Sarah Phoenix",
    publishedAt: "2024-01-03",
    readTime: "12 min read",
    category: "PTSD",
    tags: ["complex ptsd", "trauma", "identity", "recovery"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop",
    featured: false,
    seoTitle: "Understanding Complex PTSD: When Trauma Becomes Identity | Phoenix Method",
    seoDescription: "Learn about Complex PTSD symptoms, causes, and recovery. Discover the path to healing when trauma has become your identity.",
    slug: "understanding-complex-ptsd-recovery"
  }
];

const categories = ["All", "Neuroscience", "Recovery", "Boundaries", "Trauma", "Self-Compassion", "PTSD"];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

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
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
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
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="group-hover:text-orange-600">
                          Read More
                          <ArrowRight size={16} className="ml-1" />
                        </Button>
                      </Link>
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
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
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
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="group-hover:text-orange-600">
                          Read
                          <ArrowRight size={16} className="ml-1" />
                        </Button>
                      </Link>
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
    </div>
  );
}