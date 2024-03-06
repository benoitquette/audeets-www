import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Link } from '@mui/material';
import DrawerHeaderStyled from './DrawerHeaderStyled';
import logo from '~/assets/images/logo.png';
import config from '~/config';

const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Link href={config.defaultPath} underline="none" color="inherit">
        <Stack direction="row" spacing={1} alignItems="center">
          <img src={logo} alt="Audeets" width="30" />
          <Stack direction="column" spacing={-1} alignItems="flex-start" sx={{ pt: 0.8 }}>
            <Typography variant="h4">Audeets</Typography>
            <Typography variant="caption" color="textSecondary">
              continuous auditing
            </Typography>
          </Stack>
        </Stack>
      </Link>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
