import React, { Component } from 'react';
import { Field } from 'redux-form';
import Arrow from '../../img/atyla-design-v1/arrow_left.png';
import { AtylaInputTheme, AtylaInput } from '../../styles/inputs/atyla-inputs';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import DeleteBlack from '../../img/atyla-design-v1/delete_black.png';

const renderField = ({
  input,
  label,
  type,
  inputClassName,
  placeholder,
  multiline,
  rows,
  rowsMax,
  disabled,
  meta: { touched, error, warning }
}) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <MuiThemeProvider theme={AtylaInputTheme}>
        <AtylaInput
          {...input}
          disabled={disabled}
          multiline={multiline}
          rows={rows}
          rowsMax={rowsMax}
          placeholder={placeholder}
          type={type}
          className={inputClassName}
        />
      </MuiThemeProvider>
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class Clauses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true
    };

    this.handleCollapsed = this.handleCollapsed.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const { dispatch, change } = this.props;
    this.setState({ [event.target.name]: event.target.value });
    dispatch(change([event.target.name], event.target.value));
  }

  handleCollapsed(index) {
    this.setState({ collapsed: !this.state.collapsed });
  }
  render() {
    const { fields, index, clause } = this.props;

    return (
      <div className={'clausesForm-clauseContainer'} key={index}>
        <div
          className={'mandantForm-collapse'}
          onClick={e => {
            e.preventDefault();
            this.handleCollapsed(index);
          }}
        >
          Clause particulière {index + 1}
          <img
            src={Arrow}
            heigh={10}
            width={10}
            alt=""
            className={
              'mandantForm-arrow ' +
              (this.state.collapsed === true ? 'mod-up' : 'mod-down')
            }
          />
          <img
            className={'mandantForm-deleteBlack'}
            src={DeleteBlack}
            alt=""
            height={18}
            width={18}
            onClick={() => fields.remove(index)}
          />
        </div>
        <Collapse in={this.state.collapsed}>
          <div className={'mandantForm-formContainer'}>
            <div className={'mandantForm-header'}>Clause particulière</div>
            <Field
              name={`${clause}.label`}
              component={renderField}
              placeholder={'Libellé'}
              type="text"
              inputClassName={'contractForm-inputLine mod-margin'}
            />
            <Field
              name={`${clause}.content`}
              component={renderField}
              placeholder={'Contenu'}
              type="textarea"
              multiline={true}
              rows="6"
              rowsMax="6"
              margin="normal"
              inputClassName={'contractForm-inputLine'}
            />
          </div>
        </Collapse>
      </div>
    );
  }
}

export default Clauses;
