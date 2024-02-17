function collapseWhitespace(strings: string[], ...values: unknown[]) {
  let s = '';
  const valueLen = values.length;
  for (let i = 0; i < strings.length; i++) {
    s += strings[i];
    if (i < valueLen) {
      s += values[i];
    }
  }

  return s.replaceAll(/\s{2,}/g, ' ').trim();
}