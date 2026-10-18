import { getSiteConfig } from "@/lib/data";
import { Logo } from "@/components/layout/Logo";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { HeaderSearchTrigger } from "@/components/layout/HeaderSearchTrigger";

export async function Header() {
  const site = await getSiteConfig();

  return (
    <header className="bg-ink text-white sticky top-0 z-40 ">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-14    flex items-center justify-between py-[19px] min-w-0">
        <div className="flex lg:gap-13.5">
          {/* Left: Brand Logo */}
          <div className="flex items-center shrink-0 ml-2.5">
            <Logo light />
          </div>

          {/* Center / Right: Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-7.5"
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
        </div>

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
