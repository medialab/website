import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';

import client from '../client';
import {acquireSocket} from '../sockets';

// TODO: integrate aspire into here
// TODO: add contextual info about build & deployment
import Aspire from './Aspire';
import Button from './misc/Button';

const localeDateStringOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
};

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', localeDateStringOptions);
}

const defaultAdminInfo = {
  lastBuildDate: '~',
  lastBuildDuration: null,
  lastUpdate: '~'
};

function templateAdminInfo(info) {
  if (!info || !info.lastBuildEnd) return defaultAdminInfo;

  const lastCommitDate = info.lastCommits
    ? info.lastCommits[0].date.split(' +')[0]
    : null;

  return {
    lastBuildDate: formatDate(info.lastBuildEnd),
    lastBuildDuration: (info.lastBuildEnd - info.lastBuildStart) / 1000,
    lastUpdate: lastCommitDate ? formatDate(lastCommitDate) : '~'
  };
}

export default function Admin() {
  const [adminInfo, setAdminInfo] = useState(null);
  const [locks, setLocks] = useState(null);

  useEffect(() => {
    const socket = acquireSocket();

    client.admin((err, data) => {
      setAdminInfo(data.info);
      setLocks(data.locks);
    });

    socket.on('locksChanged', newLocks => {
      setLocks(newLocks);
    });

    socket.on('infoChanged', newAdminInfo => {
      setAdminInfo(newAdminInfo);
    });

    // Cleanup
    return () => {
      socket.close();
    };
  }, []);

  const templated = templateAdminInfo(adminInfo);

  const canAct =
    !locks || (locks.deployStatus === 'free' && locks.buildStatus === 'free');

  let label = 'Forcer le build du site statique';

  if (!canAct) {
    if (locks.buildStatus !== 'free') label = 'Le site est en train de builder';
    else if (locks.deployStatus !== 'free' && locks.deployStatus !== 'build')
      label = "Le site est en train d'être versionné";
  }

  return (
    <div>
      <Helmet>
        <title>médialab CMS - admin</title>
      </Helmet>
      <h2 className="title is-4">Mise à jour du site</h2>
      <p>
        <strong>Dernière mise à jour des flux</strong>&nbsp;
        <em>
          {templated.lastBuildDate}{' '}
          {templated.lastBuildDuration && (
            <span>(en {templated.lastBuildDuration} secondes)</span>
          )}
        </em>
      </p>
      <p>
        <strong>Dernière mise à jour des contenus</strong>&nbsp;
        <em>{templated.lastUpdate}</em>
      </p>
      <br />
      <div>
        {!canAct && (
          <>
            <Button disabled={!canAct} onClick={() => client.build()}>
              {label}
            </Button>
            <Button kind="white" loading />
          </>
        )}
      </div>
      {canAct && (
        <div style={{marginTop: '3px'}}>
          <Button onClick={() => client.deploy()}>
            Envoyer les modifications dans le git pour mise à jour du site
            statique
          </Button>
        </div>
      )}
      <hr />
      <h2 className="title is-4">Spire</h2>
      <Aspire />
    </div>
  );
}
