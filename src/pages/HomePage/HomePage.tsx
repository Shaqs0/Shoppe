import { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { CardButton } from '../../components';
import { Product } from '../../interfaces/product.interface';
import { fetchNewProducts } from '../../api/products';

export function HomePage() {
	const [sliderProducts, setSliderProducts] = useState<Product[]>([]);
	const [newProducts, setNewProducts] = useState<Product[]>([]);

	useEffect(() => {
		const fetchSliderData = async () => {
			try {
				const response = await axios.get(
					`${PREFIX}Product/get-slider-info?languageCode=RU%2Fru`
				);
				setSliderProducts(response.data);
				console.log('Slider products:', response.data);
			} catch (error) {
				console.error('Error fetching slider data:', error);
			}
		};
		fetchSliderData();
	}, []);
	

	useEffect(() => {
		fetchNewProducts().then(setNewProducts);
	}, []);



	return (
		<div className="">
			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				autoplay={{
					delay: 4000,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				modules={[Autoplay, Pagination]}
				className="custom-swiper"
			>

				{sliderProducts.map((product) => (
					<SwiperSlide key={product.productId}>
						<div className="relative mt-4 h-[646px] rounded-2xl">
							{product.productImageId && (
								<img
									src={`https://storage.yandexcloud.net/jewelry/${product.productImageId[0]}`}
									alt={product.title}
									className="size-full rounded-2xl object-cover"
								/>
							)}

							{product.title && (
								<div className="absolute bottom-10 left-4">
									<div className='flex flex-col text-[white]'>
										<span className='text-[33px] font-medium'> {product.title} </span>
										<div className='mt-4 flex items-center justify-start text-[26px]'> 
											<span>{product.price.currency}</span>
											<span className='ml-1 gap-2'>{product.price.cost}</span>
										</div>
										
										
									</div>
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
				{newProducts && newProducts.length > 0 && newProducts.map((product) => (
					<CardButton
						appearance="home"
						key={product.productId}
						image={`https://storage.yandexcloud.net/jewelry/${product.images[0]}`}
						title={product.title}
						price={product.price.cost}
						currency={product.price.currency}
					/>
				))}
			</div>
		</div>
	);
}