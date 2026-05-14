import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';

export function Layout() {

	return <div className={styles['layout']}>
		<div className={styles['sidebar']}>
			<div className={styles['logo']}>
				<span>pet</span>
				<img src={'/src/assets/react.svg'} alt="Логотип React" className={styles['logo-item']}/>
				<span>+</span>
				<img src={'/src/assets/vite.svg'} alt="Логотип Vite" className={styles['logo-item']}/>
				<span>+</span>
				<img src={'/src/assets/typescript.svg'} alt="Логотип Typescript" className={styles['logo-item']}/>
				<span>project</span>
			</div>
			<div className={styles['user']}>
				<div className={styles['user-name']}>Mr.Ho</div>
				<div className={styles['user-email']}>rmho@mail.com</div>
			</div>
			<div className={styles['menu']}>
				<NavLink to="/" className={({ isActive }) => cn(styles['menu-item'], {
					[styles['menu-item_active']]: isActive
				})}>
					<img src='/menu.svg' alt='Иконка Меню' className={styles['menu-icon']} />
					<span>Меню</span>
				</NavLink>
				<NavLink to="/cart" className={({ isActive }) => cn(styles['menu-item'], {
					[styles['menu-item_active']]: isActive
				})}>
					<img src='/cart.svg' alt='Иконка Корзина' className={styles['menu-icon']} />
					<span>Корзина</span>
				</NavLink>
			</div>
			<Button className={styles['exit']}>Выйти</Button>
		</div>
		<div className={styles['main']}>
			<Outlet />
		</div>
	</div>;
}