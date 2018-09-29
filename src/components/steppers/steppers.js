import React, { Component } from 'react';

let steps = [
  'Mandant',
  'Bien',
  'Conditions financiéres',
  'Clauses',
  'Récapitulatif'
];

class Steppers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pageNumber, onPageChange } = this.props;

    return (
      <div>
        {steps.map((step, index) => {
          return (
            <button
              onClick={e => {
                e.preventDefault();
                onPageChange(index);
              }}
              key={index}
            >
              {step}
            </button>
          );
        })}
      </div>
    );
  }
}

export default Steppers;
