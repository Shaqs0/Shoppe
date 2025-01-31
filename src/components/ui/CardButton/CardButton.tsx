export function CardButton({ image, title, price }: { image: string, title: string, price: number }) {
	return (
		<div className="cursor-pointer overflow-hidden rounded-lg">
			<img 
				src={image} 
				alt={title} 
				className="h-[380px] w-[377px] rounded-lg object-cover" 
			/>
			<div className="p-4">
				<p className="text-xl text-[black]">{title}</p>
				<p className="text-xl font-medium text-[#A18A68]">{price} ₽</p>
			</div>
		</div>
	);
}
