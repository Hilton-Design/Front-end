import React from 'react';

function Modal({message}) {
  return (
    <div className="container">
      <div className="modal-window">
        <div className="modalIcon">(｡´∀｀)ﾉ</div>
        <div className="modalMassage">
          {message}
        </div>
      </div>
    </div>
  );
}

export default Modal;