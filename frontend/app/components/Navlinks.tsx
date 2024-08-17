import Link from "next/link";
import { NavLinksProps } from "./Navlinks.types";

export default function NavLinks({ closeSidebar } : NavLinksProps) {
  return (
    <>
      <ul>
        <li>
          <Link onClick={closeSidebar} className="menu-link" href="/">Home</Link>
        </li>
        <li>
          <Link onClick={closeSidebar} className="menu-link" href="/ipaddress">IP Address</Link>
        </li>
        <li>
          <Link onClick={closeSidebar} className="menu-link" href="/canvas">Canvas</Link>
        </li>
      </ul>
    </>
  );
}
