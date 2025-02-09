import axios from 'axios';
import { PREFIX } from '../helpers/API';
import { Product } from '../interfaces/product.interface';

export async function fetchNewProducts(): Promise<Product[]> {
	try {
		const response = await axios.get(
			`${PREFIX}Product/get-new-product?languageCode=RU%2Fru`
		);
		console.log('Server response:', response.data);

		return response.data;
		
	} catch (error) {
		console.error('Error fetching new products:', error);
		return [];
	}
}
