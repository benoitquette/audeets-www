import React from "react";
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  canvas: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 0,
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      marginTop: 20
    },
  },
  title: {
    color: 'Charcoal',
    fontSize: 60,
    fontWeight: 'bold',
    flexBasis: 45
  },
  tagline: {
    color: 'grey',
    fontSize: 30,
    fontFamily: 'Indie Flower',
    fontStyle: 'italic'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30
  },
  button: {
    marginRight: 20
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    fontSize: 11,
    padding: 10
  },
  main: {
    backgroundColor: theme.palette.primary3Color,
    backgroundImage: 'url(images/cork-wallet.png)'
  }
}));

function Home(props) {
  const classes = useStyles()
  return (
      <div className={classes.main}>
        <div className={classes.canvas} >
          <div className={classes.header}>
          </div>
          <div className={classes.body}>
            <div className={classes.logo}>
              <img src="apple-icon-180x180.png"/>
              <div className={classes.logoText}>
                <span className={classes.title}>
                  audeets
                </span>
                <span className={classes.tagline}>
                  continuous site auditing
                </span>
              </div>
            </div>
            <div className={classes.buttons}>
              <Link to="/console/dashboard">
                <Button
                  variant="contained"
                  className={classes.button}
                  >demo</Button>
                </Link>
            </div>
          </div>
          <div className={classes.footer}>
            © 2016 audeets.com. All Rights Reserved.
          </div>
        </div>
      </div>
  )
}

export default Home;
