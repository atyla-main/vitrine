import React, { Component } from 'react';

class ElementsList extends Component {
  render() {
    const { list } = this.props;

    return (
      <div>
        <div className={'elementsList-line elementsList-header'}>
          <div className={'elementsList-element1'}>id</div>
          <div className={'elementsList-element2'}>intitulé</div>
          <div className={'elementsList-element3'}>valeur</div>
        </div>
        <div>
          {list && list.length > 0 ? (
            <div>
              {list.map(item => {
                return (
                  <div key={item.id} className={'elementsList-line'}>
                    <div className={'elementsList-element1'}>{item.id}</div>
                    <div className={'elementsList-element2'}>
                      {item.attributes.wording}
                    </div>
                    <div className={'elementsList-element3'}>
                      {item.attributes.status || item.attributes.city}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={'elementsList-emptyMessage'}>
              Aucun elements de disponible
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ElementsList;
