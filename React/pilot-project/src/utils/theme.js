const calcRem = (size) => `${size / 16}rem`;

const fontSizes = {
    small: calcRem(14),
    base: calcRem(16),
    large: calcRem(18),
};

const paddings = {
    small: calcRem(8),
    base: calcRem(10),
    large: calcRem(12),
};

const margins = {
    small: calcRem(8),
    base: calcRem(10),
    large: calcRem(12),
};

const colors = {
    normal: "#78909c",
    light: "#a7c0cd",
    dark: "#4b636e",
    white: "white",
    gray_1: "#efefef",
    gray_2: "#bdbdbd",
    gray_3: "#8d8d8d",
    gray_4: "#263238",
};

const theme = {
    fontSizes,
    paddings,
    margins,
    colors,
    menuColor: "#3f525c",
    menuFontColor: "#fafafa",
    defaultColor: "#3f525c",
};

export default theme;
