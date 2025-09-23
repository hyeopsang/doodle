// routes.tsx
import {createBrowserRouter} from 'react-router';
import Layout from './components/layout';
import HomePage from './pages/home';
import DraftPage from './pages/draft';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{index: true, element: <HomePage />}],
  },
  {
    path: '/draft',
    element: <DraftPage />,
  },
]);
