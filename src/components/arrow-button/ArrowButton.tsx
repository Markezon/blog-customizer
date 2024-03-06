import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/* Функция для обработки открытия/закрытия формы */
export type OnClick = (isOpen: boolean) => void;

export const ArrowButton = ({
	isOpen,
	onClick,
}: {
	isOpen: boolean;
	onClick: OnClick;
}) => {
	const handleClick = () => {
		onClick(!isOpen);
	};

	return (
		/*  role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx({
				[styles.container]: true,
				[styles.containerOpen]: isOpen,
			})}
			onClick={handleClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx({
					[styles.arrow]: true,
					[styles.arrowOpen]: isOpen,
				})}
			/>
		</div>
	);
};
