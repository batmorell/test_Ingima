import React from 'react';

var axios = require('axios');

class AlbumPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      albums: []
    };
  }

  componentDidMount() {
    this.getAlbums();
  }

  getAlbums(){

    var _this = this;
    this.serverRequest =
      axios
        .get("http://localhost:3000/api/artist/"+ this.props.params.idArtist )
        .then(function(result) {
          _this.setState({
            albums: result.data.items
          });
        })
  };

  render() {
    return (
      <div>

        <div className='container'>
          <ol className='breadcrumb'>
            <li><a href='/'>Recherche</a></li>
            <li className='active'>{ 'Artist' }</li>
          </ol>
          <div className='page-header'>
            <h1>Albums</h1>
            <h2>{ 'Artist' }</h2>
          </div>
          <div className='container albums'>
            <div className='row'>
              {this.state.albums.map(function(album) {
                return (
                  <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3' key={album.id}>
                    <div className='thumbnail text-center'>
                      <a href={'/artist/' + album.id}>
                        <img src={album.images[1].url} alt={album.name} />
                      </a>
                      <div className='caption'>
                        <h4>{album.name}</h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default AlbumPage;
