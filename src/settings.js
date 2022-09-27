let ENV = 'prod';
if (window.location.hostname === 'localhost') {
    ENV = 'local';
}

const Settings = {
    apiHost: {
        local: 'http://localhost:3001',
        prod: 'https://forever-fit-db.herokuapp.com'
    },

    get: (key) => {
        return Settings[key] ? Settings[key][ENV] : undefined;
    }
}

export default Settings;
