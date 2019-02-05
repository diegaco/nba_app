import React, { Component } from "react";
import FormField from "../widgets/FormFields/";
import style from "./Dashboard.module.css";
import { firebaseTeams, firebaseArticles, firebase } from "../../firebase";

import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import Uploader from "../widgets/FileUploader";

class Dashboard extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    postError: "",
    loading: false,
    formData: {
      author: {
        element: "input",
        value: "",
        config: {
          name: "author_input",
          type: "text",
          placeholder: "Enter the author"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      title: {
        element: "input",
        value: "",
        config: {
          name: "title_input",
          type: "text",
          placeholder: "Enter the title"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      body: {
        element: "texteditor",
        value: "",
        valid: true
      },
      image: {
        element: "image",
        value: "",
        valid: true
      },
      team: {
        element: "select",
        value: "",
        config: {
          name: "team_input",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      tags: {
        element: "input",
        value: "",
        config: {
          name: "tags_input",
          type: "text",
          placeholder: "Enter the tags"
        },
        validation: {
          required: false
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  componentDidMount = () => {
    this.loadTeams();
  };

  loadTeams = () => {
    let teams = [];
    firebaseTeams.once("value").then(snapshot => {
      snapshot.forEach(childSnapshot => {
        teams.push({
          id: childSnapshot.val().id,
          name: childSnapshot.val().city
        });
      });

      const newFormData = { ...this.state.formData };
      const newElement = { ...newFormData["team"] };

      newElement.config.options = teams;
      newFormData["team"] = newElement;

      this.setState({
        formData: newFormData
      });
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      if (this.state.formData[key] === "tags") {
        dataToSubmit[key] = this.state.formData[key].value.split(",");
      } else {
        dataToSubmit[key] = this.state.formData[key].value;
      }
    }

    for (let key in this.state.formData) {
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      console.log(dataToSubmit);

      this.setState({
        loading: true,
        postError: ""
      });

      firebaseArticles
        .orderByChild("id")
        .limitToLast(1)
        .once("value")
        .then(snapshot => {
          let articleId = null;
          snapshot.forEach(childSnapshot => {
            articleId = childSnapshot.val().id;
          });

          dataToSubmit["date"] = firebase.database.ServerValue.TIMESTAMP;
          dataToSubmit["id"] = articleId + 1;
          dataToSubmit["team"] = parseInt(dataToSubmit["team"]);

          firebaseArticles
            .push(dataToSubmit)
            .then(post => {
              this.props.history.push(`/articles/${post.key}`);
            })
            .catch(e => {
              this.setState({
                postError: e.message
              });
            });
        });
    } else {
      this.setState({
        postError: "Something went wrong"
      });
    }
  };

  validate = element => {
    let error = [true, ""];

    // validate required
    if (element.validation.required) {
      const valid = element.value.trim() !== "";
      const msg = `${!valid ? "This field is required" : ""}`;
      error = !valid ? [valid, msg] : error;
    }
    return error;
  };

  handleFormChange = (element, content = "") => {
    const newFormData = {
      ...this.state.formData
    };

    const newElement = {
      ...newFormData[element.id]
    };

    if (content === "") {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    if (element.blur) {
      let validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormData[element.id] = newElement;

    this.setState({
      formData: newFormData
    });
  };

  submitButton = () =>
    this.state.loading ? (
      "loading..."
    ) : (
      <div>
        <button type="submit">Add Post</button>
      </div>
    );

  showError = () =>
    this.state.postError !== "" ? (
      <div className={style.ShowError}>{this.state.postError}</div>
    ) : (
      ""
    );

  onEditorStateChange = editorState => {
    let contentState = editorState.getCurrentContent();
    // This is generally what is gonna be stored in firebase (a json object with some data)
    // let rawState = convertToRaw(contentState);

    let html = stateToHTML(contentState);

    this.handleFormChange({ id: "body" }, html);

    this.setState({
      editorState
    });
  };

  storeFilename = filename => {
    this.handleFormChange({ id: "image" }, filename);
  };

  render() {
    return (
      <div className={style.PostContainer}>
        <form onSubmit={this.submitForm}>
          <h2>Add Post</h2>

          <Uploader storeFilename={filename => this.storeFilename(filename)} />

          <FormField
            id={"author"}
            formData={this.state.formData.author}
            handleChange={element => this.handleFormChange(element)}
          />
          <FormField
            id={"title"}
            formData={this.state.formData.title}
            handleChange={element => this.handleFormChange(element)}
          />

          <Editor
            editorState={this.state.editorState}
            wrapperClassName="myEditor-wrapper"
            editorClassName="myEditor-editor"
            onEditorStateChange={this.onEditorStateChange}
          />

          <FormField
            id={"team"}
            formData={this.state.formData.team}
            handleChange={element => this.handleFormChange(element)}
          />

          <FormField
            id={"tags"}
            formData={this.state.formData.tags}
            handleChange={element => this.handleFormChange(element)}
          />

          {this.submitButton()}
          {this.showError()}
        </form>
      </div>
    );
  }
}

export default Dashboard;
