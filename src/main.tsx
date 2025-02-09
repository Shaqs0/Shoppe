import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { BlogPage, HomePage, OurStoryPage, ProductPage, ShopPage } from './pages';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		children: [
			{
				path: '/',
				element: <HomePage/>
			},
			{
				path: '/shop',
				element: <ShopPage/>
			},
			{
				path: '/blog',
				element: <BlogPage/>
			},
			{
				path: '/story',
				element: <OurStoryPage/>
			},
			{
				path: '/product/:id',
				element: <ProductPage/>
			}
		]
	}
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router}/>
	</StrictMode>,
);
