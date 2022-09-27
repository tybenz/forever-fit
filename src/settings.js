import { ENV } from './env.json';

const Settings = {
    apiHost: {
        local: 'http://localhost:3001',
        prod: 'http://localhost:3001'
    },

    get: (key) => {
        return Settings[key] ? Settings[key][ENV] : undefined;
    }
}

export default Settings;
