import React, { useState } from "react";
import { connect } from "react-redux";
import { setUsername, setPassword } from "../actions/useraction";
import './Form.css'

const ConnectedForm = ({ username, password, setUsername, setPassword }) => {
  const [submittedData, setSubmittedData] = useState([]);
  const [fileData, setFileData] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setSubmittedData([...submittedData, { username, password, fileData }]);
    setUsername('');
    setPassword('');
    setFileData(null);
  };

  return (
    <div className="user-card">
      <form >
        <fieldset>
          <legend>FORM</legend>
          <label className="username">
            Username:
            <input type="text" placeholder='Enter the username' value={username} onChange={handleUsernameChange} />
          </label>
          <br />

          <label className="password">
            Password:
            <input
              type="password"
              value={password}
              placeholder='Enter the password'
              onChange={handlePasswordChange}
            />
          </label>
          <br />

          <label className="custom-file-upload">
            Upload
            <input
              type="file"
              onChange={onFileChange}
            />
          </label>
          <br />
          <button onClick={submitHandler}>Submit</button>
        </fieldset>
      </form>

      <div className="card-container">
        {submittedData.map((userData, index) => (
          <div key={index} className="card" >
            <img src={userData.fileData} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">
                <strong>Username:</strong> {userData.username}
              </p>
              <p className="card-text">
                <strong>Password:</strong> {userData.password}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.username,
  password: state.password,
});

const mapDispatchToProps = {
  setUsername,
  setPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);
