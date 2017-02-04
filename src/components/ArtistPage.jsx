import React from 'react';

var axios = require('axios');

class ArtistPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      album: [],
      tracks: [],
      image: []
    };
  }

  componentDidMount() {
    this.getAlbum();
  }

  getAlbum(){
    var _this = this;
    this.serverRequest =
      axios
        .get("http://localhost:3000/api/album/"+ this.props.params.idAlbum)
        .then(function(result) {
          _this.setState({
            album: result.data,
            tracks: result.data.tracks.items,
            image: result.data.images
          });
        })
  };

  render() {
    return (
      <div>
        <div className='container'>
          <ol className='breadcrumb'>
            <li><a href='/'>Recherche</a></li>
            <li><a href='#'>{ 'Artist' }</a></li>
            <li className='active'>{ 'Album' }</li>
          </ol>
          <div className='page-header'>
            <h1>Pistes</h1>
            <h2>{this.state.album.name}</h2>
          </div>
          <div className='row'>
            <div className='col-xs-12 col-md-6 col-lg-6'>
              <img src={this.state.image} className='thumbnail img-responsive' alt={ 'Album name' } />
            </div>
            <div className='col-xs-12 col-md-6 col-lg-6'>
              <ul className='list-group'>
                {this.state.tracks.map(function(track) {
                  return (
                    <li className='list-group-item' key={track.id}>#. {track.name} <span className='badge'>{track.duration_ms}</span></li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default ArtistPage;
