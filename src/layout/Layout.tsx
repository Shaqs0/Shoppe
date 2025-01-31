import { Outlet } from 'react-router-dom';
import { cartIcon, Logo, profileIcon, searchIcon, sepLine } from '../assets';

export function Layout() {
	return (
		<div className="mx-auto flex min-h-screen  w-[1248px] max-w-full flex-col px-4">
			<header className="mt-[72px] flex items-center justify-between">
				<div>
					<img src={Logo} alt="Logo" className="w-24 md:w-32 lg:w-40" />
				</div>
				<div className="flex items-center">
					<ul className="hidden cursor-pointer gap-8 md:flex lg:gap-16">
						<li>Shop</li>
						<li>Blog</li>
						<li>Our Story</li>
					</ul>
					<img src={sepLine} alt="Separator Line" className="hidden md:block" />
					<div className="ml-6 flex items-center gap-4 md:ml-12 md:gap-[39px]">
						<img src={searchIcon} className="size-5 md:size-[19px]" alt="Search Icon" />
						<img src={cartIcon} className="size-6 md:size-[21px]" alt="Cart Icon" />
						<img src={profileIcon} className="size-5 md:size-[20px]" alt="Profile Icon" />
					</div>
				</div>
			</header>
			<main className="grow">
				<Outlet />
			</main>
			<footer className="bg-[gray-800] p-4 text-center">
				<p>Footer content</p>
			</footer>
		</div>
	);
}

