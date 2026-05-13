import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export function Layout() {
	return <div className={styles['layout']}>
		<div className={styles['sidebar']}>
			<div className={styles['logo']}>My App</div>
			<div className={styles['menu']}>
				<Link to="/" className={styles['menu-item']}>
					<img src='/menu.svg' alt='Menu icon' className={styles['menu-icon']} />
					<span>Menu</span>
				</Link>
				<Link to="/cart" className={styles['menu-item']}>
					<img src='/cart.svg' alt='Cart icon' className={styles['menu-icon']} />
					<span>Cart</span>
				</Link>
			</div>
		</div>
		<div>
			<Outlet />
		</div>
	</div>;
}