import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { fetchNewProducts } from '../../api/products';

export function ProductPage() {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | null>(null);

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
			} catch (error) {
				console.error('Error loading product:', error);
				setProduct(null);
			}
		};

		loadProduct();
	}, [id]); 

	if (!id) {
		return <div>Product ID is missing in the URL.</div>;
	}

	if (!product) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>{product.title}</h1>
			<p>{product.description}</p>
			<p>Price: {product.price.cost} {product.price.currency}</p>
			{product.price.discount && (
				<p>Discount: {product.price.percent}% (New price: {product.price.costDiscount})</p>
			)}
			<div>
				<h3>Images:</h3>
				{product.images.map((image, index) => (
					<img key={index} src={image} alt={`Product ${index + 1}`} />
				))}
			</div>
		
		</div>
	);
}