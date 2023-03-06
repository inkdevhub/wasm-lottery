# WASM lottery project
This contract is an example for the lottery implementation in wasm.

### License
Apache 2.0

### 🏗️ How to use - Contracts


##### 💫 Build
- Use this [instructions](https://use.ink/getting-started/setup) to setup your ink!/Rust environment

Clone project
```sh
git clone git@github.com:swanky-dapps/wasm-lottery.git
```

Build

```sh
swanky contract compile lottery
```

##### 💫 Run unit test

```sh
swanky test
```

##### 💫 Deploy
First start your local node. Recommended [swanky-node](https://github.com/AstarNetwork/swanky-node) v1.0.0
```sh
swanky contract deploy lottery
```
- or deploy polkadot JS. Instructions on [Astar docs](https://docs.astar.network/docs/wasm/sc-dev/polkadotjs-ui)

##### 💫 Run integration test
First start your local node. Recommended [swanky-node](https://github.com/AstarNetwork/swanky-node) v1.0.0

```sh
yarn
yarn compile
yarn test
```

##### 💫 Deployed contracts

Shibuya: ZZJDDGxbe4gximPQGQyPYTvEXEhpagpsStpTYetABEAUeRu


## 🏗️ How to use - UI

```
yarn
yarn start
```

Goto http://localhost:3000


##### links
link to firebase deployed website: https://wasm-lottery.web.app/