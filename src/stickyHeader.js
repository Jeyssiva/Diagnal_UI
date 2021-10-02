import React from 'react';
import { Grid, Paper } from '@material-ui/core';

function StickyHeader({ classes, children, ...restProps }) {
  return (
    <Grid
      component={Paper}
      container
      alignItems="baseline"
      class = 'sticky z-1000 bg-black justify-items-center'
      {...restProps}
    >
      {children}
    </Grid>
  );
}

export default StickyHeader;
