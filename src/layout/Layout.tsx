import { Link, Outlet, useLocation } from 'react-router-dom';
import { cartIcon, Logo, mediaIcons, profileIcon, searchIcon, sepLine } from '../assets';

export function Layout() {
	const location = useLocation();

	return (
		<div className="mx-auto flex min-h-screen  w-[1248px] max-w-full flex-col px-4">
			<header className="mt-[72px] flex items-center justify-between border-b border-[#D8D8D8] pb-4">
				<div>
					<Link to='/'>
						<img src={Logo} alt="Logo" className="w-24 cursor-pointer md:w-32 lg:w-40" />
					</Link>
				</div>
				<div className="flex items-center">
					<ul className="mr-12 hidden cursor-pointer gap-8 md:flex lg:gap-16">
						<Link to='/shop'className={`${
							location.pathname === '/shop' ? 'link-text' : ''
						}`}>
							Shop 
						</Link>
						<Link to='/blog'className={`${
							location.pathname === '/blog' ? 'link-text' : ''
						}`}>
							Blog 
						</Link>
						<Link to='/story'className={`${
							location.pathname === '/story' ? 'link-text' : ''
						}`}>
							Our Story
						</Link>
					</ul>
					<img src={sepLine} alt="Separator Line" className="" />
					<div className="ml-12 flex cursor-pointer items-center gap-4 md:ml-12 md:gap-[39px]">
						<img src={searchIcon} className="size-5 md:size-[19px]" alt="Search Icon" />
						<img src={cartIcon} className="size-6 md:size-[21px]" alt="Cart Icon" />
						<img src={profileIcon} className="size-5 md:size-[20px]" alt="Profile Icon" />
					</div>
				</div>
			</header>
			<main className="grow">
				<Outlet />
			</main>
			<footer className="mb-24 mt-40 border-t border-[#D8D8D8]">
				<div className='mt-12 flex'>
					<ul className="flex gap-[41px] text-[#707070]">
						<li className='cursor-pointer'>CONTACT</li>
						<li className='cursor-pointer'>TERMS OF SERVICES</li>
						<li className='cursor-pointer'>SHIPPING AND RETURNS</li>
					</ul>
				</div>
				<div className='mt-12 flex items-center justify-between'>
					<p>© 2025 Shoppe. <span className='text-[#707070]'>Terms of use</span> and <span className='text-[#707070]'>privacy policy</span></p>
					<img src={mediaIcons}/>
				</div>
			</footer>
		</div>
	);
}

