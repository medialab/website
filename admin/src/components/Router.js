import React from 'react';
import {Route, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import cls from 'classnames';

import listSpecs from '../../../specs/lists.js';

import Home from './Home';
import HomeIcon from './icons/HomeIcon';
import List from './List';

import ActivityForm from './forms/ActivityForm';
import PeopleForm from './forms/PeopleForm';
import PublicationForm from './forms/PublicationForm';
import NewsForm from './forms/NewsForm';
import SettingsForm from './forms/SettingsForm';

export default function Router() {
  return (
    <div className="container">
      <div className="tabs">
        <ul>
          <Route
            path="/" children={({match}) => (
              <li className={cls(match && match.isExact && 'is-active')}>
                <Link to="/">
                  <HomeIcon />
                </Link>
              </li>
          )} />
          <Route
            path="/activities" children={({match}) => (
              <li className={cls(match && 'is-active')}>
                <Link to="/activities">Activities</Link>
              </li>
          )} />
          <Route
            path="/news" children={({match}) => (
              <li className={cls(match && 'is-active')}>
                <Link to="/news">News</Link>
              </li>
          )} />
          <Route
            path="/people" children={({match}) => (
              <li className={cls(match && 'is-active')}>
                <Link to="/people">People</Link>
              </li>
          )} />
          <Route
            path="/publications" children={({match}) => (
              <li className={cls(match && 'is-active')}>
                <Link to="/publications">Publications</Link>
              </li>
          )} />
          <Route
            path="/settings" children={({match}) => (
              <li className={cls(match && 'is-active')}>
                <Link to="/settings">Settings</Link>
              </li>
          )} />
        </ul>
      </div>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/activities/new" render={() => <ActivityForm />} />
        <Route path="/activities/:id" render={({match}) => <ActivityForm id={match.params.id} />} />
        <Route path="/activities" render={() => <List key="activities" model="activities" specs={listSpecs.activities} />} />
        <Route path="/people/new" render={() => <PeopleForm />} />
        <Route path="/people/:id" render={({match}) => <PeopleForm id={match.params.id} />} />
        <Route path="/people" render={() => <List key="people" model="people" specs={listSpecs.people} />} />
        <Route path="/news/new" render={() => <NewsForm />} />
        <Route path="/news/:id" render={({match}) => <NewsForm id={match.params.id} />} />
        <Route path="/news" render={() => <List key="news" model="news" specs={listSpecs.news} />} />
        <Route path="/publications/new" render={() => <PublicationForm />} />
        <Route path="/publications/:id" render={({match}) => <PublicationForm id={match.params.id} />} />
        <Route path="/publications" render={() => <List key="publications" model="publications" specs={listSpecs.publications} />} />
        <Route path="/settings" render={() => <SettingsForm key="settings" />} />
        <Route render={() => (<div>Miss!</div>)} />
      </Switch>
    </div>
  );
}
