import React from 'react';
import {Route, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import cls from 'classnames';

import listSpecs from '../../../specs/lists.js';

import Home from './Home';
import List from './List';

import PeopleForm from './forms/PeopleForm';

export default function Router() {
  return (
    <div className="container">
      <div className="tabs">
        <ul>
          <Route path="/activities" children={({match}) => (
            <li className={cls(match && 'is-active')}>
              <Link to="/activities">Activities</Link>
            </li>
          )} />
          <Route path="/news" children={({match}) => (
            <li className={cls(match && 'is-active')}>
              <Link to="/news">News</Link>
            </li>
          )} />
          <Route path="/people" children={({match}) => (
            <li className={cls(match && 'is-active')}>
              <Link to="/people">People</Link>
            </li>
          )} />
          <Route path="/publications" children={({match}) => (
            <li className={cls(match && 'is-active')}>
              <Link to="/publications">Publications</Link>
            </li>
          )} />
        </ul>
      </div>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/people/new" render={() => <PeopleForm />} />
        <Route path="/people/:id" render={({match}) => <PeopleForm id={match.params.id} />} />
        <Route path="/activities" render={() => <List key="activities" model="activities" specs={listSpecs.activities} />} />
        <Route path="/news" render={() => <List key="news" model="news" specs={listSpecs.news} />} />
        <Route path="/people" render={() => <List key="people" model="people" specs={listSpecs.people} />} />
        <Route path="/publications" render={() => <List key="publications" model="publications" specs={listSpecs.publications} />} />
        <Route render={() => (<div>Miss!</div>)} />
      </Switch>
    </div>
  );
}
