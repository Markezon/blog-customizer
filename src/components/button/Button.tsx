import { Text } from 'components/text';

import styles from './Button.module.scss';
import clsx from 'clsx';

export const Button = ({
	title,
	onClick,
	type,
}: {
	title: string;
	onClick?: () => void;
	type?: 'submit' | 'reset';
}) => {
	return (
		<button
			className={clsx({
				[styles.button]: true,
				[styles.buttonSubmit]: type === 'submit',
				[styles.buttonReset]: type === 'reset',
			})}
			type={type}
			onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
