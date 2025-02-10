import { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: 'ViewProduct' | 'addToCart';
}

export function Button({
	title,
	appearance,
	onClick, 
}: ButtonProps) {
	return (
		<Link to={''} className="block">
			<button
				className={`${
					appearance === 'addToCart'
						? 'h-[53px] w-[360px] rounded-[4px] border'
						: 'h-[380px] w-[377px]'
				}`}
				onClick={onClick} 
			>
				<p className={`${appearance === 'addToCart' ? 'font-bold' : ''}`}>
					{title}
				</p>
			</button>
		</Link>
	);
}
