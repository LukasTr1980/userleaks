'use client';

import { usePathname } from "next/navigation";
import { navLinks } from "./Navlinks";

export default function CurrentPath() {
    const pathname = usePathname();
    const currentLink = navLinks.find(link => link.href === pathname);
    const currentPathName = currentLink ? currentLink.label : 'Unkown Page';

    return (
        <h5>{currentPathName}</h5>
    )
}