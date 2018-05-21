import React from 'react';
import i18n from '../services/i18n';
import { Button } from 'react-bootstrap';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: ''
    };
    this.getIcos = this.getIcos.bind(this);
  }
  getIcos(event) {
    event.preventDefault();
    fetch(
      `${process.env.REACT_APP_APIV1_URL}icos?search=${this.search.value}`,
      {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    ).then(res => res.json());
  }
  render() {
    return (
      <div>
        <div className="homepageBody">
          <div className="leftSide">
            <h2>The easiest way to participate in ICO's</h2>
            <br />
            <ul>
              <li>Browse projects</li>
              <li>Pay those you stand for</li>
              <li>Get your token</li>
            </ul>
            <form onSubmit={this.getIcos}>
              <input
                ref={search => (this.search = search)}
                className="searchIcos"
                placeholder="Search an ICO"
                name="search"
              />
              <Button bsStyle="danger" type="submit" className="icos-button">
                Search
              </Button>
              <div className="resIcos">{this.res}</div>
            </form>
          </div>
          <div className="rightSide" />
        </div>
      </div>
    );
  }
}

export default HomePage;
