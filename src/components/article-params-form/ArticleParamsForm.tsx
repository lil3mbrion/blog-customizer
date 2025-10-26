import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	fontColors,
	contentWidthArr,
	OptionType,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(articleState);
	const sideBar = useRef<HTMLElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: sideBar,
		onChange: setIsOpen,
	});

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleFontFamilyChange = (option: OptionType) => {
		setFormState((previous) => ({ ...previous, fontFamilyOption: option }));
	};

	const handleFontSizeChange = (option: OptionType) => {
		setFormState((previous) => ({ ...previous, fontSizeOption: option }));
	};

	const handleFontColorChange = (option: OptionType) => {
		setFormState((previous) => ({ ...previous, fontColor: option }));
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setFormState((previous) => ({ ...previous, backgroundColor: option }));
	};

	const handleContentWidthChange = (option: OptionType) => {
		setFormState((previous) => ({ ...previous, contentWidth: option }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				ref={sideBar}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.header}>
						<h2 className={styles.title}>Задайте параметры</h2>
					</div>
					<div className={styles.formElement}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={handleFontFamilyChange}
						/>
					</div>
					<div className={styles.formElement}>
						<RadioGroup
							name='Размер шрифта'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleFontSizeChange}
						/>
					</div>
					<div className={styles.formElementSpecial}>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={formState.fontColor}
							onChange={handleFontColorChange}
						/>
					</div>
					<div className={styles.formElement}>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={handleBackgroundColorChange}
						/>
					</div>
					<div className={styles.formElement}>
						<Select
							title='Ширина контейнера'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={handleContentWidthChange}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
