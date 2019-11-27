import React from 'react';

import AppLayout from './AppLayout';

const Journal = ({ path }) => (
  <AppLayout path={path}>
    <h1>{`The "Journal" Tab`}</h1>
  </AppLayout>
);

export default Journal;
