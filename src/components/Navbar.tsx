import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
    useTranslations,
    useTranslatedPath
  } from "@/i18n/utils";
import NavItem from "./NavItem";

export default function Navbar ({ lang, currentUrl, logoPath }: {lang: 'es'| 'en', currentUrl: string, logoPath: string}) {
    
    const t = useTranslations(lang);
    const translatePath = useTranslatedPath(lang);
    const [openNav, setOpenNav] = useState(false)
    const navListItems = [
        {
            href: translatePath("/"),
            label: t("nav.inicio")
        },
        {
            href: `${translatePath("/")}#about`,
            label: t( "nav.nosotros")
        },
        {
            href: `${translatePath("/")}#gallery-room`,
            label: t("nav.galeria")
        },
        {
            href: `${translatePath("/")}#services`,
            label: t("nav.servicios")
        },
        {
            href: `${translatePath("/")}#contact`,
            label: t("nav.contactenos")
        }
]
    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        )
    }, [])

    return (
        <nav className="p-4 mx-auto max-w-7xl">
            <div className="flex items-center justify-between text-blue-gray-900">
                <a  href={translatePath("/")}>
                    <img className="h-16" src={logoPath} alt="M&K House Logo" />
                </a>
                <div className="hidden lg:flex items-center justify-center px-4 gap-4">
                    {
                        navListItems.map((item, index) => (
                            <NavItem href={item.href} currentUrl={currentUrl} name={item.label} key={index}/>
                        ))
                    }
                </div>
                <motion.div 
                    className="lg:hidden p-2 rounded-md hover:bg-gray-200 cursor-pointer"
                    onClick={() =>setOpenNav(!openNav)}>
                    {
                        openNav ? <XMarkIcon title="xMark" className="w-6 h-6" strokeWidth={2} />
                        : <Bars3Icon title="bar3" className="w-6 h-6" strokeWidth={2} />
                    }
                </motion.div>
            </div>
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: openNav ? 'auto' : 0 }}
                transition={{ duration: 0.5 }}
                style={{ overflow: 'hidden' }}
                >
                <div className="flex gap-1 items-center justify-center flex-col py-4">
                    {
                        navListItems.map((item, index) => (
                            <NavItem href={item.href} currentUrl={currentUrl} name={item.label} key={index}/>
                        ))
                    }
                </div>
            </motion.div>
        </nav>
    )
}