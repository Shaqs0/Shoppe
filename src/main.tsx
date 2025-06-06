import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { BlogPage, HomePage, OurStoryPage, ProductPage, ProfilePage, ShopPage, SignPage } from './pages';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ProtectedRoute } from './components';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <HomePage />
			},
			{
				path: '/shop',
				element: <ShopPage />
			},
			{
				path: '/blog',
				element: <BlogPage />
			},
			{
				path: '/story',
				element: <OurStoryPage />
			},
			{
				path: '/product/:id',
				element: <ProductPage />
			},
			{
				path: '/profile',
				element: <ProtectedRoute />, 
				children: [
					{
						path: '',
						element: <ProfilePage /> 
					}
				]
			},
			{
				path: '/auth/sign',
				element: <SignPage />
			}
		]
	}
]);

  

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}/>
		</Provider>
	</StrictMode>,
);
