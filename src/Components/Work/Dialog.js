import React, { Component } from "react";
import {
  Fab,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Form } from "./";
import { CategoriasContext } from "../../context";

class Dialog extends Component {
  static contextType = CategoriasContext;

  state = {
    open: false
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleFormSubmit = categoria => {
    this.handleToggle();

    this.context.onCreate(categoria);
  };

  render() {
    const { open } = this.state;
    const { videos } = this.context;

    return (
      <>
        <Fab onClick={this.handleToggle} color="secondary" size="small">
          <Add />
        </Fab>

        <MuiDialog
          open={open}
          onClose={this.handleToggle}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Dados do Video</DialogTitle>
          <DialogContent>
            <DialogContentText>Preenche o formulario</DialogContentText>
            <Form videos={videos} onSubmit={this.handleFormSubmit} />
          </DialogContent>
        </MuiDialog>
      </>
    );
  }
}

export default Dialog;
