import { useEffect } from "react";
import type { SEOMetadata } from "@shared/seo";

interface SEOHeadProps {
  metadata: SEOMetadata;
}

export function SEOHead({ metadata }: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = metadata.title;
    
    // Update meta description
    updateMetaTag("description", metadata.description);
    
    // Update keywords if provided
    if (metadata.keywords) {
      updateMetaTag("keywords", metadata.keywords.join(", "));
    }
    
    // Update canonical URL if provided
    if (metadata.canonicalUrl) {
      updateLinkTag("canonical", metadata.canonicalUrl);
    }
    
    // Update Open Graph tags
    if (metadata.openGraph) {
      updateMetaProperty("og:title", metadata.openGraph.title);
      updateMetaProperty("og:description", metadata.openGraph.description);
      updateMetaProperty("og:image", metadata.openGraph.image);
      updateMetaProperty("og:type", metadata.openGraph.type);
      updateMetaProperty("og:url", window.location.href);
    }
    
    // Update Twitter Card tags
    if (metadata.twitter) {
      updateMetaName("twitter:card", metadata.twitter.card);
      updateMetaName("twitter:title", metadata.twitter.title);
      updateMetaName("twitter:description", metadata.twitter.description);
      updateMetaName("twitter:image", metadata.twitter.image);
    }
    
    // Add structured data
    if (metadata.structuredData) {
      addStructuredData(metadata.structuredData);
    }
    
    // Add additional SEO meta tags
    updateMetaName("robots", "index, follow");
    updateMetaName("author", "Phoenix Method™");
    updateMetaProperty("article:publisher", "Phoenix Method™");
    
  }, [metadata]);

  return null; // This component doesn't render anything
}

function updateMetaTag(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function updateMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function updateMetaName(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function updateLinkTag(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
}

function addStructuredData(data: any) {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Add new structured data
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}