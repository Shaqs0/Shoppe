import { ButtonHTMLAttributes } from 'react';


export interface CardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    appearence?: 'home' | 'shop'
}