import { useEffect, useState } from 'react';
import { searchIcon } from '../../assets';
import { CardButton } from '../../components';
import { Product } from '../../interfaces/product.interface';
import { fetchNewProducts } from '../../api/products';

export function ShopPage() {
	const [maxPrice, setMaxPrice] = useState(180);
	const [newProducts, setNewProducts] = useState<Product[]>([]);

	const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMaxPrice(Number(event.target.value));
	};

	useEffect(() => {
		fetchNewProducts().then(setNewProducts);
	}, []);

	return (
		<div className='mt-20'>
			<p className="text-[33px] font-medium">Shop The Latest</p>
			<div className='flex gap-10'>
				<div className="w-64 shrink-0">
					<div className="mt-[38px] space-y-6">
						<div className="relative">
							<input
								type="text"
								placeholder="Search..."
								className="w-full border-b border-[#D8D8D8] py-2 text-sm focus:outline-none focus:ring-0"
							/>
							<span className="absolute right-3 top-2.5 text-[gray-500]">
								<img src={searchIcon} className="size-[18px]" />
							</span>
						</div>

						<div className="space-y-4 ">
							<select className="h-[53px] w-full appearance-none rounded-md border-[#D8D8D8] bg-[white] bg-[url('src/assets/shop/arrow.svg')] bg-right bg-no-repeat text-sm hover:border-[#D8D8D8] focus:border-[#D8D8D8] focus:outline-none focus:ring-0">
								<option>Shop By</option>
							</select>
							<select className="h-[53px] w-full appearance-none rounded-md border-[#D8D8D8] bg-[white] bg-[url('src/assets/shop/arrow.svg')] bg-right bg-no-repeat text-sm hover:border-[#D8D8D8] focus:border-[#D8D8D8] focus:outline-none focus:ring-0">
								<option>Sort By</option>
							</select>
						</div>

						<div>
							<input
								type="range"
								min="0"
								max="180"
								value={maxPrice}
								onChange={handleMaxPriceChange}
								className="w-full accent-[#8a8686cb]"
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

				<div className="flex-1">
					<div className="grid grid-cols-3 gap-5">
						{newProducts.map((product) => (
							<CardButton
								appearance='shop'
								key={product.productId}
								image={`https://storage.yandexcloud.net/jewelry/${product.images[0]}`}
								title={product.title}
								price={product.price.cost}
								currency={product.price.currency}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);

}
