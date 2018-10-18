import React, { Component, ChangeEvent, SyntheticEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Close from '@material-ui/icons/Close';
import { css } from 'emotion';

import { Button, RecentZipCodes } from '#components';
import { GlobalStoreProps, LocationStoreProps } from '#stores';
import { LOADING } from '#constants';
import { FlexContainer } from '#common';

import { DrawerClasses, Form, FormWrapper, Title } from './styled';

export interface HamburgerMenuProps {
  isOpen: boolean;
}

interface InjectedProps extends HamburgerMenuProps {
  globalStore: GlobalStoreProps;
  locationStore: LocationStoreProps;
  routerStore: RouterStore;
}

interface HamburgerMenuState {
  [x: string]: string;
}

@inject('globalStore', 'locationStore', 'routerStore')
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
  handleCurrentLocation = (e: SyntheticEvent) => {
    const { init } = this.injected.globalStore;
    e.preventDefault();
    init();
  };
  render() {
    const {
      isHamburgerOpen,
      appState,
      toggleHamburgerMenu,
    } = this.injected.globalStore;
    const currentRoute = window.location.pathname;
    return (
      <Drawer
        anchor="right"
        classes={DrawerClasses}
        open={isHamburgerOpen}
        onClose={toggleHamburgerMenu}
      >
        <FormWrapper>
          <Button
            color="secondary"
            className={css`
              margin: 0.625rem 0.3125rem 0;
            `}
            onClick={toggleHamburgerMenu}
            mini={true}
            variant="fab"
          >
            <Close />
          </Button>
          <Form>
            <Title variant="h1">WeatherVane</Title>
            <TextField
              disabled={appState === LOADING}
              fullWidth={true}
              label="Search by Zipcode"
              margin="normal"
              onChange={this.handleChange('zipCode')}
              placeholder="Search by Zipcode"
              type="number"
              value={this.state.zipCode}
              variant="outlined"
            />
            <FlexContainer
              className={css`
                width: 100%;
                justify-content: space-between;
                > button:nth-of-type(1) {
                  margin-right: 0.3125rem;
                }
              `}
            >
              <Button
                color="primary"
                disabled={appState === LOADING || !this.state.zipCode}
                onClick={this.handleSearch}
                type="submit"
                variant="extendedFab"
              >
                Search
              </Button>
              <Button
                color="secondary"
                disabled={appState === LOADING}
                onClick={this.handleCurrentLocation}
                type="submit"
                variant="extendedFab"
              >
                Current Location
              </Button>
            </FlexContainer>
          </Form>
          <RecentZipCodes />
        </FormWrapper>
        <List>
          <NavLink to={currentRoute === '/settings' ? '/' : '/settings'}>
            <ListItem button={true} onClick={toggleHamburgerMenu}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText
                secondary={currentRoute === '/settings' ? 'Home' : 'Settings'}
              />
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
    );
  }
}
