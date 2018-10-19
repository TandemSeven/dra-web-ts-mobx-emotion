import { Typography } from '@material-ui/core';
import styled from 'react-emotion';

export const RecentZipsTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.dark};
  text-align: center;
  margin: 3.25rem 0 0;
  text-decoration: underline;
  font-weight: 200;
`;
