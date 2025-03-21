import React from 'react';
import loading from './ZZ5H.gif';

const Spinner = ()=>{
    return (
      <div className="spinner-container">
        <img src={loading} alt="Loading..." className='spinner' />
      </div>
    )
  }
export default Spinner;