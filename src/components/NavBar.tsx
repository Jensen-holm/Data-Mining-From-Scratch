import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

type NavItemProps = {
    href: string;
    label: string;
};

const NavItem: React.FC<NavItemProps> = ({ href, label }: NavItemProps) => {
    return (
        <li>
            <Link href={href} passHref={true} legacyBehavior={true}>
                <a className="text-gray-700 font-bold text-xl dark:hover:text-white">{label}</a>
            </Link>
        </li>
    );
};

interface DropDownItemProps {
    href: string;
    text: string;
}

const DropdownItem = ({ href, text }: DropDownItemProps) => {
    return (
        <li>
            <a
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                href={href}>
                {text}
            </a>
        </li>
    )
}

interface DropdownProps {
    title: string;
    children: React.ReactNode;
}


const Dropdown: React.FC<DropdownProps> = ({ title, children }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [navRef]);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className="relative inline-block">
            <button
                className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                onClick={toggleDropdown}
                aria-expanded={isOpen}
            >
                <span>{title}</span>
                <svg className={`w-5 h-5 ml-1 transition-transform transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            <ul className={`absolute top-full left-0 z-10 font-medium bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${isOpen ? 'block' : 'hidden'}`} id="navbar-dropdown">
                {children}
            </ul>
        </div>
    );
};



// const Nav: React.FC = () => {
//     const navRef = useRef<HTMLDivElement>(null);
//     return (
//         <nav className="top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700" ref={navRef}>
//             <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//                 <a href="https://github.com/Jensen-holm" className="flex items-center">
//                     <img src="https://avatars.githubusercontent.com/u/96762808?s=400&u=44b6fddde331063608508153f57ee1e9f044c24a&v=4" className="h-8 mr-3" alt="My Github logo" />
//                     <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Jensen Holm: Data-Miner;</span>
//                 </a>
//                 <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//                     <NavItem href="/" label="Home" />
//                     <Dropdown title="Clustering">
//                         <DropdownItem href="/kmeans-clustering" text='Kmeans' />
//                         <DropdownItem href="/kmedoids-clustering" text='Kmedoids' />
//                     </Dropdown>
//                     <NavItem href="/neural-network" label="Neural-Network" />
//                 </ul>
//             </div>
//         </nav>
//     );
// };

const Nav: React.FC = () => {
    const navRef = useRef<HTMLDivElement>(null);
    return (
        <nav className="top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700" ref={navRef}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://github.com/Jensen-holm" className="flex items-center">
                    <img src="https://avatars.githubusercontent.com/u/96762808?s=400&u=44b6fddde331063608508153f57ee1e9f044c24a&v=4" className="h-8 mr-3" alt="My Github logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Jensen Holm: Data-Miner;</span>
                </a>
                <button className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-multi-level" aria-expanded="false">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <ul className="hidden md:flex md:space-x-8 font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <NavItem href="/" label="Home" />
                    <Dropdown title="Clustering">
                        <DropdownItem href="/kmeans-clustering" text='Kmeans' />
                        <DropdownItem href="/kmedoids-clustering" text='Kmedoids' />
                    </Dropdown>
                    <NavItem href="/neural-network" label="Neural-Network" />
                </ul>
            </div>
        </nav>
    );
};


export default Nav;
