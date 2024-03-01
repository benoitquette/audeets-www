import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader } from '@mui/material';
import RollingAreaChart from './RollingAreaChart';
import SlotSelector from './SlotSelector';

const EvolutionCard = ({ data, selectedCategory, slot, onSelectSlot }) => {
  const theme = useTheme();
  const fontStyle = {
    fontSize: theme.typography.body2.fontSize,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.body2.fontWeight,
    lineHeight: theme.typography.body2.lineHeight
  };

  return (
    <Card>
      <CardHeader title="Evolution" action={<SlotSelector slot={slot} onClick={onSelectSlot} />} />
      <CardContent sx={{ mt: -2 }}>
        <RollingAreaChart data={data} selectedCategory={selectedCategory} />
      </CardContent>
    </Card>
  );
};

EvolutionCard.propTypes = {
  data: PropTypes.array,
  selectedCategory: PropTypes.string,
  slot: PropTypes.string.isRequired,
  onSelectSlot: PropTypes.func.isRequired
};

export default EvolutionCard;
