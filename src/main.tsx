import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Catalog } from './pages/Catalog/Catalog.tsx';
import { Cart } from './pages/Cart/Cart';
import { Error } from './pages/Error/Error';
import { Product } from './pages/Product/Product.tsx';
import { Layout } from './layout/Layout/Layout.tsx';
import axios from 'axios';
import { PREFIX } from './api/api.ts';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';
import { Auth } from './api/auth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Auth><Layout /></Auth>,
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
								axios.get(`${PREFIX}/products/${params.id}`).then(res => resolve(res.data)).catch(e => {
									reject(e);
								});
							}, 1000);
						})
					};
				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login/>
			},
			{
				path: 'register',
				element: <Register/>
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
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
