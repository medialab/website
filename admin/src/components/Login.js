import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import client from '../client';

export default function Login({authenticate}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  function onSubmit() {
    setHasError(false);

    client.login({data: {username, password}}, err => {
      if (err)
        return setHasError(true);

      setHasError(false);

      window.ALREADY_AUTHENTICATED = true;
      return authenticate();
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <Helmet>
        <title>médialab CMS - login</title>
      </Helmet>
      <div className="columns">
        <div className="column is-4">
          <h2 className="title is-2">Login</h2>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                type="text"
                className="input"
                autoFocus
                placeholder="Username..."
                value={username}
                onChange={e => setUsername(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)} />
          </div>
          {hasError && <div><em>Invalid credentials.</em><br /><br /></div>}
          <div>
            <input
              disabled={!username || !password}
              type="submit"
              value="Login"
              className="button" />
          </div>
        </div>
      </div>
    </form>
  );
}
