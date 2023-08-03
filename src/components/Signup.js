import React, {useState} from "react";
import { useNavigate  } from 'react-router-dom'

const Signup = (props) => {

    // const {alert} = props.alert
    const [credentials, setCredentials] = useState({name: "", email: "", password: ""})
    let history = useNavigate ();

    const handleSubmitSignup = async (event) => {
        event.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch('http://localhost:5000/api/auth/createUser', {
            "method" : 'POST',
            "headers" : {
                "content-type": "application/json"
            },
            body: JSON.stringify({name, email, password})
        })
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            history("/");
            props.changeAlert('Account CreSuccessfull', 'success');


        } else {
            props.changeAlert('Invalid credentials not able to login user !!', 'danger');
        }
    }

    const onChange = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value});
    }

    return (
        <div>
        <form  onSubmit={handleSubmitSignup}>
        <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" minLength={5} required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" minLength={5} required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" minLength={5} required />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
    )
}

export default Signup;