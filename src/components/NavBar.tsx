import Link from 'next/link';

type NavItemProps = {
    href: string;
    label: string;
};

const NavItem: React.FC<NavItemProps> = ({ href, label }: NavItemProps) => {
    return (
        <li>
            <Link href={href}>
                <span className="text-gray-700 font-bold text-xl sticky top-0 z-50">{label}</span>
            </Link>
        </li>
    );
};

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-100 px-4 py-2">
            <div className="max-w-6xl mx-auto">
                <ul className="flex space-x-4">
                    <NavItem href="/" label="Home" />
                    <NavItem href="/neural-network" label="Neural-Network" />
                    <NavItem href="/kmeans-clustering" label="Kmeans" />
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
