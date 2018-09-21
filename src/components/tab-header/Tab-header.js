import React, { Component } from 'react';
import CreateButton from '../create-button/Create-button';

class TabHeader extends Component {
  render() {
    const {
      title,
      titleOnly,
      onChange,
      statusList,
      statusToShow,
      openModal
    } = this.props;

    return (
      <div className={'tabHeader'}>
        {statusList ? (
          <div>
            <select
              className={'tabHeader-selectButton'}
              onChange={e => onChange(e)}
              value={statusToShow}
              name="negociatorList"
              form="parameterForm"
            >
              {statusList.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className={'tabHeader-title'}>{title}</p>
        )}
        {!titleOnly && <CreateButton openModal={openModal} />}
      </div>
    );
  }
}

export default TabHeader;
