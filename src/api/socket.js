import SocketIO from 'socket.io-client';
import SailsIO from 'sails.io.js';
import { API_URI } from '../config/env';
import _ from 'lodash';

const IO = SailsIO(SocketIO);

class Socket {
  constructor(props) {
    this.props = props;

    this.init();
  }

  init() {
    this.setFunctions();
    this.setSocket();
  }

  setFunctions() {
    _.map(this.props, (prop, key) => {
      if (typeof prop == 'function') {
        this[key] = prop;
      }
    });
  }

  setSocket() {
    this.io = IO;

    this.socket = this.io.sails.connect(API_URI, {
      useCORSRouteToGetCookie: false,
      autoConnect: true,
      reconnection: true,
      pingTimeout: 30000,
      pingInterval: 30000,
      headers: {
        authorization: global.AUTH_TOKEN
      }
    });

    this.socket.on('connect', () => {
      this.connected();
    });

    this.socket.on('disconnect', () => {
      this.disconnect();
    });
  }

  connected() {
    if (typeof this.connect == 'function') {
      this.connect(this.socket);
    }
  }

  disconnect() {
    if (typeof this.dispose == 'function') {
      this.dispose(this.socket);
    }
  }
}

export default Socket;
