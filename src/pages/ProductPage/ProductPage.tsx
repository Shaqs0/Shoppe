import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { fetchNewProducts } from '../../api/products';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { fillStar, Star, Wishlist } from '../../assets';
import { Button, CardButton, ProductTabs } from '../../components';

export function ProductPage() {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | null>(null);
	const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [raiting, setRaiting] = useState<number | null>(null);
	const [quantity, setQuantity] = useState<number>(1);

	const fetchProductRating = async (sku: string) => {
		try {
			const response = await axios.get(`${PREFIX}Rating/rating?SKU=${sku}`);
			setRaiting(response.data.likes);
		} catch (error) {
			console.error('Error fetching rating data:', error);
		}
	};

	const fetchSimilarProducts = async (sku: string) => {
		try {
			const response = await axios.get(
				`${PREFIX}Product/recommend-products?targetSKU=${sku}&languageCode=EN%2Fen`
			);
			setSimilarProducts(response.data);
		} catch (error) {
			console.error('Error fetching similar products:', error);
		}
	};

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

				if (foundProduct) {
					if (foundProduct.images?.length) {
						setSelectedImage(foundProduct.images[0]);
					}

					const sku = foundProduct.specifications?.[0]?.sku;
					if (sku) {
						fetchProductRating(sku);
						fetchSimilarProducts(sku);
					}
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
			<div className="flex gap-[10px] text-2xl text-[black]">
				{[...Array(maxStars)].map((_, i) => (
					<span key={i}>{i < rating ? <img src={fillStar} /> : <img src={Star} />}</span>
				))}
			</div>
		);
	};

	const handleAddToCart = () => {
		console.log(`Добавлено в корзину: ${quantity} шт. товара с ID: ${product?.productId}`);
	};

	return (
		<div className="mt-24 flex flex-col items-center">
			<div className="flex w-full max-w-[1200px]">
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

				<div className="ml-6 flex flex-1 justify-center">
					{selectedImage && (
						<img
							src={`https://storage.yandexcloud.net/jewelry/${selectedImage}`}
							alt="Selected product"
							className="h-[600px] w-[540px] rounded-lg bg-[lightgray] bg-center object-cover"
						/>
					)}
				</div>

				<div className="ml-8 flex-1 flex-col">
					<h1 className="text-[26px]">{product.title}</h1>
					<p className="mt-[23px] text-xl font-medium text-[#A18A68]">
						{product.price.currency} {product.price.cost}
					</p>
					{raiting !== null && <div className="mt-[70px]">{renderStars(raiting)}</div>}
					<p className="mt-[22px] text-base text-[#707070]">{product.description}</p>

					<div className="mt-12 flex items-center gap-4">
						<div className="flex h-[53px] w-[102px] items-center justify-center rounded-[4px] bg-[#EFEFEF] p-1">
							<button 
								className="px-3 py-1 text-lg text-[#707070] hover:text-[black]"
								onClick={() => setQuantity(prev => Math.max(1, prev - 1))} 
							>
								-
							</button>
							<span className="flex w-[20px] items-center justify-center px-4 text-base">{quantity}</span>
							<button 
								className="px-3 py-1 text-lg text-[#707070] hover:text-[black]"
								onClick={() => setQuantity(prev => prev + 1)}
							>
								+
							</button>
						</div>
						<Button appearance="addToCart" title="ADD TO CART" onClick={handleAddToCart} />
					</div>
					<img src={Wishlist} className='mt-20 h-[20px] w-[240px] cursor-pointer'/>
					<div className='mt-[38px] flex flex-col'>
						<p>SKU: <span className='ml-4 text-[#707070]'>{product.specifications[0].sku}</span></p>
						<p>Categories: <span className='ml-4 text-[#707070]'>{product.categories}</span></p>
					</div>
				</div>
			</div>

			<div className="mt-24 w-full">
				<ProductTabs
					weight={product.baseAdditionalInformation.weight}
					inlay={product.baseAdditionalInformation.Inlay}
					material={product.baseAdditionalInformation.Material}
					insert={product.baseAdditionalInformation.Insert}
					approximateWeight={product.baseAdditionalInformation.ApproximateWeight}
				/>
			</div>

			<div className='mt-24 w-full'>
				<p className='text-[26px]'>Similar Items</p>
				<div className='mt-12 grid grid-cols-3 items-start gap-14'>
					{similarProducts && similarProducts.length > 0 && similarProducts.map((product) => (
						<CardButton
							appearance="home"
							key={product.productId}
							image={`https://storage.yandexcloud.net/jewelry/${product.images[0]}`}
							title={product.title}
							price={product.price.cost}
							currency={product.price.currency}
							productId={product.productId}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
