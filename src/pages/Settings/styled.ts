import Grid from '@material-ui/core/Grid';
import styled from 'react-emotion';

export const SettingsWrapper = styled(Grid)`
  background: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
`;
