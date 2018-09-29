import React, { Component } from 'react';
import ElementsList from '../components/elements-list/Elements-list';
import TabHeader from '../components/tab-header/Tab-header';
import { connect } from 'react-redux';
import { fetchUserActions } from '../actions/fetch-user';
import { fetchContactsActions } from '../actions/fetch-contacts';
import Auth from '../services/Auth';
import Modal from 'react-modal';
import ContactForm from '../components/forms/contacts/Contact-form.js';
import { createContactActions } from '../actions/create-contact';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '500px',
    overlfow: 'scroll'
  }
};

Modal.setAppElement('#root');

class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parameters: {
        wording: '',
        address: '',
        postCode: '',
        city: '',
        country: '',
        phone: '',
        fax: '',
        email: '',
        status: '',
        civility: '',
        lastName: '',
        firstName: '',
        otherFirstName: '',
        conjugalStatus: '',
        maritalState: '',
        birthName: '',
        partner: '',
        weddingPacsDate: '',
        weddingPacsPlace: '',
        birthDate: '',
        birthPlace: '',
        nationality: '',
        job: '',
        notes: '',
        companyName: '',
        officeName: '',
        legalStatus: '',
        otherStatus: '',
        siren: '',
        siret: '',
        rcs: false,
        rcsCity: '',
        rm: '',
        codeNafApe: ''
      },
      toShow: 'mandant',
      status: ['mandant', 'notaire', 'mediateur'],
      created: false,
      modalIsOpen: false
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    let userId = Auth.getId();

    dispatch(fetchUserActions.fetch(userId));
    dispatch(
      fetchContactsActions.fetch(`userId=${userId}&status=${this.state.toShow}`)
    );
  }

  openModal(e) {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {}

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, user, contact } = this.props;
    const { parameters, toShow } = this.state;

    let body = {
      data: {
        attributes: parameters,
        relationships: {
          user: {
            data: {
              id: user.user.data.id,
              type: 'users'
            }
          }
        }
      }
    };
    body.data.attributes.status = toShow;
    dispatch(createContactActions.create(body));
    this.setState({ modalIsOpen: false, created: true });
  }

  componentDidUpdate() {
    const { dispatch, user, contact } = this.props;
    const { parameters, toShow } = this.state;

    if (this.state.created === true && contact.contactCreate === true) {
      console.log('FECTH CONTACTS');
      dispatch(
        fetchContactsActions.fetch(`userId=${Auth.getId()}&status=${toShow}`)
      );
      this.setState({ created: false });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { parameters } = this.state;

    this.setState({
      parameters: {
        ...parameters,
        [name]: value
      }
    });
  }

  handleStatusChange(event) {
    const { value } = event.target;
    const { dispatch } = this.props;

    this.setState({
      toShow: value
    });
    dispatch(
      fetchContactsActions.fetch(`userId=${Auth.getId()}&status=${value}`)
    );
  }

  render() {
    const { contacts } = this.props;
    let list = [];

    if (contacts.contacts) {
      list = contacts.contacts.data;
    }
    return (
      <div className={'contract-tab'}>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <ContactForm
            currentStatus={this.state.toShow}
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            parameters={this.state.parameters}
          />
        </Modal>
        <TabHeader
          title={'Contacts'}
          onChange={this.handleStatusChange}
          statusList={this.state.status}
          statusToShow={this.state.toShow}
          openModal={this.openModal}
        />
        <ElementsList list={list} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { fetchUser, fetchContacts, createContact } = state;

  return {
    user: fetchUser,
    contacts: fetchContacts,
    contact: createContact
  };
}

export default connect(mapStateToProps)(Contacts);
