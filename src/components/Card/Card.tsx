import type { CardProps } from './Card.props';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

function Card(props: CardProps) {
	return  (
		<Link to={`/product/${props.id}`} className={styles['link']}>
			<div className={styles['card']} style={{backgroundImage: `url('${props.image}')`}}>
				<div className={styles['header']}>
					<div className={styles['price']}>{props.price}</div>
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