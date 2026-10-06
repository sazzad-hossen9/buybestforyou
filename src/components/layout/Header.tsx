import { getSiteConfig } from '@/lib/data';
import { Logo } from '@/components/layout/Logo';
import { NavDropdown } from '@/components/layout/NavDropdown';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { HeaderSearchTrigger } from '@/components/layout/HeaderSearchTrigger';

export async function Header() {
  const site = await getSiteConfig();

  return (
    <header className="bg-[#1A1D21] text-white sticky top-0 z-40 border-b border-white/10">
      <div className="container-page flex items-center justify-between h-[64px] sm:h-[68px] min-w-0">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-4 sm:gap-8 shrink-0">
          <Logo light />
        </div>

        {/* Center / Right: Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-7 h-full"
          aria-label="Main Navigation"
        >
          {site.navigation.map((item, idx) => (
            <NavDropdown
              key={idx}
              name={item.name}
              href={item.href}
              items={item.dropdownItems}
            />
          ))}
        </nav>

        {/* Far Right: Search Icon (Desktop) & Mobile Hamburger */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <div className="hidden lg:block">
            <HeaderSearchTrigger />
          </div>
          <MobileMenu items={site.navigation} />
        </div>
      </div>
    </header>
  );
}
