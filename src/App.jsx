import { Outlet } from 'react-router-dom';
import { Navbar, Footer, ScrollToTop } from '@/components'
function App() {
  return (
    <>
      <Navbar />
      APP
      <Outlet />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
