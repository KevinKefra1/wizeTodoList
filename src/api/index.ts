import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { listAssignes } from './data';

const api = new MockAdapter(axios);

api.onGet('/users').reply(200, {
    users: [...listAssignes]
});

export default api;