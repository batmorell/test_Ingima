import React from 'react';
import Link from 'react-router';
var axios = require('axios');

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: []
    };
  }

  searchArtist(){
    console.log('research');

    var _this = this;
    this.serverRequest =
      axios
        .get("http://localhost:3000/api/search")
        .then(function(result) {
          _this.setState({
            jobs: result.data.items
          });
        })
  };

  render() {
    return (
      <div>
        <div>
          <div className='container'>
            <div className='page-header'>
              <h1>Artistes</h1>
              <button className='btn btn-primary' onClick={() => this.searchArtist()}>Chercher</button>
            </div>
            <div className='panel panel-default'>
              <div className='panel-heading'>Rechercher un artiste Spotify</div>
              <div className='panel-body'>
                <form className='form-inline' onSubmit={this.searchArtist}>
                  <div className='form-group'>
                    <input type='search' className='form-control' placeholder='Mot(s)-clé(s)' />
                  </div>
                  <button className='btn btn-primary' type="submit">Chercher</button>
                </form>
              </div>
            </div>
          </div>
          <div className='container artists'>
            {this.state.jobs.map(function(job) {
              return (
                <div key={job.id} className='media'>
                  <div className='media-left'>
                    <a href={'/album/' + job.id}>
                      <img className='media-object' src={job.images[2].url} alt='*' />
                    </a>
                  </div>
                  <div className='media-body'>
                    <h4 className='media-heading'>{job.name}</h4>
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
      </div>
    );
  }
}

export default SearchPage;
