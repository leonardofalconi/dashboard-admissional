export const Theme = {
  colors: {
    grape: '#6324C6',
    white: '#FFFFFF',
    selectiveYellow: '#FFB800',
    lavenderGray: '#C4CAD4',
    platinum: '#E2E5E9',
    persianGreen: '#01ADA6',
    crayola: '#E92151',
  },
  typography: {
    fontMulish: {
      family: '"Inter", sans-serif',
      weight: {
        black: 900,
        extraBold: 800,
        bold: 700,
        semiBold: 600,
        medium: 500,
        regular: 400,
        light: 300,
        extraLight: 200,
      },
    },
  },
  media: {
    mobile: {
      size: '15px',
    },
    tablet: {
      query: '@media (min-width: 768px)',
      size: '18px',
    },
    HD: {
      query: '@media (min-width: 1280px)',
      size: '20px',
    },
    fullHD: {
      query: '@media (min-width: 1920px)',
      size: '23px',
    },
  },
}
