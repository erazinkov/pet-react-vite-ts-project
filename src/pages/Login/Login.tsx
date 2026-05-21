import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import type { SubmitEvent } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { login, userActions } from '../../store/user.slice';
import type { RootState } from '../../store/store';

export type LoginFormData = {
	username: {
		value: string;
	},
	password: {
		value: string;
	}
};

export function Login() {
	// const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const {accessToken , loginErrorMessage} = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (accessToken) {
			navigate('/', { replace: true });
		}
	}, [accessToken, navigate]);

	const sendLoginRequest = async (username: string, password: string) => {
		dispatch(login({ username, password }));
	};

	const onSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginErrorMessage());
		const data = e.target as typeof e.target & LoginFormData;
		const { username, password } = data;
		await sendLoginRequest(username.value, password.value);
	};
	return <div className={styles['login']}>
		<Heading>Вход</Heading>
		{loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
		<form className={styles['form']} onSubmit={onSubmit}>
			<div className={styles['form-field']}>
				<label htmlFor='username'>Username</label>
				<Input defaultValue={'emilys'} type="text" name="username" id="username" placeholder='Username' autoComplete="username"/>
			</div>
			<div className={styles['form-field']}>
				<label htmlFor='password'>Password</label>
				<Input defaultValue={'emilyspass'} type="password" name="password" id="password" placeholder='Password'/>
			</div>
			<Button>Вход</Button>
			<div>Нет аккаунта?</div>
			<div>
				<Link to="/auth/register">Регистрация</Link>
			</div>
		</form>
	</div>;
}