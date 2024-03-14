import { render } from '@testing-library/react';
import Router from '../Routes';

describe('Router', () => {
  const routes = [
    '/', 
    '/create',
    '/profile',
    '/logout',
    '/deleted',
    '/home',
    '/userguideline'
  ];

  routes.forEach(route => {
    it(`renders "${route}" page`, () => {
      expect(() => render(<Router />, { route })).not.toThrow();
    });
  });
});
