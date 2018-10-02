import React, { Component } from 'react';
import ElementsList from '../components/elements-list/Elements-list';
import TabHeader from '../components/tab-header/Tab-header';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { fetchUserActions } from '../actions/fetch-user';
import { fetchOfficesActions } from '../actions/fetch-offices';
import { createOfficeActions } from '../actions/create-office';
import { createNegociatorActions } from '../actions/create-negociator';
import { fetchNegociatorsActions } from '../actions/fetch-negociators';
import Auth from '../services/Auth';
import OfficeForm from '../components/redux-forms/offices/office-form';
import NegociatorForm from '../components/redux-forms/negociators/negociator-form';

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

class Offices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toShow: 'agence',
      status: ['agence', 'negociateur'],
      modalIsOpen: false
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    let userId = Auth.getId();

    dispatch(fetchUserActions.fetch(userId));
    dispatch(fetchOfficesActions.fetch(`userId=${userId}`));
  }

  openModal(e) {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {}

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleSubmit(values) {
    const { dispatch, user } = this.props;
    let userId = Auth.getId();
    let parameters = this.state[`${this.state.toShow}Parameters`];
    let attributes = parameters;

    let body = {
      data: {
        attributes: values,
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

    if (this.state.toShow === 'agence') {
      body.data.relationships['office'] = {
        data: {
          id: values.officeId,
          type: 'offices'
        }
      };
      dispatch(createOfficeActions.create(body));
      dispatch(fetchOfficesActions.fetch(`userId=${userId}`));
    } else if (this.state.toShow === 'negociateur') {
      body.data.relationships['office'] = {
        data: {
          id: values.officeId,
          type: 'offices'
        }
      };
      dispatch(createNegociatorActions.create(body));
      dispatch(fetchNegociatorsActions.fetch(`userId=${userId}`));
    }
    this.setState({ modalIsOpen: false });
  }

  handleStatusChange(event) {
    const { value } = event.target;
    const { dispatch } = this.props;
    let userId = Auth.getId();

    this.setState({
      toShow: value
    });

    if (value === 'agence') {
      dispatch(fetchOfficesActions.fetch(`userId=${userId}`));
    } else if (value === 'negociateur') {
      dispatch(fetchNegociatorsActions.fetch(`userId=${userId}`));
    }
  }

  render() {
    const { offices, negociators } = this.props;
    let list = [];
    let officesList = offices.officesFetch === true ? offices.offices.data : [];
    let negociatorsList =
      negociators.negociatorsFetch === true ? negociators.negociators.data : [];

    if (this.state.toShow === 'agence' && offices.officesFetch === true) {
      list = officesList;
    } else if (
      this.state.toShow === 'negociateur' &&
      negociators.negociatorsFetch === true
    ) {
      list = negociatorsList;
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
          {this.state.toShow === 'agence' ? (
            <OfficeForm offices={officesList} onSubmit={this.handleSubmit} />
          ) : (
            <NegociatorForm
              offices={officesList}
              onSubmit={this.handleSubmit}
            />
          )}
        </Modal>
        <TabHeader
          title={'Agence'}
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
  const { fetchUser, fetchNegociators, fetchOffices } = state;

  return {
    user: fetchUser,
    offices: fetchOffices,
    negociators: fetchNegociators
  };
}

export default connect(mapStateToProps)(Offices);
