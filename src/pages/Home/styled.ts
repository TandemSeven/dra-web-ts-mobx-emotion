import Grid from '@material-ui/core/Grid';
import styled from 'react-emotion';

export const MainContent = styled(Grid)`
  justify-content: center;
  height: 40vh;
  background: ${({ theme }) => theme.palette.secondary.main};
`;

export const MainContentWrapper = styled(Grid)`
  max-width: 65rem;
  margin: auto;
  height: 40vh;
  justify-content: space-evenly;
`;
