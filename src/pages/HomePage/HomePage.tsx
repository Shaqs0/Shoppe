import { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { Swiper, SwiperSlide } from 'swiper/react';

export function HomePage() {
	const [products, setProducts] = useState<any[]>([]);

	useEffect(() => {
		const fetchSliderData = async () => {
			try {
				const response = await axios.get(
					`${PREFIX}Product/get-slider-info?languageCode=RU%2Fru&platform=desktop`
				);
				setProducts(response.data.products);
				console.log(response.data);
			} catch (error) {
				console.error('Error fetching slider data:', error);
			}
		};
		fetchSliderData();
	}, []);

	const isLoopEnabled = products.length > 1;

	return (
		<div className="mx-auto w-full max-w-[1248px]">
			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				loop={isLoopEnabled}
				autoplay={{ delay: 3000 }}
			>
				{products.map((product) => (
					<SwiperSlide key={product.productId}>
						<div className="relative">
							{product.productImageId && (
								<img
									src={`https://storage.yandexcloud.net/jewelry/${product.productImageId}`}
									alt={product.title}
									className="h-auto w-full"
								/>
							)}
							{product.title && (
								<div className="">
									{product.title}
								</div>
							)}
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
