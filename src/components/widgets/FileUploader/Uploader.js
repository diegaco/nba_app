import React, { Component } from "react";
import { firebase } from "../../../firebase";
import FileUploader from "react-firebase-file-uploader";

class Uploader extends Component {
  state = {
    name: "",
    isUploading: false,
    progress: 0,
    fileUrl: ""
  };

  handleUploadStart = () => {
    this.setState({
      isUploading: true,
      progress: 0
    });
  };

  handleUploadError = err => {
    this.setState({
      isUploading: false
    });
    console.log(err);
  };

  handleUploadSuccess = fileName => {
    this.setState({
      name: fileName,
      progress: 100,
      isUploading: false
    });
    ///
    firebase
      .storage()
      .ref("images")
      .child(fileName)
      .getDownloadURL()
      .then(url => {
        this.setState({
          fileUrl: url
        });
      });
    this.props.storeFilename(fileName);
  };

  handleProgress = progress => {
    this.setState({
      progress
    });
  };

  render() {
    return (
      <div>
        <FileUploader
          accept="image/*"
          name="image"
          randomizeFilename
          storageRef={firebase.storage().ref("images")}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />
        {this.state.isUploading ? <p>Progress: {this.state.progress}</p> : null}
        {this.state.fileUrl ? (
          <img style={{ width: "300px" }} src={this.state.fileUrl} />
        ) : null}
      </div>
    );
  }
}

export default Uploader;
