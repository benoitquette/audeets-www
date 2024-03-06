import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader } from '@mui/material';
import RollingAreaChart from './RollingAreaChart';
import SlotSelector from './SlotSelector';
import useGetRollingData from './useGetRollingData';

const EvolutionCard = ({ projectId, selectedCategory, selectDate }) => {
  const [slot, setSlot] = useState('week');
  const data = useGetRollingData(projectId, slot);
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
