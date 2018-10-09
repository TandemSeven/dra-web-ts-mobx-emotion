import React, { Component, ChangeEvent } from 'react';
import { inject, observer } from 'mobx-react';
import styled, { css } from 'react-emotion';
import Drawer, { DrawerClassKey } from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';

import { GlobalStoreProps } from '#stores';
import { Button, H1 } from '#components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1.25rem;
  h1 {
    margin-bottom: 1.25rem;
  }
`;

const PaperAnchorRightClass = css`
  width: 25rem;
  display: flex;
  align-items: center;
`;

const DrawerClasses: { [K in DrawerClassKey]?: string } = {
  paperAnchorRight: PaperAnchorRightClass,
};

export interface HamburgerMenuProps {
  isOpen: boolean;
}

interface InjectedProps extends HamburgerMenuProps {
  globalStore: GlobalStoreProps;
}

interface HamburgerMenuState {
  [x: string]: string;
}

@inject('globalStore')
@observer
export class HamburgerMenu extends Component<
  HamburgerMenuProps,
  HamburgerMenuState
> {
  state: HamburgerMenuState = {
    city: '',
  };
  get injected(): InjectedProps {
    return this.props as InjectedProps;
  }
  handleChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  render() {
    const { isHamburgerOpen, toggleHamburgerMenu } = this.injected.globalStore;
    return (
      <Drawer
        anchor="right"
        classes={DrawerClasses}
        open={isHamburgerOpen}
        onClose={toggleHamburgerMenu}
      >
        <Form>
          <H1>WeatherVane</H1>
          <TextField
            id="outlined-with-placeholder"
            label="Search by city"
            placeholder="Search by city"
            margin="normal"
            onChange={this.handleChange('city')}
            variant="outlined"
            value={this.state.city}
          />
          <Button onClick={() => {}} variant="contained">
            Search
          </Button>
        </Form>
      </Drawer>
    );
  }
}
