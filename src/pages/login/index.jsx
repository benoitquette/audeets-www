import { useLocation } from 'react-router-dom';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import LoginCard from './LoginCard';
// import AuthFooter from 'components/cards/AuthFooter';

// assets
// import AuthBackground from 'assets/images/auth/AuthBackground';

// ==============================|| AUTHENTICATION - LOGIN ||============================== //

const Login = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const returnUrl = params.get('returnTo');
  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* <AuthBackground /> */}
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        sx={{
          minHeight: '100vh'
        }}
      >
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
          >
            <Grid item>
              <LoginCard returnUrl={returnUrl} />
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <AuthFooter />
      </Grid> */}
      </Grid>
    </Box>
  );
};

export default Login;
