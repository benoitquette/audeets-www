import PropTypes from 'prop-types';

// material-ui
import { Grid, Stack, Typography, Box } from '@mui/material';

// project import
import ButtonsList from './ButtonsList';
import Logo from '~/components/Logo/Logo';
import MainCard from '~/components/MainCard';

// ================================|| LOGIN ||================================ //

const LoginCard = ({ returnUrl }) => (
  <MainCard
    sx={{
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}
    content={false}
    border={false}
    boxShadow
  >
    <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Logo />
            <Typography sx={{ ml: 1 }} variant="h3">
              Signin for Audeets
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ButtonsList returnUrl={returnUrl} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </MainCard>
);

LoginCard.propTypes = {
  returnUrl: PropTypes.string.isRequired
};

export default LoginCard;
