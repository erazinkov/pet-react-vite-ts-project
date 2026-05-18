import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import type { SubmitEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../api/api';
import { useState } from 'react';

export type LoginFormData = {
	username: {
		value: string;
	},
	password: {
		value: string;
	}
};

export function Login() {
	const [error, setError] = useState<string | null>(null);

	const sendLoginRequest = async (username: string, password: string) => {
		try {
			const { data } = await axios.post(`${PREFIX}/auth/login`, { username, password });
			console.log('Ответ от сервера:', data);
		} catch (error) {
			if (error instanceof AxiosError) {
				setError(error.response?.data.message);
				// setError(error.message);
			}
		}
	};

	const onSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		setError(null);
		const data = e.target as typeof e.target & LoginFormData;
		const { username, password } = data;
		await sendLoginRequest(username.value, password.value);
	};
	return <div className={styles['login']}>
		<Heading>Вход</Heading>
		{error && <div className={styles['error']}>{error}</div>}
		<form className={styles['form']} onSubmit={onSubmit}>
			<div className={styles['form-field']}>
				<label htmlFor='username'>Username</label>
				<Input type="text" name="username" id="username" placeholder='Username'/>
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