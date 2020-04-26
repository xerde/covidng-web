import React from 'react';
import { Button } from 'react-bootstrap';

import './formButton.scss';

const FormButton = props => {
  const { title } = props;
  return (
    <div className='form-button'>
      <Button>{title}</Button>
    </div>
  );
};

export default FormButton
