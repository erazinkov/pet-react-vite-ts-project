import { Await, useLoaderData } from 'react-router-dom';
import type { Product } from '../../interfaces/Product.interface';
import { Suspense } from 'react';
import priceFormatter from '../../utils/utils';
import { Spinner } from '../../components/Spinner/Spinner';
export function Product() {
	const { data } = useLoaderData() as { data: Promise<Product> };

	return <Suspense fallback={<Spinner />}>
		<Await resolve={data}>
			{
				(product) => {
					return <>
						<h1>{product.title}</h1>
						<img src={product.thumbnail} alt={product.title} />
						<p>{product.description}</p>
						<p>Price: {priceFormatter.format(product.price)}</p>
					</>;
				}
			}
		</Await>
	</Suspense>;
}