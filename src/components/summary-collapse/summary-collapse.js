import React, { Component } from 'react';
import Collapse from '@material-ui/core/Collapse';
import Arrow from '../../img/atyla-design-v1/arrow_left.png';

class SummaryCollapse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }
  render() {
    const { title, children } = this.props;
    const { collapsed } = this.state;

    return (
      <div>
        <div
          className={'summaryCollapse-header'}
          onClick={e => this.setState({ collapsed: !collapsed })}
        >
          {title}
          <div>
            <img
              src={Arrow}
              heigh={10}
              width={10}
              alt=""
              className={'summaryCollapse-arrow mod-up'}
            />
            <img
              src={Arrow}
              heigh={10}
              width={10}
              alt=""
              className={'summaryCollapse-arrow mod-down'}
            />
          </div>
        </div>
        <div>
          <Collapse in={collapsed}>{children}</Collapse>
        </div>
      </div>
    );
  }
}

export default SummaryCollapse;
