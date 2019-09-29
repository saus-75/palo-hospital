import React from 'react';
import { Pane, Heading } from 'evergreen-ui';

const Page404 = () => {
  return (
    <Pane display='flex' width='100%' alignItems='center' justifyContent='center'>
      <Heading size={900} color='#46d19a'>
        Page Not Found!
      </Heading>
    </Pane>
  );
};

export default Page404;
