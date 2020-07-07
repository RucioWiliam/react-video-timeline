import React, { Component } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";

class Form extends Component {
  state = this.getInitState();

  getInitState() {
    const { metadata } = this.props;

    return (
      metadata || {
        titulo: "",
        categoria: "",
        descricao: ""
      }
    );
  }

  handleChange = ({ target: { value, name } }) =>
    this.setState({
      [name]: value
    });

  handleSubmit = () =>
    this.props.onSubmit({
      id: this.state.title.toLowerCase().replace(/ /g, "-"),
      ...this.state
    });

  render() {
    const { titulo, descricao, categoria } = this.state;
    const { metadata, videos: categorias } = this.props;

    return (
      <form>
        <TextField
          label="Titulo"
          value={titulo}
          name="titulo"
          onChange={this.handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Categoria"
          value={categoria}
          name="Assunto / Cadeira"
          onChange={this.handleChange}
          margin="normal"
          fullWidth
        />

        <TextField
          multiline
          rows="4"
          label="Descricao"
          value={descricao}
          name="descricao"
          onChange={this.handleChange}
          margin="normal"
          fullWidth
        />

        <Button
          color="primary"
          variant="contained"
          onClick={this.handleSubmit}
          disabled={!titulo || !categoria || !descricao}
        >
          {metadata ? "Edit" : "Create"}
        </Button>
      </form>
    );
  }
}

export default Form;
