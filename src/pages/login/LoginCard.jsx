import PropTypes from 'prop-types';
import { Grid, Stack, Typography, Box, Card } from '@mui/material';
import ButtonsList from './ButtonsList';
import logo from '~/assets/images/logo.png';

const LoginCard = ({ returnUrl }) => (
  <Card
    sx={{
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}
  >
    <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <img src={logo} alt="Audeets" width="30" />
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
  </Card>
);

LoginCard.propTypes = {
  returnUrl: PropTypes.string
};

export default LoginCard;
