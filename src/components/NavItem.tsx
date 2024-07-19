export default function NavItem ({href,name,currentUrl}: {href: string, name: string, currentUrl: string}) {
    return (
        <a className={`font-semibold ${href === currentUrl  ? 'text-primary-500': 'text-gray-400'}`} href={href}>{name}</a>
    )
}