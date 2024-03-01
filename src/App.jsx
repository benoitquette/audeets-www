import Routes from '~/routes';
import ThemeCustomization from '~/themes';
import ScrollTop from '~/components/ScrollTop';

const App = () => {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
