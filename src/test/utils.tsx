import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const renderWithTheme = (ui: ReactElement) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

export const mockUser = {
  firstName: 'Chiheb',
  lastName: 'Hmida',
  eMail: 'chiheb.hmida@example.com',
};
