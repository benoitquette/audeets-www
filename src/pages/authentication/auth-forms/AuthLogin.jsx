import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// material-ui
import { Grid } from '@mui/material';

// third party
import Cookies from 'js-cookie';

// project import
import SocialButtons from './SocialButtons';
import { fetchUser } from '~/store/reducers/user';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (Cookies.get('connect.sid') && status === 'succeeded' && !user) {
      dispatch(fetchUser());
    }
  }, [dispatch, status, user]);

  if (user) {
    return <Navigate to="/" replace />;
  } else if (status !== 'loading') {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SocialButtons />
        </Grid>
      </Grid>
    );
  }
};

export default AuthLogin;
