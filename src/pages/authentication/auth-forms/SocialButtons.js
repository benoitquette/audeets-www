// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Button, Stack } from '@mui/material';

// assets
import Google from 'assets/images/icons/google.svg';
import GitLab from 'assets/images/icons/gitlab.svg';
import GitHub from 'assets/images/icons/github.svg';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const SocialButtons = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const twitterHandler = async () => {
    // login || singup
  };

  const facebookHandler = async () => {
    // login || singup
  };

  return (
    <Stack
      direction="row"
      spacing={matchDownSM ? 1 : 2}
      justifyContent={matchDownSM ? 'space-around' : 'space-between'}
      sx={{ '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
    >
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        href={`${process.env.REACT_APP_URL_API_USERS}/api/auth/google`}
      >
        {!matchDownSM && 'Google'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={GitLab} alt="Twitter" />}
        onClick={twitterHandler}
      >
        {!matchDownSM && 'GitLab'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={GitHub} alt="Facebook" />}
        onClick={facebookHandler}
      >
        {!matchDownSM && 'GitHub'}
      </Button>
    </Stack>
  );
};

export default SocialButtons;
