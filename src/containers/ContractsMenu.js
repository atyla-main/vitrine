import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContractMenuList from '../components/elements-list/contract-menu-list';
import TabHeader from '../components/tab-header/Tab-header';
import { history } from '../helpers/history';
import { fetchMandatesActions } from '../actions/fetch-mandates';
import { fetchUserActions } from '../actions/fetch-user';
import { updateMandateActions } from '../actions/update-mandate';
import Auth from '../services/Auth';
import { loadContractsActions } from '../actions/load-contracts';
import { HandleTabChange } from '../components/handle-tab-change/handle-tab-change';
import { fetchMandateListActions } from '../actions/fetch-mandate-list';

class ContractsMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabValue: 'pending',
      toShow: 'Mandats de vente',
      status: [
        'Mandats de vente',
        'Compromis de vente',
        'Mandats de gestion',
        'Contrats de location',
        'Baux commerciaux'
      ],
      listOn: false,
      mandates: []
    };

    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this._getMandatesInfos = this._getMandatesInfos.bind(this);
    this.handleContractDelete = this.handleContractDelete.bind(this);
    this.handleContractUpdate = this.handleContractUpdate.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    let userId = Auth.getId();

    dispatch(fetchUserActions.fetch(userId));
    dispatch(
      fetchMandatesActions.fetch(
        `userId=${userId}&status=${this.state.tabValue}`
      )
    );
  }

  componentWillUnmount() {
    // TODO: CAN BE REMOVED TRY WITHOUT
    this.setState({ listOn: false, mandates: [] });
  }

  handleStatusChange(event) {
    const { value } = event.target;

    this.setState({
      toShow: value
    });
  }

  _getMandatesInfos() {
    const { dispatch } = this.props;

    dispatch(
      fetchMandateListActions.fetch(
        `?status=${this.state.tabValue}&userId=${Auth.getId()}`
      )
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { mandates, mandateUpdated, fetchMandateList, dispatch } = this.props;
    let userId = Auth.getId();

    if (
      fetchMandateList.mandateList &&
      prevProps.fetchMandateList.fetchingMandateList === true &&
      fetchMandateList.mandateListFetch === true &&
      fetchMandateList.fetchingMandateList === false
    ) {
      this.setState({
        mandates: fetchMandateList.mandateList.data.attributes.mandateList
      });
    }

    if (
      prevProps.mandateUpdated &&
      prevProps.mandateUpdated.updatingMandate === true &&
      mandateUpdated.mandateUpdate === true
    ) {
      dispatch(
        fetchMandatesActions.fetch(
          `userId=${userId}&status=${this.state.tabValue}`
        )
      );
      this.setState({ listOn: false });
    }

    if (
      mandates.mandates &&
      prevProps.mandates.fetchingMandates === true &&
      mandates.mandatesFetch === true &&
      mandates.fetchingMandates === false
    ) {
      if (this.state.listOn === false) {
        this.setState({ mandates: [] });
        this._getMandatesInfos();
      }
    }
  }

  handleContractUpdate(mandateId) {
    const { mandates, dispatch } = this.props;

    mandates.mandates.data.forEach(mandate => {
      if (mandate.id === mandateId) {
        dispatch(loadContractsActions.load(mandate));
      }
    });
    history.push('/dashboard/contracts/new');
  }

  handleContractDelete(mandateId) {
    const { dispatch } = this.props;

    dispatch(
      updateMandateActions.update(
        {
          data: { attributes: { status: 'archived' } }
        },
        mandateId
      )
    );
  }

  handleTabChange(event) {
    const { dispatch } = this.props;
    let userId = Auth.getId();
    let value = event.target.value;

    if (this.state.tabValue !== value) {
      this.setState({ tabValue: value, listOn: false });
      dispatch(fetchMandatesActions.fetch(`userId=${userId}&status=${value}`));
    }
  }

  render() {
    return (
      <div className={'contract-tab'}>
        <TabHeader
          title={'Contracts'}
          onChange={this.handleStatusChange}
          statusToShow={this.state.toShow}
          statusList={this.state.status}
          openModal={() => history.push('/dashboard/contracts/new')}
        />
        <HandleTabChange
          currentValue={this.state.tabValue}
          handleChange={this.handleTabChange}
        />
        <ContractMenuList
          list={this.state.mandates}
          onDelete={this.handleContractDelete}
          onEdit={this.handleContractUpdate}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { fetchUser, fetchMandates, updateMandate, fetchMandateList } = state;

  return {
    user: fetchUser,
    mandates: fetchMandates,
    mandateUpdated: updateMandate,
    fetchMandateList
  };
}

export default connect(mapStateToProps)(ContractsMenu);
