import {useRouteError} from "react-router-dom";
import type {AxiosError} from "axios";
import styles from './Error.module.css';

export function Error() {
	const error = useRouteError() as AxiosError;
	return (
		<div className={styles['error']}>
			<span className={styles['error-status']}>{`${error.status}`}</span>
			<span className={styles['error-code']}>{`${error.code}`}</span>
		</div>
	);
}