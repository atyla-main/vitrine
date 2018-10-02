import React, { Component } from 'react';
import Clauses from './clauses';
import CrossBlack from '../../img/atyla-design-v1/cross_black.png';

class ClauseList extends Component {
  render() {
    const {
      fields,
      meta: { error, submitFailed }
    } = this.props;

    return (
      <div>
        {fields.map((clause, index) => {
          return (
            <Clauses
              key={index}
              index={index}
              clause={clause}
              fields={fields}
            />
          );
        })}
        <div className={'mandant-bottomButton'}>
          <button
            className={'mandant-addButton mod-margin'}
            type="button"
            onClick={() => fields.push({})}
          >
            Ajouter une clause  <img
              src={CrossBlack}
              alt=""
              height={20}
              width={20}
            />
          </button>
          {submitFailed && error && <span>{error}</span>}
        </div>
      </div>
    );
  }
}

export default ClauseList;
