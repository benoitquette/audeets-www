import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import RollingAreaChart from './RollingAreaChart';
import SlotSelector from './SlotSelector';
import { fetchRollingMonth, fetchRollingWeek, fetchRollingYear } from '~/store/reducers/audits';

const EvolutionCard = ({ projectId, selectedCategory, selectDate }) => {
  const dispatch = useDispatch();
  const [slot, setSlot] = useState('week');
  const { data } = useSelector((state) => state.audits.rolling[slot]);

  useEffect(() => {
    dispatch(fetchRollingMonth(projectId));
    dispatch(fetchRollingWeek(projectId));
    dispatch(fetchRollingYear(projectId));
  }, [dispatch, projectId]);

  return (
    <Card>
      <CardHeader title="Evolution" action={<SlotSelector slot={slot} onClick={setSlot} />} />
      <CardContent sx={{ mt: -2 }}>
        <RollingAreaChart data={data} selectedCategory={selectedCategory} selectDate={selectDate} />
      </CardContent>
    </Card>
  );
};

EvolutionCard.propTypes = {
  projectId: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string,
  selectDate: PropTypes.func.isRequired
};

export default EvolutionCard;
