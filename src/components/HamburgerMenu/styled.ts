import styled, { css } from 'react-emotion';
import { DrawerClassKey } from '@material-ui/core/Drawer';

const PaperAnchorRightClass = css`
  width: 25rem;
  display: flex;
  align-items: center;
`;

export const DrawerClasses: { [K in DrawerClassKey]?: string } = {
  paperAnchorRight: PaperAnchorRightClass,
};

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1.25rem;
  h1 {
    margin-bottom: 1.25rem;
  }
`;
