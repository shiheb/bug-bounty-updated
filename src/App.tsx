import { Suspense, FC, ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';
import { RouterProvider, createHashRouter } from 'react-router';

import services from './api/services';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import RootComponent from './pages/Root/index';
import { osapiens } from './themes';

import './i18n';
import { StoreProvider as UserStoreProvider } from './api/services/User';

const theme = osapiens.light;

interface CombinedStoreProviderProps {
  children: ReactNode;
}

const CombinedStoreProvider: FC<CombinedStoreProviderProps> = ({ children }) => {
  return <UserStoreProvider>{children}</UserStoreProvider>;
};

const router = createHashRouter([
  {
    path: '/*',
    element: <RootComponent />,
  },
]);

const AppContainer: FC = () => {
  return (
    <>
      <CssBaseline />
      <Suspense fallback={<div>loading...</div>}>
        <CombinedStoreProvider>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <ThemeProvider theme={theme}>
              <RouterProvider router={router} />
            </ThemeProvider>
          </SnackbarProvider>
        </CombinedStoreProvider>
      </Suspense>
    </>
  );
};

export default AppContainer;
