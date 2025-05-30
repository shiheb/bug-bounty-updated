import { mdiHome } from '@mdi/js';
import Icon from '@mdi/react';
import { CircularProgress, Grow } from '@mui/material';
import { Box } from '@mui/system';
import { Suspense } from 'react';
import { ERoute, TRoute } from '../types/global';
import Home from './Home';

const Loading = (
  <Grow in={true}>
    <Box
      position={'absolute'}
      display="flex"
      justifyContent={'center'}
      alignItems={'center'}
      width="100%"
      bottom="0px"
      top="0px"
    >
      <CircularProgress />
    </Box>
  </Grow>
);

const lazyLoad = (Component: any) => {
  const WrappedComponent = () => (
    <Suspense fallback={Loading}>
      <Component />
    </Suspense>
  );
  WrappedComponent.displayName = `LazyLoaded(${
    Component.displayName || Component.name || 'Component'
  })`;
  return WrappedComponent;
};

export const routes: TRoute[] = [
  {
    path: ERoute.HOME,
    Icon: <Icon path={mdiHome} size={1} />,
    Component: lazyLoad(Home),
  },
];
