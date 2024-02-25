import { defaultTemplateLiteral } from './defaultTemplateLiteral';

function collapseWhitespace(strings: string[], ...values: unknown[]) {
  const text = defaultTemplateLiteral(strings, values);
  return text.replace(/\s{2,}/g, ' ').trim();
}