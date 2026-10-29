// 以 Everforest Light 為基礎，把太淡的語法顏色加深到 WCAG AA（4.5:1），底色是 --wash
import everforestLight from '@shikijs/themes/everforest-light';

const CODE_BG = '#edf1ed';
const MIN_CONTRAST = 4.6;

const channels = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

function luminance(hex) {
  const [r, g, b] = channels(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// 往黑色一點一點混，直到對比足夠；保留原本的色相
function darken(hex) {
  const color = hex.slice(0, 7);
  const alpha = hex.slice(7);
  let rgb = channels(color);
  let out = color;
  while (contrast(out, CODE_BG) < MIN_CONTRAST) {
    rgb = rgb.map((v) => Math.round(v * 0.95));
    out = '#' + rgb.map((v) => v.toString(16).padStart(2, '0')).join('');
  }
  return out + alpha;
}

export const codeThemeLight = {
  ...everforestLight,
  name: 'everforest-light-accessible',
  colors: { ...everforestLight.colors, 'editor.foreground': darken(everforestLight.colors['editor.foreground']) },
  tokenColors: everforestLight.tokenColors.map((token) =>
    token.settings?.foreground
      ? { ...token, settings: { ...token.settings, foreground: darken(token.settings.foreground) } }
      : token,
  ),
};
