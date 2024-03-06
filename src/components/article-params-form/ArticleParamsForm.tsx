import React, { Dispatch, SetStateAction, useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import { useCloseModal } from 'src/components/article-params-form/hooks/useCloseModal';

interface ArticleParamsFormProps {
	setArticleParams: Dispatch<
		SetStateAction<{
			fontFamilyOption: OptionType;
			fontColor: OptionType;
			backgroundColor: OptionType;
			contentWidth: OptionType;
			fontSizeOption: OptionType;
		}>
	>;
}

export const ArticleParamsForm = ({
	setArticleParams,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [FormState, setFormState] = useState(defaultArticleState);
	const formRef = useRef<HTMLFormElement | null>(null);

	//клик по оверлею и нажатие на Escape закрывают форму
	useCloseModal({
		isOpen: isFormOpen,
		onClose: () => setIsFormOpen(false),
		rootRef: formRef,
	});

	//Открытие и закрытие кнопкой
	const handleArrowButtonClick = (isOpen: boolean) => {
		setIsFormOpen(isOpen);
	};

	//Обновление данных страницы, с учетом указанных значений в форме, при ее submit
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleParams(FormState);
		setIsFormOpen(false);
	};

	//Сброс до дефолтных значений
	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleParams(defaultArticleState);
		setIsFormOpen(false);
	};

	return (
		<div>
			<ArrowButton isOpen={isFormOpen} onClick={handleArrowButtonClick} />
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.containerOpen]: isFormOpen,
				})}>
				<form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase>
						{'Задайте параметры'}
					</Text>
					<Select
						selected={FormState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(fontFamily) =>
							setFormState({ ...FormState, fontFamilyOption: fontFamily })
						}
						title='шрифт'
					/>
					<RadioGroup
						name=''
						options={fontSizeOptions}
						selected={FormState.fontSizeOption}
						onChange={(fontSize) =>
							setFormState({ ...FormState, fontSizeOption: fontSize })
						}
						title='размер шрифта'
					/>
					<Select
						selected={FormState.fontColor}
						options={fontColors}
						onChange={(fontColor) =>
							setFormState({ ...FormState, fontColor: fontColor })
						}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={FormState.backgroundColor}
						options={backgroundColors}
						onChange={(background) =>
							setFormState({ ...FormState, backgroundColor: background })
						}
						title='цвет фона'
					/>
					<Select
						selected={FormState.contentWidth}
						options={contentWidthArr}
						onChange={(content) =>
							setFormState({ ...FormState, contentWidth: content })
						}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' onClick={handleReset} type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
