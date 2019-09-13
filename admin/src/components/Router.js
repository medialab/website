import React, {useState} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import cls from 'classnames';

import listSpecs from '../../../specs/lists.js';

import Login from './Login';
import Home from './Home';
import Admin from './Admin';
import Playground from './Playground';
import HomeIcon from 'material-icons-svg/components/baseline/Home';
import List from './List';

import ActivityForm from './forms/ActivityForm';
import PeopleForm from './forms/PeopleForm';
import ProductionForm from './forms/ProductionForm';
import NewsForm from './forms/NewsForm';
import SettingsForm from './forms/SettingsForm';

export default withRouter(function Router({alreadyAuthenticated, history}) {

  const [authenticated, setAuthenticated] = useState(alreadyAuthenticated);

  const authenticate = () => {
    setAuthenticated(true);
    history.push('/');
  };

  return (
    <div className="container">
      <div className="tabs header">
        <ul>
          <Route
            path="/" children={({match}) => (
              <li className={cls(match && match.isExact && 'is-active')}>
                <Link to="/">
                  <HomeIcon width={24} height={24} />
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
            path="/productions" children={({match}) => (
              <li className={cls(match && 'is-active')}>
                <Link to="/productions">Productions</Link>
              </li>
          )} />
          <Route
            path="/admin" children={({match}) => (
              <li className={cls(match && 'is-active')} style={{marginLeft: '50px'}}>
                <Link to="/admin">Admin</Link>
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
        {!authenticated && <Route path="/login" render={() => <Login authenticate={authenticate} />} />}
        {!authenticated && <Route path="/" render={() => <Redirect to="/login" />} />}
        <Route exact path="/" render={() => <Home />} />
        <Route path="/activities/new" render={() => <ActivityForm />} />
        <Route path="/activities/:id" render={({match}) => <ActivityForm id={match.params.id} />} />
        <Route
          path="/activities" render={() => (<List
            key="activities" label="activity" model="activities"
            specs={listSpecs.activities} />)} />
        <Route path="/people/new" render={() => <PeopleForm />} />
        <Route path="/people/:id" render={({match}) => <PeopleForm id={match.params.id} />} />
        <Route
          path="/people" render={() => (<List
            key="people" model="people" label="person"
            specs={listSpecs.people} />)} />
        <Route path="/news/new" render={() => <NewsForm />} />
        <Route path="/news/:id" render={({match}) => <NewsForm id={match.params.id} />} />
        <Route
          path="/news" render={() => (<List
            key="news" model="news" label="news"
            specs={listSpecs.news} />)} />
        <Route path="/productions/new" render={() => <ProductionForm />} />
        <Route path="/productions/:id" render={({match}) => <ProductionForm id={match.params.id} />} />
        <Route
          path="/productions" render={() => (<List
            key="productions" model="productions" label="production"
            specs={listSpecs.productions} />)} />
        <Route path="/playground" component={Playground} />
        <Route path="/admin" component={Admin} />
        <Route path="/settings" render={() => <SettingsForm key="settings" />} />
        <Route render={() => (<div>Miss!</div>)} />
      </Switch>
    </div>
  );
});
