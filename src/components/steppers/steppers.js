import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { colors } from '../../styles/colors';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

export const AtylaStepperTheme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
      root: {
        transform: 'scale(1.5)',
        '&$active': {
          color: colors.purpleHeart
        }
      },
      text: {
        fontSize: '13px'
      }
    }
  }
});

let steps = [
  'Mandant',
  'Bien',
  'Conditions financières',
  'Clauses',
  'Récapitulatif'
];

let formNames = [
  'initialForm',
  'propertyForm',
  'testForm',
  'testForm',
  'testForm'
];

class Steppers extends Component {
  render() {
    const { pageNumber, onPageChange, dispatch, currentPage } = this.props;

    return (
      <div>
        <MuiThemeProvider theme={AtylaStepperTheme}>
          <Stepper alternativeLabel nonLinear activeStep={pageNumber}>
            {steps.map((step, index) => {
              const props = {};
              return (
                <Step key={index} {...props}>
                  <StepButton
                    onClick={e => {
                      e.preventDefault();
                      onPageChange(index);
                      dispatch(submit(formNames[currentPage]));
                    }}
                  >
                    <div
                      className={
                        'mandant-stepper ' +
                        (pageNumber === index ? 'mod-active' : '')
                      }
                    >
                      {step}
                    </div>
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect()(Steppers);
