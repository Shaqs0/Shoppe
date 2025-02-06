import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    appearance?: 'home' | 'shop';
}

export function CardButton({ 
	image, 
	title, 
	price, 
	currency,
	appearance = 'home'
}: { image: string, title: string, price: number, currency: string, appearance?: 'home' | 'shop' }) {
	return (
		<div className={`flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg 
			${appearance === 'shop' ? '' : ''}`}>
			<img 
				src={image} 
				alt={title} 
				className={` rounded-lg object-cover
				${appearance === 'shop' ? 'h-[300px] w-[299px]' : 'flex h-[380px] w-[377px]'}`}
			/>
			<div className="ml-4 mt-6 flex w-full flex-col items-start justify-start gap-y-2">
				<p className="text-xl text-[black]">{title}</p>
				<p className="text-xl font-medium text-[#A18A68]">{price} {currency}</p>
			</div>
		</div>
	);
}
