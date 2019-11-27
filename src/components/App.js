import React from 'react';
import { Link } from 'gatsby';

import { AuthConsumer } from '../context/auth-context';
import { logout } from '../utils/auth.js';

const App = () => (
  <AuthConsumer>
    {context => (
      <div
        style={{
          padding: 25,
          border: '5px solid blue',
        }}
      >
        <h1>*The App*</h1>
        <h2>
          <Link
            to="/"
            onClick={event => {
              event.preventDefault();
              logout(() => context.logout());
            }}
          >
            Log Out!
          </Link>
        </h2>
      </div>
    )}
  </AuthConsumer>
);

export default App;
