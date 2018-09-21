import React, { Component } from 'react';
import CreateButton from '../components/create-button/Create-button';
import ElementsList from '../components/elements-list/Elements-list';
import TabHeader from '../components/tab-header/Tab-header';
import ParameterForm from '../components/forms/parameters/Parameter-form.js';
import { connect } from 'react-redux';
import { fetchUserActions } from '../actions/fetch-user';
import { fetchSettingActions } from '../actions/fetch-setting';
import { createSettingActions } from '../actions/create-setting';
import { updateSettingActions } from '../actions/update-setting';
import { fetchContactsActions } from '../actions/fetch-contacts';
import { fetchNotariesActions } from '../actions/fetch-notaries';
import { fetchOfficesActions } from '../actions/fetch-offices';
import { fetchNegociatorsActions } from '../actions/fetch-negociators';
import Auth from '../services/Auth';

class Parameters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parameters: {
        logoPlace: '',
        subtitleColorBackground: '',
        subtitleColorText: '',
        textColor: '',
        defaultPayType: '',
        remunerationAmount: '',
        defaultPercentage: '',
        inChargeOfRemuneration: '',
        defaultEscrowAccount: '',
        defaultDelegation: '',
        defaultPenaltyClauseDuration: '',
        defaultSpecialClause: '',
        notaireId: '',
        negociatorId: '',
        officeId: ''
      },
      settingsLoaded: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    let userId = Auth.getId();

    dispatch(fetchUserActions.fetch(userId));
    dispatch(fetchNotariesActions.fetch(`userId=${userId}&status=notaire`));
    dispatch(fetchOfficesActions.fetch(`userId=${userId}`));
    dispatch(fetchNegociatorsActions.fetch(`userId=${userId}`));
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, user, setting } = this.props;
    const { parameters } = this.state;

    let body = {
      data: {
        attributes: parameters,
        relationships: {
          user: { data: { id: user.user.data.id, type: 'users' } },
          contact: {
            data: { id: this.state.parameters.notaireId, type: 'contacts' }
          },
          office: {
            data: { id: this.state.parameters.officeId, type: 'offices' }
          },
          negociator: {
            data: {
              id: this.state.parameters.negociatorId,
              type: 'negociators'
            }
          }
        }
      }
    };

    if (this.state.settingsLoaded == true) {
      dispatch(updateSettingActions.update(body, setting.setting.data.id));
    } else {
      dispatch(createSettingActions.create(body));
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

  componentDidUpdate() {
    const { user, dispatch, setting } = this.props;

    if (
      user.user &&
      user.user.data.relationships.settings &&
      (setting.fetchingSetting === false || !setting.fetchingSetting)
    ) {
      dispatch(
        fetchSettingActions.fetch(
          user.user.data.relationships.settings.data[0].id
        )
      );
    }

    let params = {};

    if (setting.settingFetch === true && this.state.settingsLoaded === false) {
      let attr = setting.setting.data.attributes;
      params.logoPlace = attr['logo-place'];
      params.subtitleColorBackground = attr['subtitle-color-background'];
      params.subtitleColorText = attr['subtitle-color-text'];
      params.textColor = attr['text-color'];
      params.defaultPayType = attr['default-pay-type'];
      params.remunerationAmount = attr['remuneration-amount'];
      params.defaultPercentage = attr['default-percentage'];
      params.inChargeOfRemuneration = attr['in-charge-of-remuneration'];
      params.defaultEscrowAccount = attr['default-escrow-account'];
      params.defaultDelegation = attr['default-delegation'];
      params.defaultPenaltyClauseDuration =
        attr['default-penalty-clause-duration'];
      params.defaultSpecialClause = attr['default-special-clause'];
      if (setting.setting.data.relationships.contact) {
        params.notaireId = setting.setting.data.relationships.contact.data.id;
      }
      if (setting.setting.data.relationships.negociator) {
        params.negociatorId =
          setting.setting.data.relationships.negociator.data.id;
      }
      if (setting.setting.data.relationships.office) {
        params.officeId = setting.setting.data.relationships.office.data.id;
      }
      this.setState({ parameters: params, settingsLoaded: true });
    }
  }

  render() {
    const { notaries, negociators, offices } = this.props;

    let notariesList =
      notaries.notariesFetch == true ? notaries.notaries.data : [];
    let negociatorsList =
      negociators.negociatorsFetch == true ? negociators.negociators.data : [];
    let officesList = offices.officesFetch == true ? offices.offices.data : [];
    return (
      <div className={'contract-tab'}>
        <TabHeader titleOnly={true} title={'Paramétres'} />
        <ParameterForm
          notaries={notariesList}
          offices={officesList}
          negociators={negociatorsList}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          parameters={this.state.parameters}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    fetchUser,
    fetchSetting,
    fetchNotaries,
    fetchOffices,
    fetchNegociators
  } = state;

  return {
    user: fetchUser,
    setting: fetchSetting,
    notaries: fetchNotaries,
    offices: fetchOffices,
    negociators: fetchNegociators
  };
}

export default connect(mapStateToProps)(Parameters);
