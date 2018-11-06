import { injectGlobal } from 'react-emotion';
import 'typeface-montserrat';

injectGlobal`
  * {
    font-family: Montserrat,sans-serif;
    font-weight: normal;
    position: relative;
    -webkit-font-smoothing: antialiased;
  }
  body {
    margin: 0;
    main {
      height: 100vh;
    }
    a {
      text-decoration: none;
    }
  }
`;

export * from './Colors';
export * from './Themes';
