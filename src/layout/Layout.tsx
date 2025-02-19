import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, MouseEvent, useEffect } from 'react';
import { cartIcon, Logo, mediaIcons, profileIcon, searchIcon, sepLine } from '../assets';
import { ScrollToTop } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { userActions } from '../store/user.slice';

export function Layout() {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const profileRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const accessToken = useSelector((state: RootState) => state.user.accessToken);
	const isAuthenticated = !!accessToken; 

	useEffect(() => {
		if (!isAuthenticated) {
			setIsDropdownVisible(false);
		}
	}, [isAuthenticated]);

	const showDropdown = () => setIsDropdownVisible(true);

	const handleMouseLeave = (e: MouseEvent) => { 
		const profileElement = profileRef.current;
		const dropdownElement = dropdownRef.current;

		if (profileElement && dropdownElement) {
			const profileRect = profileElement.getBoundingClientRect();
			const dropdownRect = dropdownElement.getBoundingClientRect();

			if (
				!(
					e.clientX >= profileRect.left - 10 &&
          e.clientX <= dropdownRect.right + 10 &&
          e.clientY >= profileRect.top - 10 &&
          e.clientY <= dropdownRect.bottom + 10
				)
			) {
				setIsDropdownVisible(false);
			}
		}
	};

	const handleProfileClick = () => {
		if (isAuthenticated) {
			showDropdown();
		} else {
			navigate('/auth/sign');
		}
	};

	const handleLogout = () => {
		dispatch(userActions.logout()); 
		navigate('/'); 
	};

	return (
		<div className="mx-auto flex min-h-screen w-[1248px] max-w-full flex-col px-4">
			<ScrollToTop />
			<header className="mt-[72px] flex items-center justify-between border-b border-[#D8D8D8] pb-4">
				<div>
					<Link to="/">
						<img src={Logo} alt="Logo" className="w-24 cursor-pointer md:w-32 lg:w-40" />
					</Link>
				</div>
				<div className="flex items-center">
					<ul className="mr-12 hidden cursor-pointer gap-8 md:flex lg:gap-16">
						<Link to="/shop" className={location.pathname === '/shop' ? 'link-text' : ''}>
							Shop
						</Link>
						<Link to="/blog" className={location.pathname === '/blog' ? 'link-text' : ''}>
							Blog
						</Link>
						<Link to="/story" className={location.pathname === '/story' ? 'link-text' : ''}>
							Our Story
						</Link>
					</ul>
					<img src={sepLine} alt="Separator Line" />
					<div className="ml-12 flex cursor-pointer items-center gap-4 md:ml-12 md:gap-[39px]">
						<img src={searchIcon} className="size-5 md:size-[19px]" alt="Search Icon" />
						<img src={cartIcon} className="size-6 md:size-[21px]" alt="Cart Icon" />
						<div
							ref={profileRef}
							className="relative inline-block"
							onMouseEnter={showDropdown}
							onMouseLeave={handleMouseLeave}
						>
							<div className="cursor-pointer" onClick={handleProfileClick}>
								<img src={profileIcon} className="size-5 md:size-[20px]" alt="Profile Icon" />
							</div>
							{isDropdownVisible && isAuthenticated && (
								<div
									ref={dropdownRef}
									className="absolute right-0 z-10 mt-2 flex w-28 flex-col items-center rounded-lg border border-[#D8D8D8] bg-[white] shadow-lg"
									onMouseEnter={showDropdown}
									onMouseLeave={handleMouseLeave}
								>
									<Link to="/profile" className="w-full p-1 text-center hover:bg-[#D8D8D8]">
										My Profile
									</Link>
									<Link to="/orders" className="w-full p-1 text-center hover:bg-[#D8D8D8]">
										My Orders
									</Link>
									<button className="w-full p-1 text-center hover:bg-[#D8D8D8]" onClick={handleLogout}>
										Log Out
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</header>
			<main className="min-h-[80vh] w-full grow">
				<Outlet />
			</main>
			<footer className="mb-24 mt-40 border-t border-[#D8D8D8]">
				<div className="mt-12 flex">
					<ul className="flex gap-[41px] text-[#707070]">
						<li className="cursor-pointer">CONTACT</li>
						<li className="cursor-pointer">TERMS OF SERVICES</li>
						<li className="cursor-pointer">SHIPPING AND RETURNS</li>
					</ul>
				</div>
				<div className="mt-12 flex items-center justify-between">
					<p>
						© 2025 Shoppe. <span className="text-[#707070]">Terms of use</span> and{' '}
						<span className="text-[#707070]">privacy policy</span>
					</p>
					<img src={mediaIcons} alt="Media Icons" />
				</div>
			</footer>
		</div>
	);
}
