import React, { Component } from 'react';
import Auth from '../../services/Auth';
import { connect } from 'react-redux';
import Mandates from '../../components/relations/mandates';
import Properties from '../../components/relations/properties';
import Mandants from '../../components/relations/mandants';
import Contacts from '../../components/relations/contacts';

class Relations extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { user, dispatch } = this.props;
    let userId = Auth.getId();
  }

  render() {
    const {
      offices,
      negociators,
      parameters,
      onChange,
      onChangeCheck,
      onSubmit,
      properties,
      mandants,
      notaries,
      mediators
    } = this.props;

    return (
      <div>
        <p>Page 1</p>
        <Mandates
          onChange={onChange}
          onChangeCheck={onChangeCheck}
          parameters={parameters}
          onSubmit={onSubmit}
          offices={offices}
          negociators={negociators}
        />
        <Properties
          onChange={onChange}
          onSubmit={onSubmit}
          properties={properties}
        />
        <Mandants onChange={onChange} onSubmit={onSubmit} mandants={mandants} />
        <Contacts
          notaries={notaries}
          mediators={mediators}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    fetchNegociators,
    fetchOffices,
    fetchMediators,
    fetchNotaries,
    fetchProperties,
    fetchMandants
  } = state;

  return {
    offices: fetchOffices,
    negociators: fetchNegociators,
    notaries: fetchNotaries,
    mandants: fetchMandants,
    properties: fetchProperties,
    mediators: fetchMediators
  };
}

export default connect(mapStateToProps)(Relations);
