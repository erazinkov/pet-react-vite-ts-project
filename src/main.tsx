import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { Catalog } from './pages/Catalog/Catalog.tsx';
import { Cart } from './pages/Cart/Cart';
import { Error } from './pages/Error/Error';
import { Product } from './pages/Product/Product.tsx';
import { Layout } from './layout/Layout/Layout.tsx';
import axios from 'axios';
import { PREFIX } from './api/api.ts';
import { lazy } from 'react';

const Catalog = lazy(() => import('./pages/Catalog/Catalog.tsx'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Suspense fallback={<>Загрузка...</>}>
					<Catalog />
				</Suspense>
			},
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: '/products/:id',
				element: <Product />,
				errorElement: <Error />,
				loader: async ({ params }) => {
					return {
						data: new Promise((resolve, reject) => {
							setTimeout(() => {
								axios.get(`${PREFIX}/products/${params.id}`).then(res => resolve(res.data)).catch(e => reject(e));
							}, 1000);
						})
					};
				}
			}
		]
	},
	{
		path: '*',
		element: <Error />
	}
]);
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
