import { Suspense, FC, ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';
import { HashRouter } from 'react-router-dom';

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

const AppContainer: FC = () => {
  return (
    <>
      {/* Kickstart a simple scoped CSS baseline to build upon. */}
      <CssBaseline />
      <Suspense fallback={<div>loading...</div>}>
        <CombinedStoreProvider>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            // You can customize other props if needed, like:
            // preventDuplicate
            // dense
            // iconVariant={{ success: <SuccessIcon />, error: <ErrorIcon />, ... }}
          >
            <ThemeProvider theme={theme}>
              <HashRouter>
                <RootComponent />
              </HashRouter>
            </ThemeProvider>
          </SnackbarProvider>
        </CombinedStoreProvider>
      </Suspense>
    </>
  );
};

export default AppContainer;
