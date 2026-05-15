import type { CatalogListProps } from './CatalogList.props';
import styles from './CatalogList.module.css';
import Card from '../../../components/Card/Card';

export function CatalogList( { products }: CatalogListProps) {
	return <div className={styles['list']}>
		{products.map(p => (
			<Card
				key={p.id}
				id={p.id}
				title={p.title}
				description={p.description}
				thumbnail={p.thumbnail}
				price={p.price}
				rating={p.rating}
			/>
		))}</div>;
}