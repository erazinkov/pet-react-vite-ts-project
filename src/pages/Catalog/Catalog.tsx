import Card from '../../components/Card/Card';
import Heading from '../../components/Heading/Heading';
import Search from '../../components/Search/Search';

import styles from './Catalog.module.css';

import { PREFIX } from '../../api/api';
import type { Products } from '../../interfaces/Products.interface';

import { useEffect, useState } from 'react';

export function Catalog() {
	const [products, setProducts] = useState<Products>({ products: [], total: 0, skip: 0, limit: 30 });

	const getProducts = async () => {
		try {
			const response = await fetch(`${PREFIX}/products`);
			if (!response.ok) {
				console.error('Failed to fetch products');
				return;
			}
			const data = await response.json() as Products;
			setProducts(data);
		} catch (error) {
			console.error('Error fetching products:', error);
			return;
		}
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
				products.products.map(p => (
					<Card
						key={p.id}
						id={p.id}
						title={p.title}
						description={p.description}
						thumbnail={p.thumbnail}
						price={p.price}
						rating={p.rating}
					/>
				))
			}
		</div>
	</>;
}
