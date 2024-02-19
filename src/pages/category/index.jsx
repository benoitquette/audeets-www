import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Select, MenuItem, Grid, Typography } from '@mui/material';
import MainCard from '~/components/MainCard';

const Category = () => {
  const category = useParams().category;

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{category}</Typography>
          </Grid>
          <Grid item sx={{ mr: 0.5 }}>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={10} label="Age">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid item>
          <MainCard sx={{ mt: 2 }}></MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Category;
