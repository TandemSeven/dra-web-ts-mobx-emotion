import React, { SFC } from 'react';
import styled from 'react-emotion';
import { colors } from '#themes';

const HourWrapper = styled('span')`
  font-size: 3rem;
  font-weight: bold;
  color: ${colors.grey['600']};
  padding: 0 .76875rem;
`;

export interface HourProps {
  hours: number;
}

export const Hour: SFC<HourProps> = ({ hours }) => (
  <HourWrapper>{hours}</HourWrapper>
);
