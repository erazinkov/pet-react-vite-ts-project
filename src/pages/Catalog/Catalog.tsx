// import Card from '../../components/Card/Card';
import Heading from '../../components/Heading/Heading';
import Search from '../../components/Search/Search';

import styles from './Catalog.module.css';

import { PREFIX } from '../../api/api';
import type { Products } from '../../interfaces/Products.interface';

import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { CatalogList } from './CatalogList/CatalogList';

export function Catalog() {
	const [products, setProducts] = useState<Products>({ products: [], total: 0, skip: 0, limit: 30 });
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const getProducts = async () => {
		setIsLoading(true);
		await new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, 2000);
		});
		
		try {
			const { data } = await axios.get<Products>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			if (error instanceof AxiosError) {
				setError(error.message);
			}
			setIsLoading(false);
			return;
		}
		// try {
		// 	const response = await fetch(`${PREFIX}/products`);
		// 	if (!response.ok) {
		// 		console.error('Failed to fetch products');
		// 		return;
		// 	}
		// 	const data = await response.json() as Products;
		// 	setProducts(data);
		// } catch (error) {
		// 	console.error('Error fetching products:', error);
		// 	return;
		// }
	};

	useEffect(() => {
		getProducts();
	}, []);

	return <>
		<div className={styles['head']}>
			<Heading>Каталог</Heading>
			<Search></Search>
		</div>
		<div className={styles['products']}>
			{
				!isLoading && <CatalogList products={products.products} />
			}
			{
				isLoading && <>Загрузка...</>
			}
			{
				error && <>{error}</>
			}
		</div>
	</>;
}

export default Catalog;