import { getLocalStorage } from '@helper_localstorage';

const pwaConfig = getLocalStorage('frontend_options');

export const FONT_DEFAULT = {
    fontFamily: pwaConfig && pwaConfig.pwa && pwaConfig.pwa.default_font ? `${pwaConfig.pwa.default_font} !important` : 'Montserrat !important',
    color: pwaConfig && pwaConfig.pwa && pwaConfig.pwa.font_color ? pwaConfig.pwa.font_color : '#000000',
};

export const FONT_HEADING = {
    fontFamily: pwaConfig && pwaConfig.pwa && pwaConfig.pwa.heading_font ? `${pwaConfig.pwa.heading_font} !important` : 'Montserrat !important',
    color: pwaConfig && pwaConfig.pwa && pwaConfig.pwa.font_color ? pwaConfig.pwa.font_color : '#000000',
};

export const FONT_6 = {
    fontSize: 6,
};

export const FONT_8 = {
    fontSize: 8,
};

export const FONT_10 = {
    fontSize: 10,
};

export const FONT_12 = {
    fontSize: 12,
};

export const FONT_14 = {
    fontSize: 14,
};

export const FONT_16 = {
    fontSize: 16,
};

export const FONT_24 = {
    fontSize: 24,
};

export const FONT_BIG = {
    fontSize: 30,
};

export const FONT_REGULAR = {
    ...FONT_DEFAULT,
    ...FONT_12,
    fontWeight: 'reguler',
};

export const textAlign = (align = 'left') => ({
    textAlign: align,
});
