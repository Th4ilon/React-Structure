import React, { Component } from 'react';
import Modal from 'react-modal';
import AddUserAdmin from 'components/Forms/AddAdminUser';

class AddUserAdminDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen
    };
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      isOpen: nextProps.isOpen
    });
  }

  render() {
    const { isEdit, data, onSubmit, modalTitle, formButtonText } = this.props;
    return (
      <Modal isOpen={this.state.isOpen} className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{modalTitle}</h2>
            <i className="icon-close close" onClick={() => { this.setState({ isOpen: false }) }} />
          </div>
          <div className="modal-body">
            <AddUserAdmin formButtonText={formButtonText} isEdit={isEdit} data={data} onSubmit={onSubmit} /> {/* If it has data, isEdit? yes -> render data and inputs, no -> isAdd? yes -> empty inputs -> no -> render data  */}
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddUserAdminDialog;
