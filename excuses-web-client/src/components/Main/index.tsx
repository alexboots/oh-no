import React from 'react';
import { Box } from 'bumbag';
import { Tooltip } from 'components/UI/tooltip';

export const Main: React.FC = ({ children }) => {
  return (
    <>
      <Box height="300px" alignX="center"  alignY="center" width="300px"  backgroundColor="green">
        <Box backgroundColor="red" width="80px">
          <Tooltip message="something">
            <div>hello</div>
          </Tooltip>
        </Box>
      </Box>
      { children }
    </>
  );
};
