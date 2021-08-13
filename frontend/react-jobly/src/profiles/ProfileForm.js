import React, { useState, useContext } from "react";
import Alert from "../multiUse/Alert";
import JoblyApi from "../api";
import UserContext from "../auth/UserContext";

// the below can be used instead of Alert (fancier)
// import useTimedMessage from "../hooks/useTimedMessage";

/** edits your profile
 * 
 * saves and updates data from API to front end for the user
 */

 function ProfileForm() {
    //  get all initial data from userContext
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const INUSER = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      username: currentUser.username,
      password: "",
    } 
    const [formData, setFormData] = useState(INUSER);
    const [formErrs, setFormErrs] = useState([])

    // switch with saveconfimered to use their fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()
  
  console.debug(
    "ProfileForm",
    "currentUser=", currentUser,
    "formData=", formData,
    "formErrors=", formErrs,
    "saveConfirmed=", saveConfirmed,
  );

  async function submitData(e){
    e.preventDefault();

    let profData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    }
    let username = formData.username
    let updateUser;

    try {
      updateUser = await JoblyApi.saveProfile(username, profData);
    } catch (errs) {
        // set debugger to find the errors
      debugger;
      setFormErrs(errs);
      return;
    }

    setFormData(prof => ({...prof, password: ''}));
    setFormErrs([]);
    setSaveConfirmed(true);

    //updates userdata for entire site
    setCurrentUser(updateUser);
  }

  function handleChange(e) {
    const {name, value} = e.target;
    setFormData(prof => ({...prof, [name]: value}))
    setFormErrs([]);
  }

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Profile</h3>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Username</label>
              <p className="form-control-plaintext"><b>{formData.username}</b></p>
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm password to make changes:</label>
              <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
              />
            </div>
  
            {formErrs.length
                ? <Alert type="danger" messages={formErrs} />
                : null}
  
            {saveConfirmed
                ?
                <Alert type="success" messages={["Update successful."]} />
                : null}
  
            <button
                className="btn btn-primary btn-block mt-4"
                onClick={submitData}
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileForm;