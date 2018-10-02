import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContractMenuList from '../components/elements-list/contract-menu-list';
import TabHeader from '../components/tab-header/Tab-header';
import { history } from '../helpers/history';
import { fetchMandatesActions } from '../actions/fetch-mandates';
import { fetchUserActions } from '../actions/fetch-user';
import { updateMandateActions } from '../actions/update-mandate';
import Auth from '../services/Auth';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { requestService } from '../services/request';
import { loadContractsActions } from '../actions/load-contracts';
import { HandleTabChange } from '../components/handle-tab-change/handle-tab-change';
import moment from 'moment';

class ContractsMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabValue: 'pending',
      toShow: 'Mandat de vente',
      status: ['Mandat de vente'],
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
    this.setState({ listOn: false });
  }

  handleStatusChange(event) {
    const { value } = event.target;
    const { dispatch } = this.props;
    let userId = Auth.getId();

    this.setState({
      toShow: value
    });
  }

  _getMandatesInfos(mandates) {
    mandates.forEach(mandate => {
      requestService
        .request('GET', `api/contract-list/${mandate.id}`, null)
        .then(payload => {
          let mandatesList = this.state.mandates;
          let mandateLite = {
            id: mandate.id,
            date: moment(mandate.attributes.createdAt).format(
              'MM/DD/YYYY h:mm'
            ),
            number: mandate.attributes.mandateNumber || '...'
          };
          mandateLite.mandant = payload.data.attributes.mandant || '...';
          mandateLite.property = payload.data.attributes.property || '...';
          mandatesList.push(mandateLite);
          this.setState({ mandates: mandatesList, listOn: true });
        });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch } = this.props;
    const { mandates, mandateUpdated } = this.props;
    let userId = Auth.getId();

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
      prevProps.mandates &&
      prevProps.mandates.fetchingMandates === true &&
      mandates.mandatesFetch === true
    ) {
      if (this.state.listOn === false) {
        this.setState({ mandates: [] });
        this._getMandatesInfos(mandates.mandates.data);
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

    if (this.state.tabValue != value) {
      this.setState({ tabValue: value, listOn: false });
      dispatch(fetchMandatesActions.fetch(`userId=${userId}&status=${value}`));
    }
  }

  render() {
    const { mandates, classes } = this.props;
    let list = [];

    if (this.state.mandates) {
      list = this.state.mandates;
    }
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
  const { fetchUser, fetchMandates, updateMandate } = state;

  return {
    user: fetchUser,
    mandates: fetchMandates,
    mandateUpdated: updateMandate
  };
}

export default connect(mapStateToProps)(ContractsMenu);
