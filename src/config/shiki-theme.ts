import type { ThemeRegistration } from 'shiki';

// Tema propio: fondo casi negro y naranja como acento. Resaltado en build, sin JS en cliente.
export const arcadeTheme: ThemeRegistration = {
  name: 'arcade-orange',
  type: 'dark',
  colors: { 'editor.background': '#0A0A0A', 'editor.foreground': '#E6E6E6' },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#8A8A8A', fontStyle: 'italic' } },
    { scope: ['keyword', 'storage', 'keyword.control'], settings: { foreground: '#FF9500' } },
    { scope: ['string', 'string.quoted'], settings: { foreground: '#FFB366' } },
    { scope: ['constant.numeric', 'constant.language', 'constant.character'], settings: { foreground: '#FF6B00' } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call'], settings: { foreground: '#7FD1B9' } },
    { scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'], settings: { foreground: '#6AA9E0' } },
    { scope: ['variable', 'variable.other'], settings: { foreground: '#E6E6E6' } },
    { scope: ['variable.parameter', 'entity.other.attribute-name'], settings: { foreground: '#D0B8FF' } },
    { scope: ['punctuation', 'meta.brace'], settings: { foreground: '#B0B0B0' } },
    { scope: ['markup.heading', 'entity.name.tag'], settings: { foreground: '#FF9500' } },
  ],
};
