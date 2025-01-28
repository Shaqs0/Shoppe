import { Outlet } from 'react-router-dom';
import { cartIcon, Logo, profileIcon, searchIcon, sepLine } from '../assets';

export function Layout () {
	return (
		<div className="">
			<header className="mt-[72px] flex w-[1248px] items-center justify-between">
				<div>
					<img src={Logo}/>
				</div>
				<div className='flex'>
					<div className='mr-12'>
						<ul className='flex cursor-pointer gap-16'>
							<li className=''>Shop</li>
							<li className=''>Blog</li>
							<li className=''>Our Story</li>
						</ul>
					</div>
					<img src={sepLine}/>
					<div className='ml-12'>
						<div className='flex cursor-pointer items-center gap-[39px]'>
							<img src={searchIcon} className='size-[19px]'/>
							<img src={cartIcon} className='size-[21px]'/>
							<img src={profileIcon} className='size-[20px]'/>
						</div>
					</div>
				</div>
			</header>
			<main>
				<Outlet/>
			</main>
			<footer>
                
			</footer>
		</div>
	);
}