import React, { Component } from 'react';
import MandantForm from '../../redux-forms/contract-mandant/mandant-form';
import { createContactActions } from '../../../actions/create-contact';
import { updateContactActions } from '../../../actions/update-contacts';
import { fetchContractActions } from '../../../actions/fetch-contract';
import { fetchContactsActions } from '../../../actions/fetch-contacts';
import { fetchMandatesActions } from '../../../actions/fetch-mandates';
import { fetchMandantsActions } from '../../../actions/fetch-mandants';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import _ from 'lodash';
import Auth from '../../../services/Auth';

const transformKey = hash => {
  let newHash = {};

  for (let key in hash) {
    newHash[_.camelCase(key)] = hash[key];
  }
  return newHash;
};

class MandantNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      fetchContract: true,
      loadingContract: true
    };

    this.createContact = this.createContact.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewContact = this.handleNewContact.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.fetchContacts = this.fetchContacts.bind(this);
  }

  fetchContacts(id) {
    const { dispatch } = this.props;

    dispatch(fetchMandantsActions.fetch(`mandateId=${id}&status=mandant`));
  }

  fetchContract(id) {
    const { dispatch } = this.props;

    dispatch(fetchContractActions.fetch(id));
    this.setState({ fetchContract: false });
  }

  createContact() {
    const { dispatch, createMandate } = this.props;

    let mandate = createMandate.mandate.data;

    let body = {
      data: {
        attributes: {
          status: 'mandant'
        },
        relationships: {
          user: {
            data: { id: Auth.getId(), type: 'users' }
          },
          mandate: {
            data: { id: mandate.id, type: 'mandates' }
          }
        }
      }
    };

    dispatch(createContactActions.create(body));
  }

  componentDidMount() {
    const { createContact, dispatch, createMandate } = this.props;

    this.setState({ fetchContract: true });

    if (
      createContact.contact &&
      createContact.creatingContact === false &&
      createContact.contactCreate === true &&
      this.state.fetchContract === true
    ) {
      // after create contact
      this.fetchContract(createMandate.mandate.data.id);
    } else if (
      createMandate.mandate &&
      createMandate.mandate.data &&
      this.state.fecthContract === true
    ) {
      this.fetchContract(createMandate.mandate.data.id);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      createContact,
      createMandate,
      fetchContract,
      fetchMandates,
      fetchMandants,
      loadContracts,
      updateContact
    } = this.props;

    if (
      createContact.contact &&
      prevProps.createContact.creatingContact === true &&
      createContact.contactCreate === true
    ) {
      let contacts = this.state.contacts;
      this.setState({
        contacts: [...contacts, createContact.contact.data],
        fetchContract: false
      });
    }

    if (
      createMandate.mandate &&
      createMandate.mandate.data &&
      this.state.fecthContract === true
    ) {
      this.fetchContract(createMandate.mandate.data.id);
    }

    if (
      loadContracts.data &&
      loadContracts.data.id &&
      this.state.loadingContract === true
    ) {
      this.fetchContacts(loadContracts.data.id);
      this.setState({ loadingContract: false });
    }

    if (
      createMandate.mandate &&
      prevProps.createMandate.creatingMandate === true &&
      createMandate.mandateCreate === true
    ) {
      this.createContact();
    }

    if (
      fetchContract.contract &&
      prevProps.fetchContract.fetchingContract === true &&
      fetchContract.contractFetch === true
    ) {
      this.fetchContacts(fetchContract.contract.data.id);
    }

    if (
      fetchMandants.mandants &&
      prevProps.fetchMandants.fetchingMandants === true &&
      fetchMandants.mandantsFetch === true &&
      fetchMandants.fetchingMandants === false
    ) {
      this.setState({
        contacts: fetchMandants.mandants.data
      });
    }

    if (
      updateContact.contact &&
      prevProps.updateContact.updatingContact === true &&
      updateContact.contactUpdate === true &&
      updateContact.updatingContact === false
    ) {
      this.fetchContract(createMandate.mandate.data.id);
    }
  }

  handleSubmit(values) {
    const { dispatch } = this.props;

    let body = {
      data: {
        attributes: values
      }
    };

    dispatch(updateContactActions.update(body, values.mandantId));
  }

  handleNewContact() {
    this.createContact();
  }

  handleDelete(values, index) {
    const { dispatch } = this.props;

    let body = {
      data: {
        attributes: { status: 'archived' }
      }
    };
    this.setState({ loadContracts: true });
    dispatch(updateContactActions.update(body, values.mandantId));
  }

  render() {
    const { contacts } = this.state;

    return (
      <div>
        {contacts &&
          contacts.map((contact, index) => {
            let hash = transformKey(contact.attributes);
            hash.mandantId = contact.id;
            return (
              <MandantForm
                form={`formNumber${index}`}
                key={index}
                initData={hash}
                onSubmit={this.handleSubmit}
                onDelete={values => {
                  const { dispatch } = this.props;
                  this.handleDelete(values);
                  dispatch(reset(`formNumber${index}`));
                }}
              />
            );
          })}
        <button onClick={this.handleNewContact}>Add new mandant</button>
        <button onClick={this.props.onNext}>Next</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    createMandate,
    createContact,
    fetchContract,
    fetchMandates,
    fetchMandants,
    loadContracts,
    updateContact
  } = state;
  return {
    createMandate,
    createContact,
    fetchContract,
    fetchMandates,
    fetchMandants,
    loadContracts,
    updateContact
  };
}

export default connect(mapStateToProps)(MandantNew);
