import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Menu", href: "#menu" },
  { name: "Gallery", href: "#gallery" },
  { name: "Reviews", href: "#reviews" },
  { name: "Find Us Here", href: "#findus" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) {
      const offset = 64; // This matches your h-16 (16 * 4px) navbar height
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setActiveSection(href.replace("#", ""));
    setIsOpen(false);
  };

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" } // Detects section when it's in the middle of the screen
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-black backdrop-blur-md border-b border-black/10">
      <div className="mx-auto max-w-7xl px-3">
        <div className="flex h-16 items-center">
          <span className="font-fredoka text-white text-xl tracking-wide">
            DOUZE.
          </span>

          <div className="flex-1" />

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const id = item.href.slice(1);
              const isActive = activeSection === id;

              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative text-base font-medium transition-colors duration-300
                    ${isActive ? "text-[#BF0000]" : "text-white hover:text-[#BF0000]"}`}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 -bottom-[2px] h-[2px] w-full bg-[#BF0000] 
                      origin-left transition-transform duration-300
                      ${isActive ? "scale-x-100" : "scale-x-0"}`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-[#8E3B2F]"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#F5EFE8] border-t border-black/10">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full rounded-md px-4 py-3 text-left text-base font-medium
                  ${activeSection === item.href.slice(1) ? "bg-[#4e403b]/10 text-[#BF0000]" : "text-[#8E3B2F]"}`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}