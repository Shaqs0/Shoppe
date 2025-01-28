import { Outlet } from 'react-router-dom';
import { cartIcon, Logo, profileIcon, searchIcon, sepLine } from '../assets';

export function Layout() {
	return (
		<div className="mx-auto flex min-h-screen w-[1248px] flex-col">
			<header className="mt-[72px] flex items-center justify-between">
				<div>
					<img src={Logo} alt="Logo" />
				</div>
				<div className="flex">
					<div className="mr-12">
						<ul className="flex cursor-pointer gap-16">
							<li>Shop</li>
							<li>Blog</li>
							<li>Our Story</li>
						</ul>
					</div>
					<img src={sepLine} alt="Separator Line" />
					<div className="ml-12">
						<div className="flex cursor-pointer items-center gap-[39px]">
							<img src={searchIcon} className="size-[19px]" alt="Search Icon" />
							<img src={cartIcon} className="size-[21px]" alt="Cart Icon" />
							<img src={profileIcon} className="size-[20px]" alt="Profile Icon" />
						</div>
					</div>
				</div>
			</header>
			<main className="grow">
				<Outlet />
			</main>
			<footer className="bg-[gray-800] p-4 ">
				<p>Footer content</p>
			</footer>
		</div>
	);
}
