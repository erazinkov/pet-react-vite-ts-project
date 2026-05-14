import styles from './Search.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';
import type { SearchProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search({className, isValid = true, ...props}, ref) {
	return (
		<input {...props} ref={ref} className={
			cn(
				styles['input'],
				className,
				{
					[styles['invalid']]: !isValid
				}
			)
		}/>
	);
});

export default Search;