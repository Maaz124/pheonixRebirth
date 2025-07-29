// SEO metadata and structured data for the Phoenix Method platform

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  openGraph?: {
    title: string;
    description: string;
    image: string;
    type: string;
  };
  twitter?: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
  structuredData?: any;
}

export const defaultSEO: SEOMetadata = {
  title: "Phoenix Method™ - Transform Your Trauma Into Your Greatest Strength",
  description: "The Phoenix Method™ is a revolutionary 7-phase trauma recovery program designed for emotionally exhausted women. Evidence-based, neuroscience-backed healing from trauma, anxiety, and narcissistic abuse.",
  keywords: [
    "trauma recovery",
    "narcissistic abuse recovery", 
    "anxiety treatment",
    "PTSD healing",
    "women's mental health",
    "trauma therapy",
    "emotional healing",
    "phoenix method",
    "neuroscience-based therapy",
    "trauma-informed coaching"
  ],
  openGraph: {
    title: "Phoenix Method™ - Transform Your Trauma Into Your Greatest Strength",
    description: "Revolutionary 7-phase trauma recovery program for women. Evidence-based healing from trauma, anxiety, and narcissistic abuse.",
    image: "/phoenix-logo.svg",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Phoenix Method™ - Transform Your Trauma Into Your Greatest Strength", 
    description: "Revolutionary 7-phase trauma recovery program for women. Evidence-based healing from trauma, anxiety, and narcissistic abuse.",
    image: "/phoenix-logo.svg"
  }
};

export const pageSEO = {
  home: {
    title: "Phoenix Method™ - 7-Phase Trauma Recovery Program for Women",
    description: "Transform trauma into strength with our evidence-based 7-phase program. Designed for women healing from trauma, anxiety, and narcissistic abuse. Start your Phoenix journey today.",
    keywords: ["trauma recovery program", "women's trauma therapy", "phoenix method", "7-phase healing", "trauma transformation"]
  },
  
  pricing: {
    title: "Phoenix Method™ Pricing - Choose Your Healing Journey | Trauma Recovery",
    description: "Choose from 3 subscription plans for the Phoenix Method™ trauma recovery program. Free tier available. 30-day guarantee. HIPAA compliant. Cancel anytime.",
    keywords: ["phoenix method pricing", "trauma recovery cost", "healing program subscription", "therapy pricing"]
  },
  
  landing: {
    title: "Free Phoenix Assessment - Discover Your Trauma Recovery Path | Phoenix Method™",
    description: "Get your free Phoenix Assessment and discover exactly where you are in your healing journey. Personalized trauma recovery roadmap for women survivors.",
    keywords: ["free trauma assessment", "phoenix assessment", "trauma recovery test", "healing journey assessment"]
  },
  
  blog: {
    title: "Phoenix Method™ Blog - Trauma Recovery, Healing & Transformation Insights", 
    description: "Expert insights on trauma recovery, narcissistic abuse healing, and transformation. Evidence-based articles by trauma specialists and survivors.",
    keywords: ["trauma recovery blog", "narcissistic abuse articles", "healing insights", "trauma therapy blog"]
  },
  
  resources: {
    title: "Free Trauma Recovery Resources - Worksheets, Tools & Exercises | Phoenix Method™",
    description: "Free trauma recovery resources including worksheets, healing exercises, and therapeutic tools. Evidence-based materials for your healing journey.",
    keywords: ["free trauma resources", "healing worksheets", "trauma recovery tools", "therapy exercises"]
  }
};

export const structuredDataSchemas = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Phoenix Method™",
    "description": "Revolutionary trauma recovery program for women",
    "url": "https://phoenixmethod.com",
    "logo": "https://phoenixmethod.com/phoenix-logo.svg",
    "sameAs": [
      "https://facebook.com/phoenixmethod",
      "https://instagram.com/phoenixmethod", 
      "https://twitter.com/phoenixmethod"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-PHOENIX",
      "contactType": "customer service"
    }
  },
  
  course: {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Phoenix Method™ - 7-Phase Trauma Recovery Program",
    "description": "Comprehensive trauma recovery program designed specifically for women",
    "provider": {
      "@type": "Organization", 
      "name": "Phoenix Method™"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT8W"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2847"
    }
  },
  
  product: {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Phoenix Method™ Subscription",
    "description": "Access to the complete 7-phase trauma recovery program",
    "brand": {
      "@type": "Brand",
      "name": "Phoenix Method™"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Phoenix Rise",
        "price": "29.00",
        "priceCurrency": "USD",
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer", 
        "name": "Phoenix Transform",
        "price": "79.00",
        "priceCurrency": "USD",
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2847"
    }
  },

  faq: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does the Phoenix Method™ take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The program is designed to be completed at your own pace. Most women see significant improvements within 8-12 weeks, but lasting transformation can take 6-12 months depending on your starting point and commitment level."
        }
      },
      {
        "@type": "Question",
        "name": "Is this therapy or coaching?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "The Phoenix Method™ is a trauma-informed coaching program, not therapy. While our approach is based on therapeutic principles, we recommend working with a licensed therapist for severe trauma or mental health conditions."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Phoenix Method™ different from traditional therapy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Phoenix Method™ combines neuroscience-based techniques with trauma-informed coaching in a structured 7-phase program. It's designed specifically for women and focuses on transforming trauma into strength rather than just managing symptoms."
        }
      }
    ]
  }
};

export const keywordTargets = {
  primary: [
    "trauma recovery program",
    "narcissistic abuse recovery", 
    "phoenix method",
    "trauma healing for women",
    "emotional healing program"
  ],
  
  secondary: [
    "PTSD recovery program",
    "anxiety treatment program",
    "trauma therapy online",
    "healing from narcissistic abuse",
    "women's trauma recovery",
    "neuroscience-based healing",
    "trauma-informed coaching",
    "emotional abuse recovery"
  ],
  
  longTail: [
    "how to heal from narcissistic abuse",
    "trauma recovery program for women",
    "signs you're healing from trauma",
    "best online trauma therapy program",
    "phoenix method trauma recovery reviews",
    "7 phase trauma healing program",
    "evidence-based trauma recovery",
    "trauma recovery without therapy"
  ]
};