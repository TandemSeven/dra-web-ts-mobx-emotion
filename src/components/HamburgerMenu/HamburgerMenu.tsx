import React, { Component, ChangeEvent, SyntheticEvent } from 'react';
import { inject, observer } from 'mobx-react';
import styled, { css } from 'react-emotion';
import Drawer, { DrawerClassKey } from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';

import { GlobalStoreProps, LocationStoreProps } from '#stores';
import { Button, H1 } from '#components';
import { LOADING } from '#constants';

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
  locationStore: LocationStoreProps;
}

interface HamburgerMenuState {
  [x: string]: string;
}

@inject('globalStore', 'locationStore')
@observer
export class HamburgerMenu extends Component<
  HamburgerMenuProps,
  HamburgerMenuState
> {
  state: HamburgerMenuState = {
    zipCode: '',
  };
  get injected(): InjectedProps {
    return this.props as InjectedProps;
  }
  handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [name]: e.target.value,
    });
  };
  handleSearch = (e: SyntheticEvent) => {
    const { updateCityByZip } = this.injected.locationStore;
    e.preventDefault();
    updateCityByZip(this.state.zipCode);
  };
  render() {
    const {
      isHamburgerOpen,
      appState,
      toggleHamburgerMenu,
    } = this.injected.globalStore;
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
            label="Search by Zipcode"
            margin="normal"
            onChange={this.handleChange('zipCode')}
            placeholder="Search by Zipcode"
            value={this.state.zipCode}
            variant="outlined"
          />
          <Button
            disabled={appState === LOADING || !this.state.zipCode}
            onClick={this.handleSearch}
            variant="contained"
          >
            Search
          </Button>
        </Form>
      </Drawer>
    );
  }
}
