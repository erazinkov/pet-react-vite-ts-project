import styles from './CatalogItem.module.css';
import type { CatalogItemProps } from './CatalogItem.props';
import { Link } from 'react-router-dom';
import priceFormatter from '../../../utils/utils';
import type { MouseEvent } from 'react';
import type { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart.slice';

function CatalogItem(props: CatalogItemProps) {
	const dispatch = useDispatch<AppDispatch>();
	
	const add = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.add(props.id));
	};
	return  (
		<Link to={`/products/${props.id}`} className={styles['link']}>
			<div className={styles['item']} >
				<div className={styles['header']} style={{
					backgroundImage: `url('${props.thumbnail}')`,
					backgroundPosition: 'center',
					backgroundSize: 'contain',
					backgroundRepeat: 'no-repeat'
				}}>
					<div className={styles['price']}>{priceFormatter.format(props.price)}</div>
					<button className={styles['add']} onClick={add}>+</button>
					<div className={styles['rating']}>{props.rating}</div>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>{props.title}</div>
					<div className={styles['description']}>{props.description}</div>
				</div>
			</div></Link>);
}

export default CatalogItem;