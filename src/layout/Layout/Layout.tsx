import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import type { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';

export function Layout() {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const profile = useSelector((state: RootState) => state.user.profile);
	const itemsCount = useSelector((state: RootState) => state.cart.items.reduce((total, item) => total + item.count, 0));

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	const logOut = () => {
		dispatch(userActions.logOut());
		navigate('/auth/login', { replace: true });
	};

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
				<img className={styles['user-avatar']} src={profile?.image}></img>
				<div className={styles['user-name']}>{profile?.firstName + ' ' + profile?.lastName}</div>
				<div className={styles['user-email']}>{profile?.email}</div>
			</div>
			<div className={styles['catalog']}>
				<NavLink to="/" className={({ isActive }) => cn(styles['catalog-item'], {
					[styles['catalog-item_active']]: isActive
				})}>
					<img src='/catalog.svg' alt='Иконка Каталог' className={styles['catalog-icon']} />
					<span>Каталог</span>
				</NavLink>
				<NavLink to="/cart" className={({ isActive }) => cn(styles['catalog-item'], {
					[styles['catalog-item_active']]: isActive
				})}>
					<img src='/cart.svg' alt='Иконка Корзина' className={styles['catalog-icon']} />
					<span>Корзина</span>{itemsCount}
				</NavLink>
				<Button className={styles['exit']} onClick={logOut}>Выйти</Button>
			</div>
		</div>
		<div className={styles['main']}>
			<Outlet />
		</div>
	</div>;
}