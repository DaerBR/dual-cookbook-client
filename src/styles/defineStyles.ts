import { resolveSpacing } from './spacing.ts';

import type { ResolvedSpacing, SpacingStyles } from './spacing.ts';

/**
 * Wrap a style object literal in this so its properties are checked against `CSSObject`
 * (giving TypeScript the narrow literal types it needs for enum-like CSS properties like
 * `position`/`display`/`flexDirection`) without widening to plain `CSSObject` or needing
 * per-property `as const`.
 *
 * Spacing properties (margin, padding, gap and their longhands) also accept `theme.spacing` steps:
 * `marginTop: 3` → `'12px'`, `padding: [2, 3]` → `'8px 12px'`. Strings are left as written.
 */
export const defineStyles = <TStyles extends SpacingStyles>(styles: TStyles): ResolvedSpacing<TStyles> =>
	resolveSpacing(styles);
