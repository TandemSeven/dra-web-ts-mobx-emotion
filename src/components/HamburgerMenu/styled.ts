import styled, { css } from 'react-emotion';
import { DrawerClassKey } from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { TypographyFlex } from '#common';

const PaperAnchorRightClass = css`
  width: 25rem;
  display: flex;
  align-items: center;
`;

export const DrawerClasses: { [K in DrawerClassKey]?: string } = {
  paperAnchorRight: PaperAnchorRightClass,
};

export const Title = styled(TypographyFlex)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 3rem;
  font-weight: 600;
`;

export const FormWrapper = styled.div`
  width: 100%;
  flex: auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1.25rem;
  height: inherit;
  align-items: center;
  padding: 0 1.5rem;
  h1 {
    margin-bottom: 1.25rem;
  }
`;

export const MenuIconButton = styled(IconButton)`
  color: white;
  position: absolute;
  z-index: 1;
  right: 5rem;
  top: 2rem;
  @media (max-width: 768px) {
    right: 1rem;
  }
`;
