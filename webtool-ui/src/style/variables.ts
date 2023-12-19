//font-scheme
export const fontScheme = {
  primary: "Roboto",
  secondary: "sans-serif",
  tertiary: "monospace",
};

export const fonts = {
    h1: font('2.5rem'),
    h2: font('2rem'),
    h3: font('1.75rem'),
    h4: font('1.5rem'),
    h5: font('1.25rem'),
    h6: font('1rem'),
    p: font('1rem'),
    small: font('0.875rem'),
};

export function font(fontSite: string, color: string = colors.onBackground){
    return {
        fontSize: fontSite,
        fontFamily: fontScheme.primary,
        fontWeight: 300,
        lineHeight: 1.2,
        marginTop: 0,
        marginBottom: '0.5rem',
        color: color,
    };
}

// color-scheme
export const colors = {
  primary: '#3f51b5',
  secondary: '#f50057',
  background: '#fff',
  onPrimary: '#fff',
  onSecondary: '#fff',
  onBackground: '#000',
  onPrimaryLight: '#000',
  primaryLight: '#757de8',
  secondaryLight: '#ff4081',
  navigation: '#232c5e',
  onNavigation: '#fff',
};


// margins
export const margins = {
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '95vw',
    paddingTop: '35px',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
};

// misc
export const misc = {
  button: (color : string = colors.primary, textColor : string = colors.onPrimaryLight, hoverColor: string = colors.primaryLight)=> ({
    backgroundColor: color,
    font: fonts.h4,
    textColor: textColor,
    border: 'none',
    borderRadius: '5px',
    padding: '8.4px',
    transition: 'background-color 0.3s',
    hover: {
      backgroundColor: hoverColor,
    },
  }),
};