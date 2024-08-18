import Link from "next/link";
import { NavLinksProps } from "./types";

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/ipaddress', label: 'IP Address' },
  { href: '/canvas', label: 'Canvas' }
];

export default function NavLinks({ closeSidebar }: NavLinksProps) {
  return (
    <>
      <ul>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link onClick={closeSidebar} className="menu-link" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
