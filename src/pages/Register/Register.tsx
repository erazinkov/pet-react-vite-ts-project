import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Register.module.css';
import type { SubmitEvent } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { register, userActions } from '../../store/user.slice';
import type { RootState } from '../../store/store';

export type RegisterFormData = {
	username: {
		value: string;
	},
    email: {
		value: string;
	},
	password1: {
		value: string;
	},
	password2: {
		value: string;
	}
};

export function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const {accessToken , loginErrorMessage} = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (accessToken) {
			navigate('/', { replace: true });
		}
	}, [accessToken, navigate]);

	const sendRegisterRequest = async (username: string, password: string) => {
		dispatch(register({ username, password }));
	};

	const onSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginErrorMessage());
		const data = e.target as typeof e.target & RegisterFormData;
		const { username, email, password1, password2  } = data;
		if (password1.value !== password2.value) {
			console.error('Passwords do not match');
		}
		if (email.value.length === 0 || !email.value.includes('@')) {
			console.error('Invalid email format');
		}
		await sendRegisterRequest(username.value, password1.value);
	};
	return <div className={styles['login']}>
		<Heading>Регистрация</Heading>
		{loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
		<form className={styles['form']} onSubmit={onSubmit}>
			<div className={styles['form-field']}>
				<label htmlFor='username'>Username</label>
				<Input readOnly defaultValue={'emilys'} type="text" name="username" id="username" placeholder='Username' autoComplete="username"/>
			</div>
			<div className={styles['form-field']}>
				<label htmlFor='email'>Email</label>
				<Input readOnly defaultValue={'emily.johnson@x.dummyjson.com'} type="email" name="email" id="email" placeholder='Email' autoComplete="email"/>
			</div>
			<div className={styles['form-field']}>
				<label htmlFor='password'>Password</label>
				<Input readOnly defaultValue={'emilyspass'} type="text" name="password1" id="password1" placeholder='Password1'/>
			</div>
			<div className={styles['form-field']}>
				<label htmlFor='password'>Confirm Password</label>
				<Input readOnly defaultValue={'emilyspass'} type="text" name="password2" id="password2" placeholder='Password2'/>
			</div>
			<Button>Регистрация</Button>
			<div>Уже есть аккаунт?</div>
			<div>
				<Link to="/auth/login">Вход</Link>
			</div>
		</form>
	</div>;
}