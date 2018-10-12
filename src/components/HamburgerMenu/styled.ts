import styled, { css } from 'react-emotion';
import { DrawerClassKey } from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';

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
  height: inherit;
  h1 {
    margin-bottom: 1.25rem;
  }
`;

export const MenuIconButton = styled(IconButton)`
  color: white;
  align-self: self-end;
  margin-top: -3rem;
  position: absolute;
  z-index: 1;
  right: 3rem;
  top: 4rem;
`;
