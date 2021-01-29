// Component to set the padding for other contents

import React from 'react';
import './ContentContainer.css';

const CardVer = (props) => {
  return (
    <div className="content-container">
        {props.children}
    </div>
  );
};

export default CardVer;