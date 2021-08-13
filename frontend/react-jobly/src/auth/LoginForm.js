import React, {useState} from "react";
import { useHistory } from "react-router";
import Alert from "../multiUse/Alert";

function LoginForm({ login }) {
  let INITIAL = {
      username: '',
      password: '',
    }
  const history = useHistory();
  const [formData, setFormData] = useState(INITIAL);

  const [formErr, setFormErr] = useState([]);

  console.debug(
    "LoginForm",
    "login=", typeof login,
    "formData=", formData,
    "formErrors", formErr,
);

async function submitData(e) {
  e.preventDefault();
  let res = await login(formData);
//   if (res.status === 200) {
//     history.push("/companies");
// }
  (res.success) 
    ? history.push("/companies")
    : setFormErr(res.errors) 
}

function handleChange(e) {
    const { name, value } = e.target;
    setFormData(lgn => ({ ...lgn, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Log In</h3>

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
                    autoComplete="username"
                    required
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
                    autoComplete="current-password"
                    required
                />
              </div>
              
              {/* {formErr.length
                  ? <h2>Error: {formErr} </h2>
                  : null} */}

              {formErr.length
                  ? <Alert type="danger" messages={formErr} />
                  : null}

              <button
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

export default LoginForm;