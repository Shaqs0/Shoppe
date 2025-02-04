import { useState } from 'react';
import { searchIcon } from '../../assets';

export function ShopPage() {
	const [maxPrice, setMaxPrice] = useState(180);

	const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMaxPrice(Number(event.target.value));
	};

	return (
		<div className="mb-12 mt-24">
			<p className="text-[33px] font-medium">Shop The Latest</p>
			<div className="mt-[38px] w-64 space-y-6">
				<div className="relative">
					<input
						type="text"
						placeholder="Search..."
						className="w-full border-b border-[#D8D8D8] py-2 text-sm focus:border-[#D8D8D8] focus:ring-1 focus:ring-[#D8D8D8]"
					/>
					<span className="absolute right-3 top-2.5 text-[gray-500]">
						<img src={searchIcon} className="size-[18px]" />
					</span>
				</div>

				<div className="space-y-4">
					<select className="h-[53px] w-full rounded-md border border-[gray-300] bg-[white] p-3 text-sm focus:border-[#D8D8D8] focus:ring-[#D8D8D8]">
						<option>Shop By</option>
					</select>
					<select className="h-[53px] w-full rounded-md border border-[gray-300] bg-[white] p-3 text-sm focus:border-[#D8D8D8] focus:ring-[#D8D8D8]">
						<option>Sort By</option>
					</select>
				</div>

				<div className="">
					<input
						type="range"
						min="0"
						max="180"
						value={maxPrice}
						onChange={handleMaxPriceChange}
						className="w-full accent-[#423f3f]"
					/>
					<div className="flex justify-between text-sm text-[gray-500]">
						<span className='text-sm text-[#707070]'>Price: $0 - ${maxPrice}</span>
						<button className="text-[#A68A6A]">Filter</button>
					</div>
				</div>

				<div className="space-y-6">
					<label className="flex items-center justify-between text-sm">
            On sale
						<input type="checkbox" className="toggle" />
					</label>
					<label className="flex items-center justify-between text-sm">
            In stock
						<input type="checkbox" className="toggle" />
					</label>
				</div>
			</div>
		</div>
	);
}
