// material-ui
import { Box } from '@mui/material';

// project import
import Profile from './Profile';
// import Notification from './Notification';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  return (
    <>
      <Box sx={{ width: '100%', ml: 1 }} />
      {/* <Notification /> */}
      <Profile />
    </>
  );
};

export default HeaderContent;
