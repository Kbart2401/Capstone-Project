import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/actions/session';
import { Button, Input } from '@chakra-ui/react';

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch()

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      dispatch(sessionActions.signUserUp(username, email, city, state, country, password))
        .catch(res => {
          if(res.errors) setErrors(res.errors)
        })
    }
  };

  // if (authenticated) {
  //   return <Redirect to="/" />;
  // }

  return (
    <form onSubmit={onSignUp}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div>
        <label>User Name</label>
        <Input
          type="text"
          name="username"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div>
        <label>Email</label>
        <Input
          type="text"
          name="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div>
        <label>City</label>
        <Input
          type="text"
          name="city"
          onChange={e => setCity(e.target.value)}
          value={city}
        />
      </div>
      <div>
        <label>State</label>
        <Input
          type="text"
          name="state"
          onChange={e => setState(e.target.value)}
          value={state}
        />
      </div>
      <div>
        <label>Country</label>
        <Input
          type="text"
          name="country"
          onChange={e => setCountry(e.target.value)}
          value={country}
        />
      </div>
      <div>
        <label>Password</label>
        <Input
          type="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <Input
          type="password"
          name="repeat_password"
          onChange={e => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required={true}
        />
      </div>
      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default SignUpForm;
