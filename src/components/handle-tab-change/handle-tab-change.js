import React from 'react';

export const HandleTabChange = props => {
  const { handleChange, currentValue } = props;

  return (
    <div className={'tabChange'}>
      <button
        className={
          'tabChange-buttons ' +
          (currentValue === 'pending' ? 'mod-active' : '')
        }
        onClick={handleChange}
        value={'pending'}
      >
        Contrats en cours
      </button>
      <button
        className={
          'tabChange-buttons ' + (currentValue === 'done' ? 'mod-active' : '')
        }
        onClick={handleChange}
        value={'done'}
      >
        Contrats terminés
      </button>
    </div>
  );
};
