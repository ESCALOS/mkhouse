export default ({href,name,currentUrl}) => {
    return (
        <a className={`font-semibold ${href === currentUrl  ? 'text-primary-500': 'text-gray-400'}`} href={href}>{name}</a>
    )
}