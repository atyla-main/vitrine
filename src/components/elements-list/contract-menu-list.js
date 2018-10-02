import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { requestService } from '../../services/request';
import Bin from '../../img/atyla-design-v1/bin_icon.png';
import Edit from '../../img/atyla-design-v1/edit_icon.png';

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
      <div className={'contractMenuList-container'}>
        <div
          className={'contractElementsList-line contractElementsList-header'}
        >
          <div className={'contractElementsList-element1'}>Date</div>
          <div className={'contractElementsList-element2'}>
            Mandant principal
          </div>
          <div className={'contractElementsList-element3'}>Adresse bien</div>
          <div className={'contractElementsList-element4'}>Numéro mandat</div>
          <div className={'contractElementsList-element5'} />
        </div>
        <div className={'contractMenuList-list'}>
          {list.length > 0 ? (
            <div>
              {list.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className={
                      'contractElementsList-line ' +
                      (list.length === index + 1 ? 'mod-last' : '')
                    }
                  >
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
                      <img
                        onClick={e => onEdit(item.id)}
                        src={Edit}
                        height={25}
                        width={20}
                        alt=""
                        className={'contractMenuList-icon mod-margin'}
                      />
                      <img
                        onClick={e => onDelete(item.id)}
                        src={Bin}
                        height={25}
                        width={20}
                        alt=""
                        className={'contractMenuList-icon'}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={'contractElementsList-emptyMessage'}>
              Aucun élément disponible
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ContractMenuList;
