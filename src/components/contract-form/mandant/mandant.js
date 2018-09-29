import React, { Component } from 'react';
import { connect } from 'react-redux';
import MandantForm from '../../redux-forms/contract-mandant/mandant-form';
import { createContactActions } from '../../../actions/create-contact';
import { fetchContactsActions } from '../../../actions/fetch-contacts';
import { loadMandatesActions } from '../../../actions/load-mandates';
import { updateContactActions } from '../../../actions/update-contacts';
import Auth from '../../../services/Auth';
import _ from 'lodash';
import { reset } from 'redux-form';

class Mandant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mandants: new Array(),
      formSubmited: false,
      loaded: false,
      reload: false,
      loadMandate: false,
      contactsLoaded: false,
      newForm: false,
      contactCreated: false,
      currentContact: null
    };

    this.generateNewForm = this.generateNewForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.transformKey = this.transformKey.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {}

  generateNewForm() {
    const { dispatch, mandants } = this.props;
    let mandantList = this.state.mandants;

    dispatch(reset('initialForm'));
    this.setState({ newForm: true, mandants: mandants.data });
  }

  transformKey(hash) {
    let newHash = {};

    for (let key in hash) {
      newHash[_.camelCase(key)] = hash[key];
    }
    return newHash;
  }

  handleDelete(values) {
    const { dispatch, mandate } = this.props;
    let id = values.mandantIdUpdate;

    if (id) {
      dispatch(
        updateContactActions.update(
          { data: { attributes: { status: 'archived' } } },
          id
        )
      );
      this.setState({ formSubmited: true, newForm: true });
    }
  }

  handleSubmit(values) {
    const { dispatch, mandate } = this.props;
    let userId = Auth.getId();
    let attrs = values;
    attrs.status = 'mandant';
    console.log('VALUES', values);
    let id = values.mandantIdUpdate || this.state.currentContact;
    let mandateId = '';

    if (mandate.mandate) {
      mandateId = mandate.mandate.data.id;
    }

    let body = {
      data: {
        attributes: attrs,
        relationships: {
          user: { data: { id: userId, type: 'users' } },
          mandate: {
            data: { id: mandateId, type: 'mandates' }
          }
        }
      }
    };

    console.log('IDDDDDDDDDDDDDDDDD', id);

    if (id) {
      dispatch(updateContactActions.update(body, id));
    } else {
      dispatch(createContactActions.create(body));
      this.setState({ formSubmited: true });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      dispatch,
      mandate,
      contact,
      contacts,
      updateContact,
      mandants
    } = this.props;

    if (
      !prevProps.createMandate &&
      mandate.mandate &&
      mandate.mandate.data.relationships.contacts &&
      !this.state.loaded
    ) {
      dispatch(
        loadMandatesActions.loadFromId(
          mandate.mandate.data.relationships.contacts.data
        )
      );
      this.setState({ loaded: true });
    }

    if (!prevProps.contact.contact && contact.contact) {
      console.log('1--------------------------------------------');
      dispatch(
        fetchContactsActions.fetch(
          `mandateId=${mandate.mandate.data.id}&status=mandant`
        )
      );
    }

    if (
      prevProps.contact.contact &&
      contact.contact &&
      prevProps.contact.contact.data.id != contact.contact.data.id
    ) {
      console.log('2--------------------------------------------');
      dispatch(
        fetchContactsActions.fetch(
          `mandateId=${mandate.mandate.data.id}&status=mandant`
        )
      );
      this.setState({ loaded: false });
    }

    if (!prevProps.fetchContacts && contacts.contacts && !this.state.loaded) {
      console.log('3--------------------------------------------');
      dispatch(loadMandatesActions.load(contacts.contacts.data));
      this.setState({ loaded: true });
    }
    if (
      prevProps.updateContact &&
      prevProps.updateContact.updatingContact &&
      updateContact.updatingContact === false &&
      updateContact.contactUpdate === true
    ) {
      console.log('4--------------------------------------------');
      dispatch(
        fetchContactsActions.fetch(
          `mandateId=${mandate.mandate.data.id}&status=mandant`
        )
      );
      this.setState({ reload: true });
    }
    if (
      prevProps.contacts &&
      prevProps.contacts.fetchingContacts === true &&
      contacts.fetchingContacts === false
    ) {
      console.log('5--------------------------------------------');
      console.log('CONATCT', contacts.contacts.data.id);
      this.setState({ currentContact: contacts.contacts.data.id });
      dispatch(loadMandatesActions.load(contacts.contacts.data));
      this.setState({ reload: false, mandants: contacts.contacts.data });
    }
  }

  render() {
    const { mandants, contacts, contact } = this.props;
    let mandantsList = this.state.newForm
      ? this.state.mandants
      : mandants.contacts;
    console.log('CONTACT', contact);
    let contactId = this.state.currentContact;
    console.log('contactID', contactId);

    return (
      <div>
        {mandantsList.map((mandant, index) => {
          let attr = this.state.newForm
            ? mandant.attributes
            : mandant.data.attributes;
          let hash = this.transformKey(attr);
          hash.mandantIdUpdate = this.state.newForm
            ? mandant.id
            : mandant.data.id;
          return (
            <MandantForm
              form={`formNumber${index}`}
              key={index}
              initData={hash}
              mandantId={mandant.id}
              onSubmit={this.handleSubmit}
              onDelete={this.handleDelete}
            />
          );
        })}
        <MandantForm
          form={'initialForm'}
          initData={{ mandantIdUpdate: contactId }}
          onSubmit={this.handleSubmit}
          mandantId={contactId}
        />
        <button onClick={this.generateNewForm}>Add mandant</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    createMandate,
    createContact,
    fetchContacts,
    loadMandants,
    updateContact
  } = state;

  return {
    mandate: createMandate,
    contact: createContact,
    contacts: fetchContacts,
    mandants: loadMandants,
    updateContact
  };
}

export default connect(mapStateToProps)(Mandant);
