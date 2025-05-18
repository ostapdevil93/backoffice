import axios, {CreateAxiosDefaults} from 'axios';

// export const api = axios.create({
//     baseURL: 'https://backoffice.adva.dev.millenial-tech.ru'
// } as CreateAxiosDefaults);

  export const api = axios.create({
    baseURL: window.location.origin
} as CreateAxiosDefaults);
