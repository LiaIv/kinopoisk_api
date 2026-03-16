import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from '../Header/Header';

function Layout() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
