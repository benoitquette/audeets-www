import PropTypes from 'prop-types';

// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = ({ navigation }) => {
  const navGroups = navigation.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

Navigation.propTypes = {
  navigation: PropTypes.object
};

export default Navigation;
