import StartPage from './pages/Start/StartPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import OrganizerPage from './pages/Organizer/OrganizerPage';
import ShopPage from './pages/Shop/ShopPage';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.tsx/Navbar';
import ContactsPage from './pages/Contacts/ContactsPage';
import ArtistsPage from './pages/Artists/ArtistsPage';
import { useAppSelector } from './store/hooks';

const HeaderLayout = () => {
  const loggedUserId = useAppSelector((state: any) => state.auth.user._id);

  return (
    <>
      {loggedUserId && <Navbar />}
      <Outlet />
    </>
  );
};

const ProtectedRoute = ({ element, path }: any) => {
  const loggedUserId = useAppSelector((state: any) => state.auth.user._id);

  return loggedUserId ? element : <Navigate to="/login" />;
};

const appRoutes = [
  {
    element: <HeaderLayout />,
    children: [
      {
        path: '/',
        element: <StartPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/organizer',
        element: (
          <ProtectedRoute element={<OrganizerPage />} path="/organizer" />
        )
      },
      {
        path: '/shop',
        element: <ProtectedRoute element={<ShopPage />} path="/shop" />
      },
      {
        path: '/contacts',
        element: <ProtectedRoute element={<ContactsPage />} path="/contacts" />
      },
      {
        path: '/artists',
        element: <ProtectedRoute element={<ArtistsPage />} path="/artists" />
      }
    ]
  }
];

export default appRoutes;
