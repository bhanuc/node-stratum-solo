'use strict';

var
  Stratum = require('stratum'),
  servers = {
    scrypt: {
      daemons: {
        litecoin: {
          name    : 'litecoin',
          path    : 'G:\\Dropbox\\Coins\\LTC\\daemon\\litecoind.exe',
          datadir : 'G:\\Dropbox\\Coins\\LTC\\data',
          user    : 'user',
          password: 'password',
          port    : 9332,
          host    : '127.0.0.1',
          args    : [
            'testnet'
          ]
        }
      },
      server : new Stratum.Server({
        settings: {
          port: 3334
        }
      })
    },
    sha256: {
      daemons: {
        bitcoin: {
          name    : 'bitcoin',
          path    : 'G:\\Dropbox\\Coins\\BTC\\daemon\\bitcoind.exe',
          datadir : 'G:\\Dropbox\\Coins\\BTC\\data',
          user    : 'user',
          password: 'password',
          port    : 8332,
          host    : '127.0.0.1',
          args    : [
            'testnet'
          ]
        }
      },
      server : new Stratum.Server({
        settings: {
          port: 3333
        }
      })
    }
  },
  daemon;

var setup = function(type, coin){
  coin.server.on('mining', function (req, deferred, socket){
    console.log(req);

    switch (req.method) {
      case 'subscribe':
        /* miner is asking for subscription */
        break;
      case 'authorize':
        /* miner is asking for authorization */
        break;
      case 'submit':
        /* miner is submitting a share */
        break;
      default:
        deferred.reject(Stratum.Server.errors.METHOD_NOT_FOUND);
    }
  });

  coin.server.on('rpc', function (name, args, connection, deferred){
    switch (name) {
      case 'mining.block':
        var daemon = args[1];
        if (typeof coin.daemons[daemon] !== 'undefined') {
          coin.server.broadcast('notify');

        }
        deferred.resolve(['ok']);
        break;
    }
  });

  coin.server.on('mining.error', function(message){
    console.log(type + ' error: ', message);
  });

  coin.server.listen().then(function (port){
    // Start all our daemons
    for (var daemon in coin.daemons) {
      if (coin.daemons[daemon].start()) {
        (function(d){
          console.log('Starting ' + d.name);

          d.on('close', function(){
            console.log(d.name + ' process closed');
          });

          setTimeout(function(){
            d.call('getinfo').then(function(info){
              console.log(d.name + ' info: ', info);
            }, function(err){
              console.log(d.name + ' :', err);
            });
          }, 15000);
        })(coin.daemons[daemon]);
      }
    }
    console.log(type.toUpperCase() + ': ' + port);
  });
};

/* Create a daemon for each item in daemons */
for(var type in {'sha256':true,'scrypt':true}) {

  for (daemon in servers[type].daemons){

    servers[type].daemons[daemon] =
      new Stratum.Daemon(servers[type].daemons[daemon]);
  }

  /* SHA256 and Scrypt coins, our miner shouldnt worry which
     type of coin is this
  */
  setup(type, servers[type]);
}

