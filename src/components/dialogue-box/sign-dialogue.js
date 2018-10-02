import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
};

class SignDialogue extends React.Component {
  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog
        onClose={onClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle className={'dialogueSign-header'} id="simple-dialog-title">
          Signature en ligne
        </DialogTitle>
        <div className={'dialogueSign-content'}>
          Un email a été envoyé aux différents signataire.
        </div>
        <button className={'dialogueSign-button'} onClick={onClose}>
          Fermer
        </button>
      </Dialog>
    );
  }
}

export default withStyles(styles)(SignDialogue);
