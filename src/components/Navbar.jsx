import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
    getLangFromUrl,
    useTranslations,
    useTranslatedPath,
  } from "@/i18n/utils";
import NavItem from "./NavItem";

const navListItems = [
        {
            href: "/",
            label: "nav.inicio"
        },
        {
            href: "/nosotros",
            label: "nav.nosotros"
        },
        {
            href: "/habitaciones",
            label: "nav.habitaciones"
        },
        {
            href: "/servicios",
            label: "nav.servicios"
        },
        {
            href: "/contactenos",
            label: "nav.contactenos"
        }
]

export default ({ currentUrl }) => {
    const lang = getLangFromUrl(currentUrl);
    const t = useTranslations(lang);
    const translatePath = useTranslatedPath(lang);
    const [openNav, setOpenNav] = useState(false)
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
                    <img className="h-16" src="/src/images/logo.png" alt="M&K House Logo" />
                </a>
                <div className="hidden lg:flex items-center justify-center px-4 gap-4">
                    {
                        navListItems.map((item, index) => (
                            <NavItem href={translatePath(item.href)} currentUrl={currentUrl.pathname} name={t(item.label)} key={index}/>
                        ))
                    }
                </div>
                <motion.div 
                    className="lg:hidden p-2 rounded-md hover:bg-gray-200"
                    onClick={() =>setOpenNav(!openNav)}>
                    {
                        openNav ? <XMarkIcon className="w-6 h-6" strokeWidth={2} />
                        : <Bars3Icon className="w-6 h-6" strokeWidth={2} />
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
                            <NavItem href={translatePath(item.href)} currentUrl={currentUrl.pathname} name={t(item.label)} key={index}/>
                        ))
                    }
                </div>
            </motion.div>
        </nav>
    )
}