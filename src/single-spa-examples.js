import {declareChildApplication, start} from 'single-spa';
import 'babel-polyfill';

declareChildApplication('navbar', () => import('./navbar/navbar.app.js'), () => true);
declareChildApplication('main', () => import('./main/react.app.js'), pathPrefix('/main'));
declareChildApplication('landing', () => import('./main/react.app.js'), pathPrefix('/landing'));
declareChildApplication('first', () => import('./main/react.app.js'), pathPrefix('/'));
start();

function pathPrefix(prefix) {
    return function(location) {
        let fx = location.pathname.indexOf(`${prefix}`) === 0; 
        return fx;
    }
}
