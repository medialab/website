import React from 'react';
import {Route, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import cls from 'classnames';

import listSpecs from '../../../specs/lists.js';

import List from './List';

import ImageForm from './forms/ImageForm';
import PeopleForm from './forms/PeopleForm';

export default function Router() {
  return (
    <div className="container">
      <div className="tabs">
        <ul>
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
        <Route path="/people/:id" render={({match}) => <PeopleForm people={match.params.id} />} />
        <Route path="/people" render={() => <List model="people" specs={listSpecs.people} />} />
        <Route path="/medias" render={() => <ImageForm />} />
        <Route render={() => (<div>Miss!</div>)} />
      </Switch>
    </div>
  );
}
