import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import UserRoles from '../pages/UserRoles';
import UserManagement from '../pages/UserManagement';
import Dashboard from '../pages/Dashboard';
import AutoResponse from '../pages/AutoResponse';
import Customers from '../pages/Customers';
import Subscriptions from '../pages/Subscriptions';
import Books from '../pages/Books';
import BookCreate from '../components/books/BookCreate';
import BookEdit from '../components/books/BookEdit';
import Anime from '../pages/Anime';
import AnimeCreate from '../components/anime/AnimeCreate';
import AnimeEdit from '../components/anime/AnimeEdit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Dashboard />,
      },
      {
        path: 'user-roles',
        element: <UserRoles />,
      },
      {
        path: 'user-management',
        element: <UserManagement />,
      },
      {
        path: 'auto-response',
        element: <AutoResponse />,
      },
      {
        path: 'customers',
        element: <Customers />,
      },
      {
        path: 'subscriptions',
        element: <Subscriptions />,
      },
      {
        path: 'books',
        element: <Books />,
        children: [
          {
            path: 'create',
            element: <BookCreate/>
          },
          {
            path: ':id/edit',
            element: <BookEdit/>
          }
        ]
      },
      {
        path: 'anime',
        element: <Anime />,
        children: [
          {
            path: 'create',
            element: <AnimeCreate/>
          },
          {
            path: ':id/edit',
            element: <AnimeEdit/>
          }
        ]
      }

      
    ],
  },
]);

export default router;
