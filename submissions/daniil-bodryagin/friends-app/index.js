import {App} from './components/App.js';
import {Options} from './components/Options.js';
import {Feed} from './components/Feed.js';

const app = new App('.app', [Options, Feed]);
app.create();
