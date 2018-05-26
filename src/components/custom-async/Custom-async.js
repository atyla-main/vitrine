import React from 'react';
import { Async } from 'react-select';
import styled from 'styled-components';

const CustomAsync = styled(Async)`
  &.Select.is-open {
    .Select-control {
      border: 2px solid red;
      border-radius: 0;
    }
    .Select-menu-outer {
      border-radius: 0;
      margin-top: 0;
      .Select-noresults {
        color: #767676;
        font-weight: 400;
      }
    }
    .Select-placeholder {
      color: #767676;
      font-weight: 400;
    }
  }
  &.Select {
    .Select-control {
      border: 2px solid red;
      border-radius: 0;
    }
    .Select-placeholder {
      color: #767676;
      font-weight: 400;
    }
  }
`;

export default props => <CustomAsync {...props} />;
