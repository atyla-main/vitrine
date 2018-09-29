import React, { Component } from 'react';
import Collapse from '@material-ui/core/Collapse';

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
        </div>
        <div>
          <Collapse in={collapsed}>{children}</Collapse>
        </div>
      </div>
    );
  }
}

export default SummaryCollapse;
