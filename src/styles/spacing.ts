import type { CSSObject, SerializedStyles } from '@emotion/react';

import { theme } from './theme.ts';

/** A step of `theme.spacing` (`3` → `'12px'`); `0` resolves to `'0'`. */
export type SpacingStep = 0 | keyof typeof theme.spacing;

/** Up to four steps, in CSS shorthand order (top, right, bottom, left). */
export type SpacingShorthand = [SpacingStep, SpacingStep?, SpacingStep?, SpacingStep?];

const SPACING_BOX_SHORTHANDS = ['margin', 'padding'] as const;

const SPACING_AXIS_SHORTHANDS = ['gap', 'marginBlock', 'marginInline', 'paddingBlock', 'paddingInline'] as const;

const SPACING_LONGHANDS = [
	'columnGap',
	'marginBlockEnd',
	'marginBlockStart',
	'marginBottom',
	'marginInlineEnd',
	'marginInlineStart',
	'marginLeft',
	'marginRight',
	'marginTop',
	'paddingBlockEnd',
	'paddingBlockStart',
	'paddingBottom',
	'paddingInlineEnd',
	'paddingInlineStart',
	'paddingLeft',
	'paddingRight',
	'paddingTop',
	'rowGap',
] as const;

type SpacingBoxShorthand = (typeof SPACING_BOX_SHORTHANDS)[number];

type SpacingAxisShorthand = (typeof SPACING_AXIS_SHORTHANDS)[number];

type SpacingProperty = SpacingBoxShorthand | SpacingAxisShorthand | (typeof SPACING_LONGHANDS)[number];

const SPACING_PROPERTIES: ReadonlySet<string> = new Set<string>([
	...SPACING_BOX_SHORTHANDS,
	...SPACING_AXIS_SHORTHANDS,
	...SPACING_LONGHANDS,
]);

type SpacingValue<TProperty extends SpacingProperty> = TProperty extends SpacingBoxShorthand
	? SpacingStep | Readonly<SpacingShorthand>
	: TProperty extends SpacingAxisShorthand
		? SpacingStep | readonly [SpacingStep, SpacingStep?]
		: SpacingStep;

/** `CSSObject` without its `[selector: string]` index signature: the CSS properties and pseudos only. */
type CSSKnownProperties = {
	[TKey in keyof CSSObject as string extends TKey ? never : TKey]: CSSObject[TKey];
};

type SpacingAwareProperties = {
	[TKey in keyof CSSKnownProperties]?: TKey extends SpacingProperty
		? Extract<CSSKnownProperties[TKey], string> | readonly string[] | SpacingValue<TKey>
		: TKey extends `:${string}`
			? SpacingStyles
			: CSSKnownProperties[TKey];
};

/**
 * `CSSObject` where spacing properties take `theme.spacing` steps instead of raw pixel numbers
 * (`marginTop: 3`, `padding: [2, 3]`). Strings pass through untouched (`margin: '12px 0 24px 4px'`).
 * Nested selectors and media queries follow the same rules.
 */
export interface SpacingStyles extends SpacingAwareProperties {
	[selector: string]: Exclude<CSSObject[string], CSSObject> | SerializedStyles | SpacingStyles;
}

/** Distributes over unions, so `'absolute' | undefined` or `string & {}` keep their exact types. */
type ResolvedSpacingValue<TValue> = TValue extends
	string | number | boolean | null | undefined | readonly unknown[] | SerializedStyles
	? TValue
	: ResolvedSpacing<TValue>;

type ResolvedSpacingStep<TValue> = TValue extends string | readonly string[] | undefined ? TValue : string;

/** The type of `styles` after `resolveSpacing`: spacing steps become strings, everything else keeps its type. */
export type ResolvedSpacing<TStyles> = {
	[TKey in keyof TStyles]: TKey extends SpacingProperty
		? ResolvedSpacingStep<TStyles[TKey]>
		: ResolvedSpacingValue<TStyles[TKey]>;
};

const toSpacing = (step: SpacingStep): string => (step === 0 ? '0' : theme.spacing[step]);

/**
 * Converts `theme.spacing` steps to a CSS value, for places outside `defineStyles()` (e.g. inline `css` props).
 * `space(3)` → `'12px'`, `space(1, 0, 6, 1)` → `'4px 0 24px 4px'`.
 */
export const space = (...steps: SpacingShorthand): string =>
	steps
		.filter((step): step is SpacingStep => step !== undefined)
		.map(toSpacing)
		.join(' ');

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype;

const isSpacingShorthand = (value: unknown): value is Readonly<SpacingShorthand> =>
	Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === 'number');

const resolveSpacingValue = (value: unknown): unknown => {
	if (typeof value === 'number') {
		return toSpacing(value as SpacingStep);
	}

	if (isSpacingShorthand(value)) {
		return space(...value);
	}

	return value;
};

/** Returns `styles` itself when nothing needed resolving, so string-only objects aren't copied. */
const resolveObject = (styles: Record<string, unknown>): Record<string, unknown> => {
	const entries = Object.entries(styles);
	const resolvedEntries = entries.map(([key, value]): [string, unknown] => {
		if (SPACING_PROPERTIES.has(key)) {
			return [key, resolveSpacingValue(value)];
		}

		return [key, isPlainObject(value) ? resolveObject(value) : value];
	});
	const hasChanges = resolvedEntries.some(([, value], index) => value !== entries[index][1]);

	return hasChanges ? Object.fromEntries(resolvedEntries) : styles;
};

/** Replaces `theme.spacing` steps on spacing properties with their CSS values, recursing into nested selectors. */
export const resolveSpacing = <TStyles extends SpacingStyles>(styles: TStyles): ResolvedSpacing<TStyles> =>
	resolveObject(styles) as ResolvedSpacing<TStyles>;
