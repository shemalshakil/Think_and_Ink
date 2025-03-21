import React, { useContext } from 'react';
import { StateContext } from "../AppState";

const Alert = () => {
  const context = useContext(StateContext);
  const { alert } = context;
    
  return (
    <>
      {alert.show&&<div className="alert-container">
        <div className="alert" style={{background: alert.status==="Success!"?"rgb(94, 186, 125)":"rgb(255, 82, 82)"}} ><strong>{alert.status} :</strong>&nbsp;{alert.message}</div>
      </div>}
    </>
  )
}

export default Alert;