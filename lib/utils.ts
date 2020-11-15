import { targetWidths } from './targetWidths';
import { stringify } from 'query-string';

export function trimSrc(src: string) {
  return src.split(/[?#]/)[0];
}

export function generateSrcset(src: string, imgixParams: any) {
  const widths = targetWidths(),
    sets = [];

  for (var i = 0; i < widths.length; i++) {
    const params = {
      ...imgixParams,
      w: widths[i],
      ...(imgixParams.h
        ? { h: Math.round(widths[i] * (imgixParams.h / imgixParams.w)) }
        : {})
    };

    sets.push(`${trimSrc(src)}?${stringify(params)}`);
  }

  return sets.join(', ');
}
