import React from 'react';
var axios = require('axios');

class ArtistPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      album: [],
      tracks: [],
      image: [],
      artist: []
    };
  }

  componentDidMount() {
    this.getAlbum();
  }

  getAlbum(){
    var _this = this;
    axios
      .get("http://localhost:3000/api/album/"+ this.props.params.idAlbum)
      .then(function(result) {
        _this.setState({
          album: result.data,
          tracks: result.data.tracks.items,
          image: result.data.images[0],
          artist: result.data.artists[0],
        });
      })
  };

  msToMS( ms ) {
  // 1- Convert to seconds:
  var seconds = ms / 1000;
  // 2- Extract hours:
  var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;
  return( minutes+":"+seconds);
}

  render() {
    return (
      <div>
        <div className='container'>
          <ol className='breadcrumb'>
            <li><a href='/'>Recherche</a></li>
            <li><a href={'/artist/' + this.state.artist.id}>{ 'Artist' }</a></li>
            <li className='active'>{ 'Album' }</li>
          </ol>
          <div className='page-header'>
            <h1>Pistes</h1>
            <h2>{this.state.album.name}</h2>
          </div>
          <div className='row'>
            <div className='col-xs-12 col-md-6 col-lg-6'>
              <img src={this.state.image.url} className='thumbnail img-responsive' alt={ 'Album name' } />
            </div>
            <div className='col-xs-12 col-md-6 col-lg-6'>
              <ul className='list-group'>
                {this.state.tracks.map(function(track) {
                  return (
                    <li className='list-group-item' key={track.id}>#. {track.name} <span className='badge'>{parseInt(track.duration_ms/60/1000) + ':' +  parseInt(track.duration_ms/1000%60) }</span></li>
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

