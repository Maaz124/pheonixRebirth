import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export function Navigation() {
  const [location] = useLocation();
  
  const { data: user } = useQuery<User>({
    queryKey: ['/api/user/current'],
  });

  const navItems = [
    { href: "/", label: "Overview" },
    { href: "/phases", label: "Phases" },
    { href: "/resources", label: "Resources" },
    { href: "/journal", label: "Journal" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <img 
                src="/phoenix-logo.svg" 
                alt="Phoenix Method Logo" 
                className="h-12 w-auto"
              />
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className={`transition-colors cursor-pointer ${
                  location === item.href 
                    ? "text-orange-600 font-medium" 
                    : "text-gray-600 hover:text-orange-600"
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
          
          {user && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{user.username?.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-sm text-gray-600">{user.username}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
