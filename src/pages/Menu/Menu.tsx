import Card from '../../components/Card/Card';
import Heading from '../../components/Heading/Heading';
import Search from '../../components/Search/Search';

import styles from './Menu.module.css';

export function Menu() {
	return <>
		<div className={styles['head']}>
			<Heading>Меню</Heading>
			<Search></Search>
		</div>
		<Card
			id={1}
			title='Наслаждение'
			description='Описание'
			image=''
			price={999}
			rating={4.5}
		></Card>
	</>;
}