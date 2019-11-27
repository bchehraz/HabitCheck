import React from 'react';
import { Link } from 'gatsby';
import { AuthConsumer } from '../context/auth-context';
import { logout } from '../utils/auth';

const Status = () => (
  <AuthConsumer>
    {context => context.token && (
      <div>
        <p>
          <Link to="/" onClick={e => {
            e.preventDefault();
            logout(() => context.logout());
          }}>
            {`<Emergency Log Out>`}
          </Link>
        </p>
      </div>
    )}
  </AuthConsumer>
);

export default Status;
