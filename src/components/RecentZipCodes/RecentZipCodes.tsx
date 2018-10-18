import React, { Component, SyntheticEvent } from 'react';
import { inject, observer } from 'mobx-react';
import { css } from 'react-emotion';
import { LocationStoreProps } from '#stores';
import { RecentZipsTitle } from './styled';
import { FlexColumn } from '#common';
import { Button } from '#components/Button';

export interface RecentZipCodesProps {}

interface InjectedProps extends RecentZipCodesProps {
  locationStore: LocationStoreProps;
}

@inject('locationStore')
@observer
export class RecentZipCodes extends Component<RecentZipCodesProps> {
  get injected(): InjectedProps {
    return this.props as InjectedProps;
  }

  fetchRecentZip = (e: SyntheticEvent, zipCode: string) => {
    this.injected.locationStore.updateCityByZip(zipCode);
  };

  clearRecentZipCodes = () => {
    this.injected.locationStore.clearRecentZipCodes();
  };

  render() {
    const { recentZipCodes } = this.injected.locationStore;
    return (
      <>
        <RecentZipsTitle variant="h6">
          Recent zip code searches:
        </RecentZipsTitle>
        <FlexColumn
          className={css`
            padding: 0 1.5rem;
          `}
        >
          <ul>
            {recentZipCodes.map(rz => (
              <li key={rz}>
                <Button
                  className={css`
                    display: block;
                  `}
                  onClick={e => this.fetchRecentZip(e, rz)}
                  variant="text"
                  color="primary"
                >
                  {rz}
                </Button>
              </li>
            ))}
          </ul>
          <Button
            color="secondary"
            onClick={this.clearRecentZipCodes}
            type="submit"
            variant="extendedFab"
          >
            Clear recent zip codes
          </Button>
        </FlexColumn>
      </>
    );
  }
}
