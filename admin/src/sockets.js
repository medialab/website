/* global API_URL */
import io from 'socket.io-client';

let SOCKET = null;

function join(a) {
  return a.replace(/\/$/, '') + '/sockets';
}

export function acquireSocket() {
  if (SOCKET)
    return SOCKET;

  const parsed = new URL(API_URL);

  SOCKET = io(parsed.origin, {
    path: join(parsed.pathname)
  });

  return SOCKET;
}
