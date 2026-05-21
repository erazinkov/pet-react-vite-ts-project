import styles from './CartItem.module.css';
import type { CartItemProps } from './CartItem.props';
import priceFormatter from '../../../utils/utils';
import type { MouseEvent } from 'react';
import type { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart.slice';

import cn from 'classnames';

function CartItem(props: CartItemProps) {
	const dispatch = useDispatch<AppDispatch>();
    
	const decrease = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.remove(props.id));
	};
	const deleteItem = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.delete(props.id));
	};

	const increase = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.add(props.id));
	};
	return  (<div className={styles['item']} >
		<div className={styles['item-image']} style={{
			backgroundImage: `url('${props.thumbnail}')`,
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			minWidth: '5rem',
			minHeight: '5rem'
		}}></div>
		<div className={styles['item-info']}>
			<div className={styles['title']}>{props.title}</div>
			<div className={styles['price']}>{priceFormatter.format(props.price)}</div>
		</div>
		<div className={styles['item-count']}>
			<button className={cn(styles['button'], { [styles['button_disabled']]: props.count < 1 })} onClick={decrease}>-</button>
			<div className={styles['count']}>{props.count}</div>
			<button className={styles['button']} onClick={increase}>+</button>
			<button className={styles['button']} onClick={deleteItem}>X</button>
		</div>
		
	</div>);
}

export default CartItem;