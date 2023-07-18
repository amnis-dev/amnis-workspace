/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { schemaState } from '@amnis/state/schema';
import { contextSetup } from '@amnis/state/context';
import { mockService } from '@amnis/mock';
import { processSys, processAuth, processCrud } from '@amnis/api/process';
import { schemaSys, schemaAuth } from '@amnis/api/schema';

import { accountsGet, agentUpdate } from '@amnis/state';
import App from './App.tsx';
import './index.css';

const MockApp: React.FC = () => {
  const [loading, loadingSet] = React.useState(true);

  React.useLayoutEffect(() => {
    (async () => {
      const context = await contextSetup({
        schemas: [schemaState, schemaSys, schemaAuth],
      });

      await mockService.setup({
        hostname: 'http://localhost:5000',
        baseUrl: '/api',
        context,
        processes: {
          sys: processSys,
          auth: processAuth,
          crud: processCrud,
        },
      });

      await mockService.start({
        onUnhandledRequest: 'bypass',
      });

      const accounts = await accountsGet();
      const account = accounts.admin;

      await agentUpdate({
        credentialId: account.credential.$id,
        publicKey: account.credential.publicKey,
        privateKey: account.privateKey,
      });
      await store.dispatch(
        apiSys.endpoints.system.initiate({
          url: 'http://localhost:5000/api/sys/system',
          set: true,
        }),
      );
      await store.dispatch(apiAuth.endpoints.login.initiate({
        handle: account.handle,
        password: account.password,
      }));

      loadingSet(false);
    })();
  }, []);

  return (
    <Provider store={store}>
      {loading ? 'DEVELOPMENT MODE: Mock service is starting...' : (
        <React.Suspense fallback="DEVELOPMENT MODE: Loading components...">
          <Router />
        </React.Suspense>
      )}
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
