import { Box, Fade, Grow, Slide } from '@mui/material';
import { FC, ReactNode, useMemo } from 'react';
import { matchPath, Route, Routes, useLocation } from 'react-router-dom';
import { PathParams, TRoute } from '../types/global';
import { validateParams } from '../utils/router';

interface UseMatchedRouteOptions {
  notFoundComponent?: FC;
  matchOnSubPath?: boolean;
  transition?: 'none' | 'fade' | 'grow' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
}

interface TransitionProps {
  match: any;
  children: ReactNode;
}

const useMatchedRoute = (
  routes: ReadonlyArray<TRoute>,
  fallbackComponent?: FC,
  options?: UseMatchedRouteOptions,
): {
  route: TRoute | undefined;
  params: PathParams | {};
  MatchedElement: JSX.Element;
} => {
  const { notFoundComponent, matchOnSubPath, transition = 'fade' } = options || {};
  const location = useLocation();

  // Find all matching routes for current location
  const results = routes
    .map(route => {
      const match = matchPath({ path: route.path, end: !matchOnSubPath }, location.pathname);
      return { route, match };
    })
    .filter(({ match }) => !!match);

  const [firstResult] = results;
  const { match, route } = firstResult || {};
  const Fallback = fallbackComponent;
  const NotFound = notFoundComponent || (() => <>not found</>);

  const Transition: FC<TransitionProps> = useMemo(() => {
    if (transition === 'fade') {
      const FadeTransition: FC<TransitionProps> = ({ children, match }) => (
        <Fade in={!!match} timeout={300} unmountOnExit>
          <Box height="100%">{children}</Box>
        </Fade>
      );
      return FadeTransition;
    }

    if (transition === 'grow') {
      const GrowTransition: FC<TransitionProps> = ({ children, match }) => (
        <Grow in={!!match} timeout={300} unmountOnExit>
          <Box height="100%">{children}</Box>
        </Grow>
      );
      return GrowTransition;
    }

    if (transition.startsWith('slide')) {
      const [, direction] = transition.split('-');
      const SlideTransition: FC<TransitionProps> = ({ children, match }) => (
        <Slide
          in={!!match}
          direction={direction as 'left' | 'right' | 'up' | 'down'}
          timeout={300}
          unmountOnExit
        >
          <Box height="100%">{children}</Box>
        </Slide>
      );
      return SlideTransition;
    }

    // No transition fallback
    const NoTransition: FC<TransitionProps> = ({ children }) => <>{children}</>;
    return NoTransition;
  }, [transition]);

  return {
    route,
    params: match && validateParams(route?.path ?? '', match.params) ? match.params : {},
    MatchedElement: (
      <Routes>
        {matchOnSubPath &&
          routes.map(({ path, Component: RouteComponent }) => {
            const subPath = `/${path.split('/').slice(1, 2)}/*`;
            const match = matchPath({ path: subPath }, location.pathname);

            return (
              <Route
                key={path + 'matchOnSubPath'}
                path={subPath}
                element={
                  <Transition match={match}>
                    <RouteComponent />
                  </Transition>
                }
              />
            );
          })}

        {routes.map(({ path, Component: RouteComponent }) => {
          const match = matchPath({ path, end: true }, location.pathname);

          return (
            <Route
              key={path + 'root'}
              path={path}
              element={
                <Transition match={match}>
                  <RouteComponent />
                </Transition>
              }
            />
          );
        })}

        {Fallback ? (
          <Route
            path="*"
            element={
              <Transition match={true}>
                <Fallback />
              </Transition>
            }
          />
        ) : (
          <Route
            path="*"
            element={
              <Transition match={true}>
                <NotFound />
              </Transition>
            }
          />
        )}
      </Routes>
    ),
  };
};

export default useMatchedRoute;
