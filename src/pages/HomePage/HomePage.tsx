import { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardButton } from '../../components';

export function HomePage() {
	const [sliderProducts, setSliderProducts] = useState<any[]>([]);
	const [newProducts, setNewProducts] = useState<any[]>([]);

	useEffect(() => {
		const fetchSliderData = async () => {
			try {
				const response = await axios.get(
					`${PREFIX}Product/get-slider-info?languageCode=RU%2Fru&platform=desktop`
				);
				setSliderProducts(response.data.products);
				console.log('Slider products:', response.data);
			} catch (error) {
				console.error('Error fetching slider data:', error);
			}
		};
		fetchSliderData();
	}, []);


	useEffect(() => {
		const fetchNewProducts = async () => {
			try {
				const response = await axios.get(
					`${PREFIX}Product/get-new-product?languageCode=RU%2Fru&platform=desktop`
				);
				setNewProducts(response.data.products);
				console.log('New products:', response.data);
			} catch (error) {
				console.error('Error fetching new products:', error);
			}
		};
		fetchNewProducts();
	}, []);

	const isSliderLoopEnabled = sliderProducts.length > 1;

	return (
		<div className="">
			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				loop={isSliderLoopEnabled}
				autoplay={{ delay: 3000 }}
			>
				{sliderProducts.map((product) => (
					<SwiperSlide key={product.productId}>
						<div className="relative mt-4 h-[646px] rounded-2xl">
							{product.productImageId && (
								<img
									src={`https://storage.yandexcloud.net/jewelry/${product.productImageId}`}
									alt={product.title}
									className="size-full rounded-2xl object-cover"
								/>
							)}
							{product.title && (
								<div className="absolute bottom-4 left-4 text-4xl font-bold">
									{product.title}
								</div>
							)}
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<div className='mt-16 flex items-center justify-between'>
				<p className='text-[33px] font-medium'>Shop The Latest</p>
				<p className='text-xl font-medium text-[#A18A68]'>View All</p>
			</div>

			<div className="mt-16 grid grid-cols-3 gap-6">
				{newProducts.map((product) => (
					<CardButton
						key={product.productId}
						image={`https://storage.yandexcloud.net/jewelry/${product.productImageId}`}
						title={product.title}
						price={product.price.cost}
					/>
				))}
			</div>
		</div>
	);
}
