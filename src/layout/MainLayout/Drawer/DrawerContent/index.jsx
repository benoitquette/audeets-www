import PropTypes from 'prop-types';

// project import
import Navigation from './Navigation';
import SimpleBar from '~/components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //

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
    {/* <NavCard /> */}
  </SimpleBar>
);

DrawerContent.propTypes = {
  navigation: PropTypes.object
};

export default DrawerContent;
