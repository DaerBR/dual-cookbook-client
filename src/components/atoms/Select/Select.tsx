import { useFormContext } from 'react-hook-form';
import {
	CSSProperties,
	ChangeEvent,
	FocusEvent,
	KeyboardEvent,
	useCallback,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { useAppTheme } from '../../../styles/hooks.ts';
import { InputLabel } from '../InputLabel';
import { processFieldValidationErrors } from '../../../utils/utils.tsx';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import { useCommonFieldStyles } from '../TextInput/hooks.ts';

interface Option {
	label: string;
	value: string;
}

interface SelectProps {
	customStyles?: CSSProperties;
	helperText?: string;
	id?: string;
	isDisabled?: boolean;
	isFullWidth?: boolean;
	isRequired?: boolean;
	label?: string;
	name: string;
	onBlur?: () => void;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	options: Option[];
	placeholder?: string;
	value: string;
}

// Builds a minimal change event so react-hook-form still receives select-shaped input.
const emitSelectChange = (name: string, value: string): ChangeEvent<HTMLSelectElement> =>
	({ target: { name, value } }) as ChangeEvent<HTMLSelectElement>;

export const Select = ({
	options,
	name,
	label,
	onChange,
	onBlur,
	value,
	id,
	customStyles,
	placeholder,
	isDisabled,
	isRequired,
	isFullWidth,
	helperText,
}: SelectProps) => {
	const theme = useAppTheme();
	const [isOpen, setIsOpen] = useState(false);

	// Pairs trigger aria-controls with the listbox element id
	const listboxId = useId();

	// Used for outside-click detection and blur containment
	const containerRef = useRef<HTMLDivElement>(null);

	// Focus target after choosing an option so keyboard users stay oriented
	const triggerRef = useRef<HTMLButtonElement>(null);

	// Row index used for keyboard highlight and visual hover sync.
	const [highlightedIndex, setHighlightedIndex] = useState(0);

	// Closes the list without changing the selected value.
	const handleSelectClose = useCallback(() => {
		setIsOpen(false);
	}, []);

	// Index of the current value in options, or 0 when value is empty or missing.
	const selectedIndex = Math.max(
		0,
		options.findIndex((o) => o.value === value),
	);

	// Aligns keyboard highlight with the controlled value when the list opens.
	const syncHighlightToValue = useCallback(() => {
		const idx = options.findIndex((o) => o.value === value);
		setHighlightedIndex(idx >= 0 ? idx : 0);
	}, [options, value]);

	// Closes the list on mousedown outside the widget (native blur order friendly).
	useEffect(() => {
		if (!isOpen) {
			return undefined;
		}

		// Document handler: ignore clicks inside the control, otherwise close.
		const onDocMouseDown = (e: MouseEvent) => {
			if (containerRef.current?.contains(e.target as Node)) {
				return;
			}

			handleSelectClose();
		};
		document.addEventListener('mousedown', onDocMouseDown);

		return () => {
			document.removeEventListener('mousedown', onDocMouseDown);
		};
	}, [isOpen, handleSelectClose]);

	// When opening, snap highlight to the option matching the current value.
	useEffect(() => {
		if (isOpen) syncHighlightToValue();
	}, [isOpen, syncHighlightToValue]);

	// After options length changes, clamp highlight so it never points past the end.
	useEffect(() => {
		if (options.length === 0) {
			return undefined;
		}

		setHighlightedIndex((i) => Math.min(i, options.length - 1));

		return undefined;
	}, [options.length]);

	const { fieldStyles, errorStyles } = useCommonFieldStyles({ isFullWidth });

	const helperTextStyles = {
		color: theme.colors.text.caption,
		marginTop: '4px',
	};

	const wrapperStyles = {
		position: 'relative' as const,
		width: fieldStyles.width,
		maxWidth: fieldStyles.maxWidth,
	};

	const selectInputStyles = {
		...fieldStyles,
		cursor: isDisabled ? ('not-allowed' as const) : ('pointer' as const),
		textAlign: 'left' as const,
		'&:focus': {
			outline: 'none',
			borderColor: theme.colors.primary.borderLighter,
			boxShadow: '0 0 0 3px rgba(254, 186, 152, 0.20)',
		},
		'&:disabled': {
			borderColor: theme.colors.neutral.borderLighter,
			backgroundColor: theme.colors.neutral.surfaceSubtle,
			color: theme.colors.text.disabled,
		},
	};

	const listStyles = {
		position: 'absolute' as const,
		top: '100%',
		left: 0,
		right: 0,
		marginTop: '4px',
		padding: 0,
		margin: '4px 0 0',
		listStyle: 'none' as const,
		backgroundColor: '#fff',
		border: `1px solid ${theme.colors.neutral.borderDefault}`,
		borderRadius: '4px',
		boxShadow: theme.boxShadows.xs,
		maxHeight: '240px',
		minWidth: '300px',
		overflowY: 'auto' as const,
		zIndex: 10,
	};

	const getOptionStyles = (isHighlighted: boolean, isSelected: boolean) => ({
		minHeight: '20px',
		padding: '8px 12px',
		fontSize: '14px',
		lineHeight: 1.4,
		color: '#000',
		cursor: 'pointer' as const,
		backgroundColor: isHighlighted || isSelected ? theme.colors.neutral.surfaceSubtle : '#fff',
	});

	const chevronStyles = {
		position: 'absolute' as const,
		top: '50%',
		right: '10px',
		transform: 'translateY(-50%)',
		pointerEvents: 'none' as const,
		color: isDisabled ? theme.colors.text.disabled : theme.colors.text.subtitle,
	};

	const chevronUpIcon = <Icon icon={faChevronUp} customStyles={chevronStyles} />;
	const chevronDownIcon = <Icon icon={faChevronDown} customStyles={chevronStyles} />;

	const selectChevronIcon = isOpen ? chevronUpIcon : chevronDownIcon;

	const { formState } = useFormContext() ?? {};
	const { errors } = formState ?? [];

	const fieldErrors = errors ? errors[name] : undefined;

	const mergedTriggerStyles = {
		...selectInputStyles,
		...(fieldErrors ? errorStyles : {}),
		...customStyles,
		color: placeholder && value === '' ? theme.colors.text.disabled : '#000',
	} as const;

	// Label shown on the trigger: current option, placeholder when empty, or blank.
	const displayLabel =
		options.find((o) => o.value === value)?.label ?? (placeholder && value === '' ? placeholder : '');

	// When focus leaves the whole control, close the list and notify react-hook-form onBlur.
	const handleContainerBlur = (e: FocusEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			handleSelectClose();
			onBlur?.();
		}
	};

	// Applies a new value via onChange, closes the list, returns focus to the trigger.
	const pickOption = (optionValue: string) => {
		onChange(emitSelectChange(name, optionValue));
		handleSelectClose();
		triggerRef.current?.focus();
	};

	// Keyboard interaction for open/close, move highlight, and confirm selection from the trigger.
	const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
		if (isDisabled) return;

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();

				if (isOpen) {
					setHighlightedIndex((i) => Math.min(i + 1, options.length - 1));
				} else {
					setIsOpen(true);
					setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
				}
				break;
			case 'ArrowUp':
				e.preventDefault();

				if (isOpen) {
					setHighlightedIndex((i) => Math.max(i - 1, 0));
				} else {
					setIsOpen(true);
					setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
				}
				break;
			case 'Enter':
			case ' ':
				if (isOpen && options[highlightedIndex]) {
					e.preventDefault();
					pickOption(options[highlightedIndex].value);
				} else if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					setIsOpen(true);
					setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
				}
				break;
			case 'Escape':
				if (isOpen) {
					e.preventDefault();
					handleSelectClose();
				}
				break;
			case 'Tab':
				if (isOpen) handleSelectClose();
				break;
			default:
				break;
		}
	};

	return (
		<div>
			{label && <InputLabel id={id ?? name} label={label} isRequired={isRequired} />}
			<div
				ref={containerRef}
				css={wrapperStyles}
				onBlur={handleContainerBlur}
				aria-invalid={fieldErrors ? true : undefined}
			>
				<button
					ref={triggerRef}
					type="button"
					id={id ?? name}
					disabled={isDisabled}
					aria-haspopup="listbox"
					aria-expanded={isOpen}
					aria-controls={listboxId}
					css={mergedTriggerStyles}
					// Toggles the list; disabled state is a no-op.
					onClick={() => {
						if (isDisabled) return;
						setIsOpen((o) => !o);
					}}
					onKeyDown={handleTriggerKeyDown}
				>
					{displayLabel}
				</button>
				{selectChevronIcon}
				{isOpen && options.length > 0 && (
					<ul id={listboxId} role="listbox" css={listStyles}>
						{options.map((option, index) => {
							// True when this row matches the controlled value.
							const isSelected = option.value === value;
							// True when this row is the current keyboard/hover highlight.
							const isHighlighted = index === highlightedIndex;

							return (
								<li
									key={option.value}
									role="option"
									aria-selected={isSelected}
									tabIndex={-1}
									css={getOptionStyles(isHighlighted, isSelected)}
									onMouseEnter={() => setHighlightedIndex(index)}
									// Keeps the trigger focused so blur/onBlur do not fire before click selection.
									onMouseDown={(e) => e.preventDefault()}
									onClick={() => pickOption(option.value)}
									// Keyboard parity with click for listbox options.
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.preventDefault();
											pickOption(option.value);
										}
									}}
								>
									{option.label}
								</li>
							);
						})}
					</ul>
				)}
			</div>
			{(fieldErrors || helperText) && (
				<legend>
					{fieldErrors ? (
						processFieldValidationErrors(fieldErrors)
					) : (
						<Typography variant="paragraphXs" customStyles={helperTextStyles} component="div">
							{helperText}
						</Typography>
					)}
				</legend>
			)}
		</div>
	);
};
