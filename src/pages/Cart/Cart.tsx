import { useSelector } from 'react-redux';
import Heading from '../../components/Heading/Heading';
import styles from './Cart.module.css';
import type { RootState } from '../../store/store';


export function Cart() {
	const items = useSelector((state: RootState) => state.cart.items);
	return (<>
		<Heading>Корзина</Heading>
	</>);
}