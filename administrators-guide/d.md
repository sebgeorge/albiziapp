# Albiziapp Server Processes and DB

## App Processes 

Albiziapp VM hosts two distinct applications :

### Albiziapp 

URL : https://albiziapp.reveries-project.fr

ssl : certbot

The Albiziapp application process is a node application managed by **pm2.** From a shell :

```bash
$ pm2 list
```

gives access to the list of process managed by pm2. Here, only one :

![](../.gitbook/assets/image%20%2811%29.png)

pm2 is very convenient to manage an app in production. Among others, it will restart the node app in case of crash, it keeps  `stdout` and `stderr` \(access through pm2 logs\):

```bash
$ pm2 logs osm-app --lines 100
/home/reveries/.pm2/logs/osm-app-error.log last 30 lines:
0|osm-app  | designed for a production environment, as it will leak
0|osm-app  | memory, and will not scale past a single process.
0|osm-app  | (node:17142) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
0|osm-app  | (node:17142) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
0|osm-app  | (node:17142) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
0|osm-app  | { Error: connect ECONNREFUSED 127.0.0.1:8081
0|osm-app  |     at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1106:14)
0|osm-app  |   errno: 'ECONNREFUSED',
0|osm-app  |   code: 'ECONNREFUSED',
0|osm-app  |   syscall: 'connect',
0|osm-app  |   address: '127.0.0.1',
0|osm-app  |   port: 8081 }
0|osm-app  | `encrypted` option is deprecated in favor of `useTLS`
0|osm-app  | Warning: connect.session() MemoryStore is not
0|osm-app  | designed for a production environment, as it will leak
0|osm-app  | memory, and will not scale past a single process.
0|osm-app  | (node:5041) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
0|osm-app  | { Error: connect ECONNREFUSED 127.0.0.1:8081
0|osm-app  |     at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1106:14)
0|osm-app  |   errno: 'ECONNREFUSED',
0|osm-app  |   code: 'ECONNREFUSED',
0|osm-app  |   syscall: 'connect',
0|osm-app  |   address: '127.0.0.1',
0|osm-app  |   port: 8081 }
0|osm-app  | `encrypted` option is deprecated in favor of `useTLS`
0|osm-app  | Warning: connect.session() MemoryStore is not
0|osm-app  | designed for a production environment, as it will leak
0|osm-app  | memory, and will not scale past a single process.
0|osm-app  | (node:5077) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
0|osm-app  | (node:5077) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.

/home/reveries/.pm2/logs/osm-app-out.log last 30 lines:
0|osm-app  | 5d16635b4404bf15804f41de
0|osm-app  | 5d165faf4404bf15804f41ca
0|osm-app  | 5d165faf4404bf15804f41ca
0|osm-app  | 5d16128b7bfe04085df48fab
0|osm-app  | 5d1611c97bfe04085df48f99
0|osm-app  | 5d165e0e4404bf15804f41bd
0|osm-app  | 5d1612197bfe04085df48f9f
0|osm-app  | 5d16128b7bfe04085df48fab
0|osm-app  | 5d165faf4404bf15804f41ca
0|osm-app  | 5d165f2a4404bf15804f41c3
0|osm-app  | 5d165f2a4404bf15804f41c3
0|osm-app  | 5d165d7e4404bf15804f41b3
0|osm-app  | 5d165faf4404bf15804f41ca
0|osm-app  | 5d165d9a4404bf15804f41b8
0|osm-app  | 5d16615f4404bf15804f41d0
0|osm-app  | 5d16110a7bfe04085df48f8e
0|osm-app  | 5d1664714404bf15804f41e5
0|osm-app  | 5d1664ce4404bf15804f41eb
0|osm-app  | 5d1665a34404bf15804f41f1
0|osm-app  | 5d160ff97bfe04085df48f83
0|osm-app  | 5d16105e7bfe04085df48f89
0|osm-app  | 5d1612197bfe04085df48f9f
0|osm-app  | 5d1611c97bfe04085df48f99
0|osm-app  | 5d166c894404bf15804f4216
0|osm-app  | 5d166dca4404bf15804f421c
0|osm-app  | 5d166dca4404bf15804f421c
0|osm-app  | 5d16105e7bfe04085df48f89
0|osm-app  | 5d160ff97bfe04085df48f83
0|osm-app  | 5d1611c97bfe04085df48f99
0|osm-app  | 5d16110a7bfe04085df48f8e

```

 It also provides lot of usefull info about the process state \(pm2 show\)

```bash
reveries@albiziapp:~$ pm2 show 0
 Describing process with id 0 - name osm-app 
┌───────────────────┬────────────────────────────────────────────┐
│ status            │ online                                     │
│ name              │ osm-app                                    │
│ version           │ 1.0.0                                      │
│ restarts          │ 47                                         │
│ uptime            │ 51D                                        │
│ script path       │ /home/reveries/reveries-osm-data/index.js  │
│ script args       │ N/A                                        │
│ error log path    │ /home/reveries/.pm2/logs/osm-app-error.log │
│ out log path      │ /home/reveries/.pm2/logs/osm-app-out.log   │
│ pid path          │ /home/reveries/.pm2/pids/osm-app-0.pid     │
│ interpreter       │ node                                       │
│ interpreter args  │ N/A                                        │
│ script id         │ 0                                          │
│ exec cwd          │ /home/reveries/reveries-osm-data           │
│ exec mode         │ fork_mode                                  │
│ node.js version   │ 10.16.0                                    │
│ node env          │ production                                 │
│ watch & reload    │ ✔                                          │
│ unstable restarts │ 1                                          │
│ created at        │ 2019-10-01T12:28:09.759Z                   │
└───────────────────┴────────────────────────────────────────────┘
 Revision control metadata 
┌──────────────────┬───────────────────────────────────────────────────────────┐
│ revision control │ git                                                       │
│ remote url       │ https://github.com/REVERIES-project/reveries-osm-data.git │
│ repository root  │ /home/reveries/reveries-osm-data                          │
│ last update      │ 2019-09-27T09:34:16.930Z                                  │
│ revision         │ 8fa57dfecde55be9b3f6ca3d46f8648f1960fb63                  │
│ comment          │ key                                                       │
│ branch           │ master                                                    │
└──────────────────┴───────────────────────────────────────────────────────────┘
 Actions available 
┌────────────────────────┐
│ km:heapdump            │
│ km:cpu:profiling:start │
│ km:cpu:profiling:stop  │
│ km:heap:sampling:start │
│ km:heap:sampling:stop  │
└────────────────────────┘
 Trigger via: pm2 trigger osm-app <action_name>

 Code metrics value 
┌────────────────────────┬──────────────────────┐
│ Heap Size              │ 43.55 MiB            │
│ Heap Usage             │ 85.45 %              │
│ Used Heap Size         │ 37.21 MiB            │
│ Active requests        │ 0                    │
│ Active handles         │ 10                   │
│ Event Loop Latency     │ 0.82 ms              │
│ Event Loop Latency p95 │ 2.72 ms              │
│ HTTP Mean Latency      │ 2 ms                 │
│ HTTP P95 Latency       │ 85.64999999999986 ms │
│ HTTP                   │ 0 req/min            │
└────────────────────────┴──────────────────────┘
 Divergent env variables from local env 
┌────────────────┬───────────────────────────────────────┐
│ SSH_CONNECTION │ 172.30.1.216 46178 193.52.29.161 2202 │
│ XDG_SESSION_ID │ 128                                   │
│ PWD            │ /home/reveries/reveries-osm-data      │
│ SSH_CLIENT     │ 172.30.1.216 46178 2202               │
└────────────────┴───────────────────────────────────────┘


```

### Albiziapp-viewer

URL : [https://viewer.albiziapp.reveries-project.fr/](https://viewer.albiziapp.reveries-project.fr/)

ssl : certbot

This process **isn't managed** by pm2 at the moment. 

{% hint style="info" %}
TODO : use pm2 for albiziapp-viewer
{% endhint %}

## Data persistence 

All data collected \(so far\) in Albiziapp is stored in an **unique instance of MongoDB.** 



