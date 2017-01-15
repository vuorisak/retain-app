import  * as services from './services';
export { App } from './app';

// this maps all services under services folder to array for used in the app
const mapToValuesToArray = (obj) => Object.keys(obj).map(key => obj[key]);

// include all services under services folder
export const providers = [
    ...mapToValuesToArray(services)
]