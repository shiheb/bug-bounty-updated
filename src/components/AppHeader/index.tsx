import { Grow, Box, Theme, Toolbar, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '../../api/services/User/store';
import AvatarMenu from '../AvatarMenu';
import LanguageSwitcher from '../LanguageSwitcher';

interface AppBarProps extends MuiAppBarProps {
  theme?: Theme;
}

interface AppHeaderProps {
  user: User;
  pageTitle: string;
}

const typoStyle = {
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
  lineHeight: 1,
};

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  height: theme.tokens.header.height,
}));

const AppHeader = forwardRef<HTMLDivElement, AppHeaderProps>((props: AppHeaderProps, ref) => {
  const { user, pageTitle } = props;
  const { t } = useTranslation('app');
  const theme = useTheme();

  const [count, setCount] = useState(0);
  const hours = 1;
  const minutes = hours * 60;
  const seconds = minutes * 60;

  const countdown = useMemo(() => seconds - count, [seconds, count]);
  const countdownMinutes = useMemo(() => `${~~(countdown / 60)}`.padStart(2, '0'), [countdown]);
  const countdownSeconds = useMemo(() => (countdown % 60).toFixed(0).padStart(2, '0'), [countdown]);

  useEffect(() => {
    if (countdown <= 0) return;
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <AppBar ref={ref} position="fixed" sx={{ width: '100vw' }}>
      <Toolbar sx={{ background: '#08140C 0% 0% no-repeat padding-box' }}>
        <Box sx={{ width: '100%', flexDirection: 'row', display: 'flex' }}>
          <Box>
            <Typography variant="h6" component="div" color="primary">
              {countdownMinutes}:{countdownSeconds}
            </Typography>
          </Box>
          <Box sx={{ width: 20, height: 20, flex: 1 }} />
          <Box sx={{ flex: 2 }}>
            <Typography
              sx={{
                ...typoStyle,
                color: theme.palette.primary.main,
                mb: theme.spacing(0.5),
              }}
              variant="h6"
              component="div"
            >
              {t('appTitle').toLocaleUpperCase()}
            </Typography>
            <Typography sx={{ ...typoStyle }} variant="overline" component="div" noWrap>
              {pageTitle.toLocaleUpperCase()}
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              justifyContent: 'flex-end',
              display: 'flex',
              gap: '20px',
            }}
          >
            <LanguageSwitcher />
            <Grow in={!!user?.eMail}>
              <div>{user?.eMail && <AvatarMenu user={user} />}</div>
            </Grow>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
});

AppHeader.displayName = 'AppHeader';

export default AppHeader;
