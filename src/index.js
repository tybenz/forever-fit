import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import AppStore from './stores/AppStore';

(async () => {

    const appStore = new AppStore();
    await appStore.load();

    const root = ReactDOM.createRoot(document.body);
    root.render(
        <React.StrictMode>
            <App appStore={appStore} />
        </React.StrictMode>
    );

})();
