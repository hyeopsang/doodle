// routes.tsx
import {createBrowserRouter} from 'react-router';
import Layout from './components/layout';
import HomePage from './pages/home';
import DraftPage from './pages/draft';
import CreatePage from './pages/create';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {index: true, element: <HomePage />},
      {path: '/create', element: <CreatePage />},
    ],
  },
  {
    path: '/draft',
    element: <DraftPage />,
  },
]);
