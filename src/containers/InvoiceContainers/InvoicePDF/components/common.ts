export const getFontRegister = (font: string) => {
  if (font === 'OpenSans') {
    return {
      family: 'OpenSans',
      fonts: [
        {
          src: '/fonts/OpenSans_Condensed-Light.ttf'
        },
        {
          src: '/fonts/OpenSans_Condensed-Bold.ttf',
          fontWeight: 'bold'
        }
      ]
    }
  } else {
    return {
      family: 'AlegreyaSans',
      fonts: [
        {
          src: '/fonts/AlegreyaSans-Light.ttf'
        },
        {
          src: '/fonts/AlegreyaSans-Bold.ttf',
          fontWeight: 'bold'
        }
      ]
    }
  }
}
