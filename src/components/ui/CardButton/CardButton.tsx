export function CardButton({ image, title, price, currency }: { image: string, title: string, price: number, currency:string }) {
	return (
		<div className="flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg">
			<img 
				src={image} 
				alt={title} 
				className="flex h-[380px] w-[377px] rounded-lg object-cover" 
			/>
			<div className="ml-4 mt-6 flex w-full flex-col items-start justify-start gap-y-2">
				<p className="text-xl text-[black]">{title}</p>
				<p className="text-xl font-medium text-[#A18A68]">{price} {currency}</p>
			</div>
		</div>
	);
}
