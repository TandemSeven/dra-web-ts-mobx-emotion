// third party
import { createBrowserHistory } from 'history';
import { configure as configureMobx } from 'mobx';
import { syncHistoryWithStore } from 'mobx-react-router';

// first party
import { injectables } from '#router';

// mobx + history integration
const browserHistory = createBrowserHistory({ basename: '/' });
configureMobx({ enforceActions: 'observed' }); // enable "strict mode"
export const history = syncHistoryWithStore(browserHistory, injectables.routerStore);
export { Router } from 'react-router';
