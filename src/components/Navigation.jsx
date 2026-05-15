import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Info, Users, Workflow, Building2, Images,
  Menu, ChevronDown,
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

// ─── Menu configuration ───────────────────────────────────────────────────────
const menuItems = [
  { title: 'HOME', url: '/' },
  {
    title: 'ABOUT',
    url: '/about',
    items: [
      {
        title: 'About Us',
        description: 'Learn about our mission and daily payment model',
        icon: <Info className="size-4 shrink-0" style={{ color: '#D5B4E7' }} />,
        url: '/about',
      },
      {
        title: 'Our Team',
        description: 'Meet the people building your future home',
        icon: <Users className="size-4 shrink-0" style={{ color: '#D5B4E7' }} />,
        url: '/team',
      },
      {
        title: 'How It Works',
        description: 'Understand the path from payments to ownership',
        icon: <Workflow className="size-4 shrink-0" style={{ color: '#D5B4E7' }} />,
        url: '/how-it-works',
      },
    ],
  },
  {
    title: 'PROPERTIES',
    url: '/properties',
    items: [
      {
        title: 'All Properties',
        description: 'Browse our complete collection of premium homes',
        icon: <Building2 className="size-4 shrink-0" style={{ color: '#D5B4E7' }} />,
        url: '/properties',
      },
      {
        title: 'Gallery',
        description: 'View stunning photos of our completed properties',
        icon: <Images className="size-4 shrink-0" style={{ color: '#D5B4E7' }} />,
        url: '/gallery',
      },
    ],
  },
  { title: 'FAQ', url: '/faq' },
  { title: 'BLOG', url: '/blog' },
  { title: 'CONTACT', url: '/contact' },
];

const mobileExtraLinks = [
  { name: 'Gallery', url: '/gallery' },
  { name: 'How It Works', url: '/how-it-works' },
  { name: 'Our Team', url: '/team' },
  { name: 'Apartments', url: '/apartments' },
];

// ─── Logo ─────────────────────────────────────────────────────────────────────
const Logo = () => (
  <a href="/" className="flex items-center text-white font-bold select-none" style={{ letterSpacing: '0.04em' }}>
    <span className="uppercase text-base">Bongo</span>
    <span className="mx-2 w-px h-4 bg-white/30 inline-block" />
    <span className="uppercase font-light tracking-widest text-sm" style={{ color: '#D5B4E7' }}>
      Estates
    </span>
  </a>
);

// ─── Desktop dropdown item ─────────────────────────────────────────────────────
const DropdownItem = ({ item }) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        href={item.url}
        className="flex select-none gap-3 p-3 leading-none no-underline outline-none transition-colors rounded-sm"
        style={{ color: 'white' }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(74,0,114,0.35)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        <span className="mt-0.5 shrink-0">{item.icon}</span>
        <div>
          <div className="text-sm font-medium text-white">{item.title}</div>
          {item.description && (
            <p className="mt-0.5 text-xs leading-snug" style={{ color: '#9a7ab0' }}>
              {item.description}
            </p>
          )}
        </div>
      </a>
    </NavigationMenuLink>
  </li>
);

// ─── Main component ────────────────────────────────────────────────────────────
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const location = useLocation();

  const hasBg = isScrolled;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close sheet on route change
  useEffect(() => {
    setSheetOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hasBg ? 'shadow-lg' : ''}`}
      style={{
        backgroundColor: hasBg ? '#300049' : 'transparent',
        backdropFilter: hasBg ? 'blur(8px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Desktop ── */}
        <div className={`hidden lg:flex items-center justify-between transition-all duration-300 ${hasBg ? 'py-4' : 'py-6'}`}>
          {/* Left: CTA */}
          <a
            href="/request-viewing"
            className="text-xs uppercase tracking-widest text-white border border-white/40 px-5 py-2 hover:bg-white hover:text-[#300049] transition-all duration-300 shrink-0"
            style={{ minHeight: 'unset' }}
          >
            Request a Viewing
          </a>

          {/* Center: Nav links — CSS vars override popover to dark purple */}
          <NavigationMenu
            style={{
              '--popover': '282 100% 8%',
              '--popover-foreground': '0 0% 98%',
              '--border': '281 89% 22%',
            }}
          >
            <NavigationMenuList className="gap-0">
              {menuItems.map((item) =>
                item.items ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger
                      className="h-10 bg-transparent pl-4 pr-3 text-sm font-medium tracking-wide uppercase text-white hover:bg-white hover:text-[#300049] focus:bg-white focus:text-[#300049] data-[state=open]:bg-white data-[state=open]:text-[#300049]"
                    >
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      {/* The viewport bg is overridden via CSS vars above */}
                      <ul className="w-64 p-2">
                        {item.items.map((subItem) => (
                          <DropdownItem key={subItem.title} item={subItem} />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <a
                        href={item.url}
                        className="inline-flex h-10 items-center px-4 text-sm font-medium tracking-wide uppercase text-white hover:bg-white hover:text-[#300049] rounded-md transition-colors"
                      >
                        {item.title}
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right: Logo */}
          <Logo />
        </div>

        {/* ── Mobile ── */}
        <div className={`flex lg:hidden items-center justify-between transition-all duration-300 ${hasBg ? 'py-4' : 'py-5'}`}>
          <Logo />

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-md transition-colors"
                style={{ minHeight: 'unset', padding: 0 }}
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="overflow-y-auto border-l border-[#4A0072]/40 p-0"
              style={{ backgroundColor: '#0e0014' }}
            >
              <SheetHeader className="px-6 pt-6 pb-4 border-b border-[#4A0072]/30">
                <SheetTitle asChild>
                  <Logo />
                </SheetTitle>
              </SheetHeader>

              <div className="px-6 py-6 flex flex-col gap-6">
                {/* Accordion menu */}
                <Accordion type="single" collapsible className="flex w-full flex-col">
                  {menuItems.map((item) =>
                    item.items ? (
                      <AccordionItem
                        key={item.title}
                        value={item.title}
                        className="border-b border-[#4A0072]/30"
                      >
                        <AccordionTrigger className="py-3 text-sm font-medium uppercase tracking-wide text-white hover:text-[#D5B4E7] hover:no-underline [&>svg]:text-white/50">
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="pb-3">
                          <div className="flex flex-col gap-1">
                            {item.items.map((subItem) => (
                              <a
                                key={subItem.title}
                                href={subItem.url}
                                className="flex items-start gap-3 rounded-sm px-3 py-2.5 transition-colors"
                                style={{ color: '#9a7ab0' }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = 'rgba(74,0,114,0.3)';
                                  e.currentTarget.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                  e.currentTarget.style.color = '#9a7ab0';
                                }}
                              >
                                <span className="mt-0.5 shrink-0">{subItem.icon}</span>
                                <div>
                                  <div className="text-sm font-medium text-white">{subItem.title}</div>
                                  {subItem.description && (
                                    <p className="text-xs mt-0.5 leading-snug" style={{ color: '#6b4a7a' }}>
                                      {subItem.description}
                                    </p>
                                  )}
                                </div>
                              </a>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <div key={item.title} className="border-b border-[#4A0072]/30">
                        <a
                          href={item.url}
                          className="block py-3 text-sm font-medium uppercase tracking-wide text-white hover:text-[#D5B4E7] transition-colors"
                        >
                          {item.title}
                        </a>
                      </div>
                    )
                  )}
                </Accordion>

                {/* Extra quick links */}
                <div className="border-t border-[#4A0072]/30 pt-4">
                  <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#6b4a7a' }}>
                    Quick Links
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {mobileExtraLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        className="inline-flex h-8 items-center px-3 text-xs rounded-sm transition-colors"
                        style={{ color: '#9a7ab0' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#D5B4E7'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#9a7ab0'; }}
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3 pt-2">
                  <a
                    href="/request-viewing"
                    className="block text-center border border-[#D5B4E7] py-2.5 text-xs uppercase tracking-widest transition-all duration-300"
                    style={{ color: '#D5B4E7', minHeight: 'unset' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#D5B4E7';
                      e.currentTarget.style.color = '#0e0014';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#D5B4E7';
                    }}
                  >
                    Request a Viewing
                  </a>
                  <a
                    href="/contact"
                    className="block text-center py-2.5 text-xs uppercase tracking-widest text-white transition-colors duration-300"
                    style={{ backgroundColor: '#300049', minHeight: 'unset' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#4A0072'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#300049'; }}
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
