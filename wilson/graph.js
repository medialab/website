const Graph = require('graphology');

const FORWARD_LINKS = {
  activities: {
    people: 'people'
  },
  news: {
    activities: 'activities',
    people: 'people',
    productions: 'productions'
  },
  people: {
    mainActivities: 'activities',
    mainProductions: 'productions'
  },
  productions: {
    activities: 'activities',
    people: 'people'
  }
};

const BACKWARD_LINKS = {
  activities: {
    news: 'news',
    productions: 'productions'
  },
  people: {
    activities: 'activities',
    news: 'news',
    productions: 'productions'
  }
};

const SELF_LINKS = {
  activities: 'activities',
  production: 'productions'
};

export default class WilsonGraph {
  constructor() {
    this.graph = new Graph();
  }
}
