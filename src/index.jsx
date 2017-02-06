import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import App from './components/App.jsx';

import NotFoundPage from './components/NotFoundPage.jsx';
import SearchPage from './components/SearchPage.jsx';
import AlbumPage from './components/AlbumPage.jsx';
import ArtistPage from './components/ArtistPage.jsx';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={SearchPage} />
      <Route path="/album/:idAlbum" component={AlbumPage} />
      <Route path="/artist/:idArtist" component={ArtistPage} />

      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
), document.getElementById('root'));
