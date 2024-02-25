import { CSSProperties } from 'preact/compat';
import { cond, kebabCase } from 'lodash';
import { isCssLengthProperty } from './isCssLengthProperty';
import { px } from './px';

export type KeyframeMap = Map<string, CSSProperties>;

const keyframesCache = new Map<string, string>();

export function createCssAnimation(...frames: CSSProperties[]): string;
export function createCssAnimation(frames: KeyframeMap): string;
export function createCssAnimation(prefix: string, ...frames: CSSProperties[]): string;
export function createCssAnimation(prefix: string, frames: KeyframeMap): string;
export function createCssAnimation(
  ...args:
  | CSSProperties[]
  | [string, ...CSSProperties[]]
  | [ KeyframeMap ]
  | [ string, KeyframeMap ]
): string {

  if (args.length == 0) {
    return '';
  }

  let prefix: string = '';

  if (typeof args[ 0 ] === 'string') {
    prefix = args.shift() as string;
  }

  const framesMap: KeyframeMap = args[0] instanceof Map
    ? args[0]
    : createKeyframeMap(args as CSSProperties[]);

  // @ts-ignore symlink issue causing vscode not to apply tsconfig correctly, thinks spread of map not possible without downloevel iteration
  const frameEntries = [ ...framesMap.entries() ];
  const condense = frameEntries.every(([ _label, style ]) => Object.keys(style).length < 2);
  const framesText = frameEntries.map(entry => createKeyframe(entry, condense)).join('\n');
  const cacheKey = `${ prefix } :: ${ framesText }`;
  const cached = keyframesCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const name = `${ prefix }${ prefix ? '_' : '' }anim_${ keyframesCache.size + 1 }`;
  const fullCssText = `@keyframes ${ name } {\n${ framesText }}`;
  const el = document.createElement('style');
  el.id = name;
  el.innerHTML = fullCssText;
  document.head.appendChild(el);
  keyframesCache.set(cacheKey, name);
  return name;
}

function createKeyframeMap(frames: CSSProperties[]) {

  const framesMap: KeyframeMap = new Map();
  const frameCount = frames.length;

  switch (frameCount) {
    case 0:
    case 1:
      throw new Error(`createCssAnimation expected an array of two or more frames but got ${ frameCount }.`);

    case 2:
      framesMap.set('from', frames[ 0 ]);
      framesMap.set('to', frames[ 1 ]);
      break;

    default:
      const perFrame = 100 / (frames.length - 1);
      for (let i = 0; i < frameCount; i++) {
        framesMap.set(`${ Math.round(i * perFrame * 1000) / 10 }%`, frames[ i ]);
      }
      break;
  }

  return framesMap;
}

function createKeyframe([ label, style ]: [ string, CSSProperties ], condense: boolean) {

  const stylesText = Object.entries(style).map(createStyleProperty).join('\n    ');
  return condense
    ? `  ${ label } { ${ stylesText } }`
    : `  ${ label } {\n    ${ stylesText }\n  }\n`;
}

function createStyleProperty([ property, value ]: [ string, unknown ]) {
  const valueText = isCssLengthProperty(property) ? px(value) : value;
  return `${ kebabCase(property) }: ${ valueText };`;
}
