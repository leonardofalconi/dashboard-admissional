export const Theme = {
  colors: {
    polishedPine: '#64a98c',
    white: '#FFFFFF',
    redMunsell: '#E80537',
    teal: '#007C89',
    cosmicLatte: '#FDF8E9',
    maizeCrayola: '#EFC24D',
    aliceBlue: '#EEEEFD',
    palatinateBlue: '#4242DF',
    lavenderBlush: '#FBEDF6',
    royalFuchsia: '#CE2893',
    antiFlashWhite: '#F0F0F0',
  },
  typography: {
    fontInter: {
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
