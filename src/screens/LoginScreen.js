import { useState } from 'react';
import { users } from '../utilities/config';

function LoginScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find((u) => {
      return u.name === name && u.password === password;
    });

    if (user) {
      console.log('Login successful!');
    } else {
      console.log('Invalid credentials');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__row">
        <label className="form__label" htmlFor="">
          Username
        </label>
        <input
          className="form__input"
          id="username"
          name="username"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form__row">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input
          className="form__input"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn" type="submit">
        Login
      </button>
    </form>
  );
}

export default LoginScreen;
