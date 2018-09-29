import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { requestService } from '../../services/request';

class ContractMenuList extends Component {
  constructor(props) {
    super(props);

    this.transformKey = this.transformKey.bind(this);
  }

  transformKey(hash) {
    let newHash = {};

    for (let key in hash) {
      newHash[_.camelCase(key)] = hash[key];
    }

    return newHash;
  }

  render() {
    const { list, onDelete, onEdit } = this.props;

    return (
      <div>
        <div
          className={'contractElementsList-line contractElementsList-header'}
        >
          <div className={'contractElementsList-element1'}>Date</div>
          <div className={'contractElementsList-element2'}>
            Mandant principal
          </div>
          <div className={'contractElementsList-element3'}>Addresse bien</div>
          <div className={'contractElementsList-element4'}>Numéro mandat</div>
          <div className={'contractElementsList-element5'} />
        </div>
        <div>
          {list.length > 0 ? (
            <div>
              {list.map(item => {
                return (
                  <div key={item.id} className={'contractElementsList-line'}>
                    <div className={'contractElementsList-element1'}>
                      {item.date}
                    </div>
                    <div className={'contractElementsList-element2'}>
                      {item.mandant}
                    </div>
                    <div className={'contractElementsList-element3'}>
                      {item.property}
                    </div>
                    <div className={'contractElementsList-element4'}>
                      {item.number}
                    </div>
                    <div className={'contractElementsList-element5'}>
                      <button onClick={e => onEdit(item.id)}>E</button>
                      <button onClick={e => onDelete(item.id)}>D</button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={'contractElementsList-emptyMessage'}>
              Aucun elements de disponible
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ContractMenuList;
