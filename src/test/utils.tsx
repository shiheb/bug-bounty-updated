import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import osapiensTheme from '@/themes/default';

export const renderWithTheme = (ui: ReactElement) => {
  return render(<ThemeProvider theme={osapiensTheme.light}>{ui}</ThemeProvider>);
};

export const mockUser = {
  firstName: 'Chiheb',
  lastName: 'Hmida',
  eMail: 'chiheb.hmida@example.com',
};
