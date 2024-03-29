import Routes from '~/routes/Routes';
import ThemeCustomization from '~/themes';
import ScrollTop from '~/components/ScrollTop/ScrollTop';

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
