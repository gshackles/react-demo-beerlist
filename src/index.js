import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import SearchService from './api/SearchService';

const searchService = new SearchService();

render(<App searchService={searchService} />, document.getElementById('content'));