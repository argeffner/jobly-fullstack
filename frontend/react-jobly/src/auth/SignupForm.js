import React, {useState} from "react";
import { useHistory } from "react-router";
import Alert from "../multiUse/Alert";

function SignupForm({ signup }) {
    let INITIAL = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
      }
    const history = useHistory();
    const [formData, setFormData] = useState(INITIAL);
  
    const [formErr, setFormErr] = useState([]);
  
    console.debug(
      "SignupForm",
      "signup=", typeof login,
      "formData=", formData,
      "formErrors", formErr,
  );
  
  async function submitData(e) {
    e.preventDefault();
    let res = await signup(formData);
    (res.success) 
      ? history.push("/companies")
      : setFormErr(res.errors) 
  }
  
  function handleChange(e) {
      const { name, value } = e.target;
      setFormData(lgn => ({ ...lgn, [name]: value }));
  }
  
  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Sign up</h3>

        <div className="card">
          <div className="card-body">
            <form onSubmit={submitData}>
              <div className="form-group">
                <label>Username</label>
                <input
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                /> 
              </div>
              <div className="form-group">
                <label>First name</label>
                <input
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                /> 
              </div>
              <div className="form-group">
                <label>Last name</label>
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

              {formErr.length
                  ? <Alert type="danger" messages={formErr} />
                  : null}

              <button
                  type="submit"
                  className="btn btn-primary float-right"
                  onSubmit={submitData}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;

