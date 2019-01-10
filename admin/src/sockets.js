/* global API_URL */
import io from 'socket.io-client';

function join(a) {
  return a.replace(/\/$/, '') + '/sockets';
}

export function acquireSocket() {
  const parsed = new URL(API_URL);

  const socket = io(parsed.origin, {
    path: join(parsed.pathname)
  });

  return socket;
}
