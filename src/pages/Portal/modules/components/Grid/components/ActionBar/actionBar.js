import React from 'react';
import { StyledToolbar } from 'styles/toolbar.style';
import SearchTable from 'components/SearchTable';

const ActionBar = () => {
  return (
    <StyledToolbar>
      <SearchTable sx={{ mr: 2 }} placeholder="Search grid..." field="name" />
    </StyledToolbar>
  );
};

export default ActionBar;
