import { mdiLogoutVariant, mdiTag } from '@mdi/js';
import Icon from '@mdi/react';
import { Avatar, Box, Button, Divider, Tooltip, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import { useTheme } from '@mui/material/styles';
import { useState, MouseEvent, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '../../api/services/User/store';
import { ERoute } from '../../types/global';
import { useNavigate } from 'react-router';

interface AvatarMenuProps {
  user: User;
}

const getInitials = (user: User) => {
  if (user.firstName || user.lastName) {
    const initials = [user.firstName, user.lastName]
      .map(name => (typeof name === 'string' && name.length > 0 ? name[0].toUpperCase() : ''))
      .join('');
    return initials;
  }
  return '';
};

const stringAvatar = (user: User) => {
  const initials = getInitials(user);
  // 36 * 7 <= 255
  const r = Math.floor(parseInt(initials[0] ? initials[0] : 'k', 36) * 7);
  const g = Math.floor(parseInt(initials[1] ? initials[1] : 'l', 36) * 7);
  const b = Math.floor(parseInt(user?.firstName?.[1] ?? 'm', 36) * 7);
  return {
    sx: { bgcolor: `rgb(${r},${g},${b})`, cursor: 'pointer' },
    children: initials,
  };
};

const AvatarMenu = forwardRef<HTMLDivElement, AvatarMenuProps>((props: AvatarMenuProps, ref) => {
  const { user } = props;
  const theme = useTheme();
  const { t } = useTranslation('app');

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Avatar onClick={handleClick} {...stringAvatar(user)} />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" p={1}>
          <Typography variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
          <Typography variant="body2" color="textSecondary">
            {user.eMail}
          </Typography>
          <Box m={1} />
          <Button
            // onClick={() => navigate(ERoute.SETTINGS_ACCOUNT)}
            variant="outlined"
            color="primary"
            size="medium"
          >
            Edit Profile
          </Button>
        </Box>
        <Box
          p={1}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          style={{ color: theme.palette.grey[500] }}
        >
          <Button
            // onClick={() => navigate(ERoute.SETTINGS_DETAILS)}
            color="inherit"
            variant="text"
            size="small"
          >
            <Icon path={mdiTag} size={0.75} />
            <Box m={0.5} />
            Edit Organization
          </Button>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column" alignItems="center" p={2}>
          <Tooltip title={<Box>{t('logout')}</Box>}>
            <Button onClick={() => console.log('logout')} variant="text">
              <Icon path={mdiLogoutVariant} size={1} />
              <Box m={0.5} />
              {t('logout')}
            </Button>
          </Tooltip>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="row" alignItems="center" p={2}>
          <Button
            variant="text"
            size="small"
            style={{
              color: indigo[500],
              textTransform: 'none',
            }}
          >
            Data Privacy Statement
          </Button>
          <Button
            variant="text"
            size="small"
            style={{
              color: indigo[500],
              textTransform: 'none',
            }}
          >
            Imprint
          </Button>
        </Box>
      </Menu>
    </div>
  );
});

AvatarMenu.displayName = 'AvatarMenu';

export default AvatarMenu;
