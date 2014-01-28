Stratum Solo Mining
=================

Stratum server for solo mining for any daemon SHA256 and Litecoin in Node.js

You can create a multi coin solo mining central, just assign multiple daemons then change,
and watch the values of most profitable coin using Cryptsy API.

You should use this to have one server that holds your daemons, and make a lot of miners to connect to it,
it can handle a hell alot of traffic and still be performant.

Install
=================

Directly from github (easier):

```bash
git clone git@github.com:pocesar/node-stratum-solo.git
cd node-stratum-solo
node .
``

or through NPM:

```bash
npm install stratum-solo
cd node_modules/stratum-solo
node .
```

Usage
=================

It comes with litecoin and bitcoin enabled that will work on testnet by default, because it's mainly a PoC.

You should edit `index.js` with your settings. It's almost sure it won't work out of the box,
since the path of the daemons are hardcoded, you should change it to match your system. Also the daemon
must accept `getblocktemplate` RPC command, and you must provide the proper credentials
in the `index.js` file.

Support
=================

`BTC: 1PskTzQjmzqB2boz67AXsv4C5YNWN4xmhu`


`LTC: LW2kXiquqDu3GfpfBX2xNTSgjVmBPu6g3z`


`PPC: PNKZEkDf9eBSNebu2CcxHaGuma6wHuZEBh`


`XPM: ARKZ7uVE1YS19HC8jSq5xZGkr6YAzugWBv`


```bash
npm star stratum-solo
```