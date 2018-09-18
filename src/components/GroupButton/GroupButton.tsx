import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ToggleButton, { ToggleButtonClassKey } from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup, { ToggleButtonGroupClassKey } from '@material-ui/lab/ToggleButtonGroup';
import { css } from 'react-emotion';

import { CalendarStoreProps } from '#stores';
import { CalendarView } from '#types';
import { DAILY, WEEKLY } from '#constants';
import { primaryTheme } from '#themes';

const buttons = [DAILY, WEEKLY];

const ToggleButtonGroupRoot = css`
	border: 1px solid #fff;
	height: 100%;
	border-radius: 0.25rem;
`;

const ToggleButtonSelected = (selected: boolean) => css`
	background: #fff;
	color: transparent;
  &:hover {
    opacity: ${selected ? 0.9 : 1};
    background: ${selected ? '#fff' : primaryTheme.primary.main};
  }
`;

const ToggleButtonLabel = (selected: boolean) => css`
	text-transform: capitalize;
	color: ${selected ? primaryTheme.primary.main : '#fff'};
`;

const ToggleButtonGroupClasses: { [K in ToggleButtonGroupClassKey]?: string } = {
  root: ToggleButtonGroupRoot,
};
const ToggleButtonClasses: (selected: boolean) => { [K in ToggleButtonClassKey]?: string } = (selected) => ({
  selected: ToggleButtonSelected(selected),
  label: ToggleButtonLabel(selected),
});

export interface GroupButtonProps { }

interface InjectedProps extends GroupButtonProps {
  calendarStore: CalendarStoreProps;
}

@inject('calendarStore')
@observer
export class GroupButton extends Component<GroupButtonProps> {
  get injected(): InjectedProps {
    return this.props as InjectedProps;
  }

  changeButton = (e: React.SyntheticEvent, view: CalendarView) => {
    this.injected.calendarStore.changeCalendarView(view);
  }

  render() {
    const { calendarView } = this.injected.calendarStore;
    return (
      <ToggleButtonGroup classes={ToggleButtonGroupClasses} exclusive={true} onChange={this.changeButton}>
        {buttons.map((b) => {
          const selected = calendarView === b;
          return (
            <ToggleButton classes={ToggleButtonClasses(selected)} key={b} selected={selected} value={b}>
              {b}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    );
  }
}
