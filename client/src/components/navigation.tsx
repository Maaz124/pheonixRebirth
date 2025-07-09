import { Link, useLocation } from "wouter";
import { Bird } from "lucide-react";
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
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 phoenix-gradient rounded-full flex items-center justify-center">
                <Bird className="text-white text-lg" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold phoenix-text-primary">PHOENIX Method™</h1>
                <p className="text-xs phoenix-text-gray">From Burnout to Rebirth</p>
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className={`transition-colors cursor-pointer ${
                  location === item.href 
                    ? "phoenix-text-primary" 
                    : "phoenix-text-gray hover:phoenix-text-primary"
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
          
          {user && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 phoenix-bg-accent rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{user.initials}</span>
              </div>
              <span className="text-sm phoenix-text-gray">{user.name}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
