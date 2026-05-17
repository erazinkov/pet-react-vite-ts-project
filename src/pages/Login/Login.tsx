import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import type { SubmitEvent } from 'react';

export function Login() {
	const onSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		// const formData: FormData = new FormData(e.target);
		// const data = Object.fromEntries(formData.entries());
		console.log(e);
	};
	return <div className={styles['login']}>
		<Heading>Вход</Heading>
		<form className={styles['form']} onSubmit={onSubmit}>
			<div className={styles['form-field']}>
				<label htmlFor='email'>Email</label>
				<Input type="email" name="email" id="email" placeholder='Email'/>
			</div>
			<div className={styles['form-field']}>
				<label htmlFor='email'>Password</label>
				<Input type="password" name="password" id="password" placeholder='Password'/>
			</div>
			<Button>Вход</Button>
			<div>Нет аккаунта?</div>
			<div>
				<Link to="/auth/register">Регистрация</Link>
			</div>
		</form>
	</div>;
}