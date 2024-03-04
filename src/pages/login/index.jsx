import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import LoginCard from './LoginCard';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const returnUrl = params.get('returnTo') || '/';
  const sessionCookie = Cookies.get('connect.sid');

  useEffect(() => {
    if (sessionCookie) navigate(returnUrl);
  }, [sessionCookie, navigate]);

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
