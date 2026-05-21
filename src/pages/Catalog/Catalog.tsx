import Heading from '../../components/Heading/Heading';
import Search from '../../components/Search/Search';

import styles from './Catalog.module.css';

import { PREFIX } from '../../api/api';
import type { Products } from '../../interfaces/Products.interface';

import { useEffect, useState, type ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { CatalogList } from './CatalogList/CatalogList';
import { Spinner } from '../../components/Spinner/Spinner';

export function Catalog() {
	const [products, setProducts] = useState<Products>({ products: [], total: 0, skip: 0, limit: 30 });
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const [filter, setFilter] = useState<string>();

	useEffect(() => {
		getProducts(filter);
	}, [filter]);	

	const getProducts = async (filter?: string) => {
		setIsLoading(true);
		// await new Promise<void>((resolve) => {
		// 	setTimeout(() => {
		// 		resolve();
		// 	}, 2000);
		// });
		const url = filter ? `${PREFIX}/products/search` : `${PREFIX}/products`;
		try {
			const { data } = await axios.get<Products>(url, {
				params: {
					q: filter,
					limit: 30,
					skip: 0
				}
			});
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
	};

	const changeFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return <>
		<div className={styles['head']}>
			<Heading>Каталог</Heading>
			<Search onChange={changeFilter} name='search'></Search>
		</div>
		<div className={styles['products']}>
			{
				!isLoading && products.products.length > 0 && <CatalogList products={products.products} />
			}
			{
				!isLoading && products.products.length === 0 && <>Товары не найдены</>
			}
			{
				isLoading && <Spinner />
			}
			{
				error && <>{error}</>
			}
		</div>
	</>;
}

export default Catalog;