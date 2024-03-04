import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader } from '@mui/material';
import RollingAreaChart from './RollingAreaChart';
import SlotSelector from './SlotSelector';

const EvolutionCard = ({ data, selectedCategory, slot, onSelectSlot }) => (
  <Card>
    <CardHeader title="Evolution" action={<SlotSelector slot={slot} onClick={onSelectSlot} />} />
    <CardContent sx={{ mt: -2 }}>
      <RollingAreaChart data={data} selectedCategory={selectedCategory} />
    </CardContent>
  </Card>
);

EvolutionCard.propTypes = {
  data: PropTypes.array,
  selectedCategory: PropTypes.string,
  slot: PropTypes.string.isRequired,
  onSelectSlot: PropTypes.func.isRequired
};

export default EvolutionCard;
