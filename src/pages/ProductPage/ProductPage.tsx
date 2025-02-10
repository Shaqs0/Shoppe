import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { fetchNewProducts } from '../../api/products';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';

export function ProductPage() {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | null>(null);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [raiting, setRaiting] = useState<number | null>(null); 

	useEffect(() => {
		if (!id) {
			console.error('Product ID is undefined');
			return;
		}

		const loadProduct = async () => {
			try {
				const products = await fetchNewProducts();
				const foundProduct = products.find(p => p.productId === id);
				setProduct(foundProduct || null);

				if (foundProduct?.images.length) {
					setSelectedImage(foundProduct.images[0]);
				}

				if (foundProduct?.specifications[0].sku) {
					const response = await axios.get(
						`${PREFIX}Rating/rating?SKU=${foundProduct.specifications[0].sku}`
					);
					setRaiting(response.data.likes);
				}
			} catch (error) {
				console.error('Error loading product:', error);
				setProduct(null);
			}
		};

		loadProduct();
	}, [id]);

	if (!product) {
		return <div>Loading...</div>;
	}

	const renderStars = (rating: number) => {
		const maxStars = 5;
		return (
			<div className="flex text-2xl text-[yellow-500]">
				{[...Array(maxStars)].map((_, i) => (
					<span key={i}>{i < rating ? '★' : '☆'}</span>
				))}
			</div>
		);
	};

	return (
		<div className="mt-36 flex p-4">
			<div className="flex flex-col gap-10">
				{product.images.map((image) => (
					<img
						key={image}
						src={`https://storage.yandexcloud.net/jewelry/${image}`}
						alt="Product thumbnail"
						className={`size-[120px] cursor-pointer rounded-lg object-cover ${
							selectedImage === image ? 'size-[120px]' : ''
						}`}
						onClick={() => setSelectedImage(image)}
					/>
				))}
			</div>

			<div className="ml-10 flex flex-1 justify-center">
				{selectedImage && (
					<img
						src={`https://storage.yandexcloud.net/jewelry/${selectedImage}`}
						alt="Selected product"
						className="h-[600px] w-[540px] rounded-lg bg-[lightgray] bg-center object-cover"
					/>
				)}
			</div>

			<div className="ml-6 mr-[-90px] flex-1 flex-col">
				<h1 className="text-[26px]">{product.title}</h1>
				
				{raiting !== null && <div className="mt-2">{renderStars(raiting)}</div>}

				<p className="mt-[23px] text-xl font-medium text-[#A18A68]">
					{product.price.currency} {product.price.cost}
				</p>
				<p className="text-[gray-700]">{product.description}</p>
				{product.price.discount && (
					<p className="text-[red-500]">
						Скидка: {product.price.percent}% (Новая цена: {product.price.costDiscount})
					</p>
				)}
			</div>
		</div>
	);
}
