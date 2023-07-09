import React, { useState } from 'react';
import './App.scss';
import classNames from 'classnames';
import { Table } from './components/Table/Table';

import usersFromServer from './api/users';
import photosFromServer from './api/photos';
import albumsFromServer from './api/albums';

const preparedPhotos = photosFromServer.map(photo => {
  const album = albumsFromServer.find(albm => albm.id === photo.albumId)
    || null;
  const user = usersFromServer.find(usr => usr.id === album.userId)
    || null;

  return {
    ...photo,
    album,
    user,
  };
});

function getVisiblePhotos(
  photos,
  query,
  userId,
  albumIds,
) {
  let visiblePhotos = [...photos];
  const normalizedQuery = query.trim().toLowerCase();

  if (query) {
    visiblePhotos = visiblePhotos
      .filter(photo => photo.title.toLowerCase().includes(normalizedQuery));
  }

  if (userId) {
    visiblePhotos = visiblePhotos.filter(photo => photo.user.id === userId);
  }

  if (albumIds.length > 0) {
    visiblePhotos = visiblePhotos.filter(photo => (
      albumIds.some(id => id === photo.albumId)
    ));
  }

  return visiblePhotos;
}

export const App = () => {
  const [query, setQuery] = useState('');
  const [userId, setUserId] = useState(0);
  const [albumIds, setAlbumIds] = useState([]);

  function isAlbumSelected(albumId) {
    return albumIds.includes(albumId);
  }

  function toggleAlbum(albumId) {
    if (isAlbumSelected(albumId)) {
      setAlbumIds(albumIds.filter(id => id !== albumId));
    } else {
      setAlbumIds([...albumIds, albumId]);
    }
  }

  const visiblePhotos = getVisiblePhotos(
    preparedPhotos,
    query,
    userId,
    albumIds,
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Photos from albums</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                href="#/"
                className={classNames({ 'is-active': !userId })}
                onClick={() => setUserId(0)}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  href="#/"
                  className={classNames({ 'is-active': userId === user.id })}
                  onClick={() => setUserId(user.id)}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      type="button"
                      className="delete"
                      onClick={() => setQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                className={classNames('button is-success mr-6', {
                  'is-outlined': albumIds.length > 0,
                })}
                onClick={() => setAlbumIds([])}
              >
                All
              </a>

              {albumsFromServer.map(album => (
                <a
                  key={album.id}
                  className={classNames('button mr-2 my-1', {
                    'is-info': isAlbumSelected(album.id),
                  })}
                  href="#/"
                  onClick={() => toggleAlbum(album.id)}
                >
                  {album.title.split(' ').slice(0, 1)}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setQuery('');
                  setUserId(0);
                  setAlbumIds([]);
                }}
              >
                Reset all filters
              </a>

            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visiblePhotos.length === 0
            ? (
              <p data-cy="NoMatchingMessage">
                No photos matching selected criteria
              </p>
            ) : (
              <Table photos={visiblePhotos} />
            )}
        </div>
      </div>
    </div>
  );
};
