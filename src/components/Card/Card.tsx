import type { CardProps } from './Card.props';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import priceFormatter from '../../utils/utils';

function Card(props: CardProps) {

	return  (
		<Link to={`/products/${props.id}`} className={styles['link']}>
			<div className={styles['card']} >
				<div className={styles['header']} style={{
					backgroundImage: `url('${props.thumbnail}')`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat'
				}}>
					<div className={styles['price']}>{priceFormatter.format(props.price)}</div>
					<button className={styles['add']}>+</button>
					<div className={styles['rating']}>{props.rating}</div>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>{props.title}</div>
					<div className={styles['description']}>{props.description}</div>
				</div>
			</div></Link>);
}

export default Card;