import PropTypes from 'prop-types';
import Navigation from './Navigation';
import SimpleBar from '~/components/third-party/SimpleBar';

const DrawerContent = ({ navigation }) => (
  <SimpleBar
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column'
      }
    }}
  >
    <Navigation navigation={navigation} />
  </SimpleBar>
);

DrawerContent.propTypes = {
  navigation: PropTypes.object
};

export default DrawerContent;
