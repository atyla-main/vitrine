import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import _ from 'lodash';

const renderField = ({
  input,
  label,
  type,
  inputClassName,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <input
        {...input}
        placeholder={placeholder}
        type={type}
        className={inputClassName}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class ClausesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      label: '',
      specialClauses: new Array()
    };

    this.transformKey = this.transformKey.bind(this);
    this.handleClauseChange = this.handleClauseChange.bind(this);
    this.handleClauseSubmit = this.handleClauseSubmit.bind(this);
    this.handleClauseRemove = this.handleClauseRemove.bind(this);
    this.transformKey = this.transformKey.bind(this);
  }

  transformKey(hash) {
    let newHash = {};

    for (let key in hash) {
      newHash[_.camelCase(key)] = hash[key];
    }

    return newHash;
  }

  handleClauseRemove(event, index) {
    let clauses = this.state.specialClauses;

    clauses.splice(index, 1);
    this.setState({ specialClauses: clauses });
  }

  handleClauseChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleClauseSubmit(event) {
    event.preventDefault();
    const { dispatch, change, form } = this.props;
    let clauses = this.state.specialClauses;

    clauses.push({ label: this.state.label, content: this.state.content });
    this.setState({ specialClauses: clauses, label: '', content: '' });
    dispatch(change('specialClause', clauses));
  }

  transformKey(hash) {
    let newHash = {};

    for (let key in hash) {
      newHash[_.camelCase(key)] = hash[key];
    }

    return newHash;
  }

  componentDidMount() {
    const { mandate } = this.props;

    if (mandate.mandate) {
      let attributes = this.transformKey(mandate.mandate.data.attributes);
      this.props.initialize(attributes);
      this.setState({ specialClauses: attributes.specialClause });
    }
  }

  componentDidUpdate() {
    const {
      dispatch,
      change,
      proposer,
      visiter,
      publicite,
      totalPower
    } = this.props;

    if (totalPower === true) {
      dispatch(change('delegationOfPower.proposer', true));
      dispatch(change('delegationOfPower.visiter', true));
      dispatch(change('delegationOfPower.publicite', true));
    }
  }

  render() {
    const {
      dispatch,
      change,
      buttonSubmit,
      handleSubmit,
      pristine,
      submitting,
      mandantId,
      reset,
      form,
      autrePower,
      autreDocument,
      totalPower
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Délégation de pouvoir</h2>
          </div>
          <div>
            <label>
              <Field
                name="delegationOfPower.totale"
                component="input"
                type="checkbox"
              />{' '}
              Totale
            </label>
          </div>
          <div>
            <label>
              <Field
                name="delegationOfPower.proposer"
                component="input"
                type="checkbox"
              />{' '}
              Proposer
            </label>
            <label>
              <Field
                name="delegationOfPower.visiter"
                component="input"
                type="checkbox"
              />{' '}
              Visiter
            </label>
          </div>
          <div>
            <label>
              <Field
                name="delegationOfPower.publicite"
                component="input"
                type="checkbox"
              />{' '}
              Publicité
            </label>
            <label>
              <Field
                name="delegationOfPower.autre"
                component="input"
                type="checkbox"
              />
              {autrePower ? (
                <Field
                  placeholder="Autre..."
                  name="delegationOfPower.autreContent"
                  component="input"
                  component={renderField}
                />
              ) : (
                <span>Autre</span>
              )}
            </label>
          </div>
          <div className={'contractForm-inputField'}>
            <Field
              name={'mandateAdvertising'}
              component={renderField}
              placeholder={'Description mandat de publicité'}
              type="textarea"
              inputClassName={'contractForm-inputLine'}
            />
          </div>
          <div>
            <h2>Pieces à fournir</h2>
          </div>
          <div>
            <label>
              <Field
                name="documentsRequired.surfaceCarrez"
                component="input"
                type="checkbox"
              />{' '}
              Surface Carrez
            </label>
            <label>
              <Field
                name="documentsRequired.dossierTechnique"
                component="input"
                type="checkbox"
              />{' '}
              Dossier technique
            </label>
          </div>
          <div>
            <label>
              <Field
                name="documentsRequired.organisationImmeuble"
                component="input"
                type="checkbox"
              />{' '}
              Organisation Immeuble
            </label>
            <label>
              <Field
                name="documentsRequired.carnetEntretien"
                component="input"
                type="checkbox"
              />{' '}
              Carnet d entretien
            </label>
          </div>
          <div>
            <label>
              <Field
                name="documentsRequired.autre"
                component="input"
                type="checkbox"
              />
              {autreDocument ? (
                <Field
                  placeholder="Autre..."
                  name="documentsRequired.autreContent"
                  component="input"
                  component={renderField}
                />
              ) : (
                <span>Autre</span>
              )}
            </label>
          </div>
          <div>
            <span>A la charge de</span>
            <label>
              <Field
                name="documentsRequiredPerson"
                component="input"
                type="radio"
                value="client"
              />{' '}
              Client
            </label>
            <label>
              <Field
                name="documentsRequiredPerson"
                component="input"
                type="radio"
                value="agence"
              />{' '}
              Agence
            </label>
          </div>
          <div>
            <h2>Clause particulière</h2>
          </div>
        </form>
        <div>
          {this.state.specialClauses &&
            this.state.specialClauses.map((clause, index) => {
              return (
                <div key={index}>
                  <p>{clause.label}</p>
                  <p>{clause.content}</p>
                  <button
                    onClick={event => this.handleClauseRemove(event, index)}
                  >
                    Delete clause
                  </button>
                </div>
              );
            })}
        </div>
        <div>
          <form onSubmit={this.handleClauseSubmit}>
            <div>
              <input
                onChange={this.handleClauseChange}
                value={this.state.label}
                type="text"
                name="label"
                placeholder="Libellé"
              />
            </div>
            <div>
              <textarea
                onChange={this.handleClauseChange}
                value={this.state.content}
                name="content"
                placeholder="Contenu"
              />
            </div>
            <div>
              <button type="submit">Ajouter la clause</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ClausesForm = reduxForm({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ClausesForm);

const selector = (form, ...other) => formValueSelector(form)(...other);

function mapStateToProps(state, initialProps) {
  const { updateMandate } = state;
  return {
    mandate: updateMandate,
    autrePower: selector(initialProps.form, state, 'delegationOfPower.autre'),
    autreDocument: selector(
      initialProps.form,
      state,
      'documentsRequired.autre'
    ),
    totalPower: selector(initialProps.form, state, 'delegationOfPower.totale'),
    proposer: selector(initialProps.form, state, 'delegationOfPower.proposer'),
    visiter: selector(initialProps.form, state, 'delegationOfPower.visiter'),
    publicite: selector(initialProps.form, state, 'delegationOfPower.publicite')
  };
}

export default connect(mapStateToProps)(ClausesForm);
