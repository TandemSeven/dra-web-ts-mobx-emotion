import { injectGlobal } from 'react-emotion';
import 'typeface-montserrat';

/* tslint:disable:no-unused-expression */
injectGlobal`
  * {
    font-family: Montserrat,sans-serif;
    font-weight: normal;
    position: relative;
  }
  body {
    margin: 0;
    a {
      text-decoration: none;
    }
  }
`;

export * from './Colors';
export * from './Themes';
/* tslint:enable:no-unused-expression */
