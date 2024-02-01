import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import appRoutes from './routes';
import { GlobalStyle } from './GlobalStyle';

const router = createBrowserRouter(appRoutes);

const App = () => {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
      <BrowserRouter />
    </>
  );
};

export default App;
