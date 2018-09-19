import React from 'react';
import {Route, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import cls from 'classnames';

import PeopleList from './lists/PeopleList';

import PeopleForm from './forms/PeopleForm';

export default function Router() {
  return (
    <div className="container is-fluid">
      <div className="tabs">
        <ul>
          <Route path="/posts" children={({match}) => (
            <li className={cls(match && 'is-active')}>
              <Link to="/posts">Posts</Link>
            </li>
          )} />
          <Route path="/people" children={({match}) => (
            <li className={cls(match && 'is-active')}>
              <Link to="/people">People</Link>
            </li>
          )} />
        </ul>
      </div>
      <Switch>
        <Route exact path="/" render={() => (<div>Admin</div>)} />
        <Route path="/people/new" render={() => <PeopleForm />} />
        <Route path="/people/:id" render={({match}) => (<div>People {match.params.id}</div>)} />
        <Route path="/people" render={() => <PeopleList />} />
        <Route render={() => (<div>Miss!</div>)} />
      </Switch>
    </div>
  );
}
