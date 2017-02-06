import React from 'react';
var axios = require('axios');

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: [],
      artistSearch: ''
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.searchArtist = this.searchArtist.bind(this);
  }

  handleSearchChange(e) {
    this.setState({artistSearch: e.target.value});
  }

  searchArtist(e){
    axios.get("http://localhost:3000/api/search/" + this.state.artistSearch)
      .then((response) => {
        var artists = response.data.items;
        this.setState({artists : artists});
      });

    e.preventDefault();
  };

  render() {
    return (
      <div>
      <div>
        <div className='container'>
          <div className='page-header'>
            <h1>Artistes</h1>
          </div>
          <div className='panel panel-default'>
            <div className='panel-heading'>Rechercher un artiste Spotify</div>
            <div className='panel-body'>
              <form className='form-inline'>
                <div className='form-group'>
                  <input type="search" className='form-control' placeholder='Mot(s)-clé(s)' onChange={this.handleSearchChange} />
                </div>
                <button className='btn btn-primary' onClick={this.searchArtist}>Chercher</button>
              </form>
            </div>
          </div>
        </div>
        <div className='container artists'>
          {this.state.artists.map((artist, index) => {
            return (
              <div key={artist.id} className='media'>
                <div className='media-left'>
                  <a href={'/artist/' + artist.id}>
                    <img className='media-object' src={this.state.artists[0].images[3].url} alt='*' />
                  </a>
                </div>
                <div className='media-body'>
                  <h4 className='media-heading'>{artist.name}</h4>
                </div>
              </div>
            );
          })}
        </div>

      </div>
      <div className='container text-center'>
        <nav aria-label='Page navigation'>
          <ul className='pagination'>
            <li>
              <a href='#' aria-label='Previous'>
                <span aria-hidden='true'>&laquo;</span>
              </a>
            </li>
            <li><a href='#'>1</a></li>
            <li><a href='#'>2</a></li>
            <li><a href='#'>3</a></li>
            <li><a href='#'>4</a></li>
            <li><a href='#'>5</a></li>
            <li>
              <a href='#' aria-label='Next'>
                <span aria-hidden='true'>&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>)
  }
}

export default SearchPage;
