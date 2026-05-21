import { useSelector } from 'react-redux';
import Heading from '../../components/Heading/Heading';
import styles from './Cart.module.css';
import type { RootState } from '../../store/store';
import CartItem from './CartItem/CartItem';
import type { Product } from '../../interfaces/Product.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX } from '../../api/api';


export function Cart() {
	const [cartItems, setCartItems] = useState<Product[]>([]);
	const items = useSelector((state: RootState) => state.cart.items);

	const getProduct = async (id: number) => {
		const product = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return product;
	};

	const getAllProducts = async () => {
		const products = await Promise.all(items.map(item => getProduct(item.id)));
		setCartItems(products.map(product => product.data));
	};

	useEffect(() => {
		getAllProducts();
	}, [items]);

	return (<>
		<Heading>Корзина</Heading>
		<div className={styles['items']}>
			{items.map(item => {
				const product = cartItems.find(product => product.id === item.id);
				if (product) {
					return <CartItem key={item.id} {...product} count={item.count}/>;
				}
			})}
		</div>
	</>);
}