import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress
} from 'react-places-autocomplete';
import { Field } from 'redux-form';
import { AtylaInputTheme, AtylaInput } from '../../styles/inputs/atyla-inputs';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const renderField = ({
  input,
  label,
  type,
  inputClassName,
  placeholder,
  multiline,
  rows,
  rowsMax,
  meta: { touched, error, warning }
}) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <MuiThemeProvider theme={AtylaInputTheme}>
        <AtylaInput
          {...input}
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

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    const { onUpdate } = this.props;
    geocodeByAddress(address)
      .then(results => {
        this.setState({ address: results[0].formatted_address });
        onUpdate(results);
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    const searchOptions = {
      componentRestrictions: { country: 'fr' }
    };

    const { name, placeholder } = this.props;

    return (
      <PlacesAutocomplete
        debounce={1000}
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Field
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input'
              })}
              name={name}
              value={this.state.address}
              component={renderField}
              placeholder={placeholder}
              type="search"
              inputClassName={'contractForm-inputLine'}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default connect()(LocationSearchInput);
