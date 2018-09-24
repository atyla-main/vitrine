import React, { Component } from 'react';
import ElementsList from '../components/elements-list/Elements-list';
import TabHeader from '../components/tab-header/Tab-header';
import Modal from 'react-modal';
import Auth from '../services/Auth';
import { connect } from 'react-redux';
import { fetchUserActions } from '../actions/fetch-user';
import { createPropertyActions } from '../actions/create-property';
import PropertyForm from '../components/forms/properties/Property-form';
import { fetchPropertiesActions } from '../actions/fetch-properties';

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

class Properties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parameters: {
        wording: '',
        propertyNature: '',
        coOwnership: '',
        description: '',
        rentalState: '',
        address: '',
        postCode: '',
        city: '',
        country: ''
      },
      modalIsOpen: false
    };
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
    dispatch(fetchPropertiesActions.fetch(`userId=${userId}`));
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, user } = this.props;
    const { parameters } = this.state;

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

    dispatch(createPropertyActions.create(body));
    dispatch(fetchPropertiesActions.fetch(`userId=${Auth.getId()}`));
    this.setState({ modalIsOpen: false });
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

  openModal(e) {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {}

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { properties } = this.props;
    let list = [];

    if (properties && properties.propertiesFetch === true) {
      list = properties.properties.data;
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
          <PropertyForm
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            parameters={this.state.parameters}
          />
        </Modal>
        <TabHeader openModal={this.openModal} title={'Biens'} />
        <ElementsList list={list} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { fetchUser, fetchProperties } = state;

  return {
    user: fetchUser,
    properties: fetchProperties
  };
}

export default connect(mapStateToProps)(Properties);
