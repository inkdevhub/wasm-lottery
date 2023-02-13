import React, { useContext, useEffect, useState } from 'react';
import {
  web3Enable,
  isWeb3Injected,
  web3Accounts,
  web3FromSource
} from '@polkadot/extension-dapp'
import { ApiPromise, Keyring } from '@polkadot/api'
import { Abi, ContractPromise } from '@polkadot/api-contract'
import type { WeightV2 } from '@polkadot/types/interfaces'
import { BN } from '@polkadot/util/bn'
import type { InjectedAccountWithMeta, InjectedExtension } from '@polkadot/extension-inject/types'
import 'bulma/css/bulma.css'

import ABI from './artifacts/lottery.json';
import { ApiContext } from './context/ApiContext';

const address: string = process.env.CONTRACT_ADDRESS || 'ZuhUFU9DLWYbRshzuV6tg7mkt8vvLGtee1Zvx2mnQwqg3e2'
const network: string = process.env.NETWORK || 'shibuya'

const BN_TWO = new BN(2)

function Home() {
  const { api, apiReady } = useContext(ApiContext);
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([])
  const [account, setAccount] = useState<InjectedAccountWithMeta>()
  const [lotteryPot, setLotteryPot] = useState<string>('')
  const [lotteryPlayers, setPlayers] = useState<string[]>([])
  const [lotteryHistory, setLotteryHistory] = useState([])
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [contract, setContract] = useState<ContractPromise>();

  useEffect(() => {
    updateState()
  }, [contract])

  const estimateGas = (api: ApiPromise, gasRequired: WeightV2) => {
    const estimatedGas = api.registry.createType(
      'WeightV2',
      {
        refTime: gasRequired.refTime.toBn().mul(BN_TWO),
        proofSize: gasRequired.proofSize.toBn().mul(BN_TWO),
      }
    ) as WeightV2

    return estimatedGas
  }


  const updateState = () => {
    if (contract) getPot()
    if (contract) getPlayers()
  }

  const getGasLimit = (api: ApiPromise) =>
    api.registry.createType(
      'WeightV2',
      api.consts.system.blockWeights['maxBlock']
    )

  const getPot = async () => {
    if (!api || !apiReady) {
      setError('The API is not ready')
      return
    }

    if (!contract) {
      setError('Contract not initialized')
      return
    }

    const gasLimit = getGasLimit(api)

    const { gasRequired, result, output } = await contract.query.pot(
      address,
      {
        gasLimit,
      }
    )
    console.log('gasRequired', gasRequired.toString())
    console.log('result', result.toHuman())
    console.log('output', output?.toHuman())

    if (result.isErr) {
      setError(result.asErr.toString())
      return
    }

    if (output) {
      const pot = output.toHuman() as string
      setLotteryPot(pot)
    }
  }

  const getPlayers = async () => {
    if (!api || !apiReady) {
      setError('The API is not ready')
      return
    }

    if (!contract) {
      setError('Contract not initialized')
      return
    }

    const gasLimit = getGasLimit(api)

    const { gasRequired, result, output } = await contract.query.getPlayers(
      address,
      {
        gasLimit,
      }
    )
    console.log('gasRequired', gasRequired.toString())
    console.log('result', result.toHuman())
    console.log('output', output?.toHuman())
    if (result.isErr) {
      setError(result.asErr.toString())
      return
    }

    if (output) {
      const players = output.toHuman() as string[]
      setPlayers(players)
    }
  }

  const getHistory = async (id) => {

  }

  const enterLotteryHandler = async () => {
    setError('')
    setSuccessMsg('')
    if (!api || !apiReady) {
      setError('The API is not ready')
      return
    }

    if (!contract) {
      setError('no contract')
      return
    }

    if (!account) {
      setError('account not selected')
      return
    }

    const gasLimit = getGasLimit(api)

    const { gasRequired, result } = await contract.query.enter(
      address,
      {
        gasLimit,
        value: new BN('1000000000000000000')
      }
    )

    console.log(result.toHuman())

    if (result.isErr) {
      let error = ''
      if (result.asErr.isModule) {
        const dispatchError = api.registry.findMetaError(result.asErr.asModule)
        error = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name
      } else {
        error = result.asErr.toString()
      }

      setError(error)
      return
    }

    if (result.isOk) {
      const flags = result.asOk.flags.toHuman();
      if (flags.includes('Revert')) {
        console.log('Revert')
        console.log(result.toHuman())
        const type = contract.abi.messages[5].returnType
        const typeName = type?.lookupName || type?.type || ''
        const error = contract.abi.registry.createTypeUnsafe(typeName, [result.asOk.data]).toHuman()

        setError(error ? (error as any).Err : 'Revert')
        return
      }
    }

    const estimatedGas = estimateGas(api, gasRequired)

    await contract.tx
      .enter({
        gasLimit: estimatedGas,
        value: new BN('1000000000000000000')
      })
      .signAndSend(account.address, (res) => {
        if (res.status.isInBlock) {
          console.log('in a block')
        }
        if (res.status.isFinalized) {
          console.log('finalized')
          updateState()
          setSuccessMsg('Successfully entered in lottery!')
        }
      })
  }

  const pickWinnerHandler = async () => {
    setError('')
    setSuccessMsg('')
    if (!api || !apiReady) {
      setError('The API is not ready')
      return
    }

    if (!contract) {
      setError('no contract')
      return
    }

    if (!account) {
      setError('account not selected')
      return
    }

    const gasLimit = getGasLimit(api)

    const { gasRequired, result } = await contract.query.pickWinner(
      address,
      {
        gasLimit,
      }
    )

    if (result.isErr) {
      let error = ''
      if (result.asErr.isModule) {
        const dispatchError = api.registry.findMetaError(result.asErr.asModule)
        error = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name
      } else {
        error = result.asErr.toString()
      }

      setError(error)
      return
    }

    if (result.isOk) {
      const flags = result.asOk.flags.toHuman();
      if (flags.includes('Revert')) {
        console.log('Revert')
        console.log(result.toHuman())
        const type = contract.abi.messages[6].returnType
        const typeName = type?.lookupName || type?.type || ''
        const error = contract.abi.registry.createTypeUnsafe(typeName, [result.asOk.data]).toHuman()

        setError(error ? (error as any).Err : 'Revert')
        return
      }
    }

    const estimatedGas = estimateGas(api, gasRequired)

    await contract.tx
      .pickWinner({
        gasLimit: estimatedGas,
      })
      .signAndSend(account.address, (res) => {
        if (res.status.isInBlock) {
          console.log('in a block')
        }
        if (res.status.isFinalized) {
          console.log('finalized')
          updateState()
          setSuccessMsg('Successfully picked winner!')
        }
      })
  }

  const connectWalletHandler = async () => {
    setError('')
    setSuccessMsg('')
    if (!api || !apiReady) {
      setError('The API is not ready')
      return
    }

    const extensions = await web3Enable('Wasm Lottery')

    /* check if wallet is installed */
    if (extensions.length === 0) {
      setError('The user does not have any Substrate wallet installed')
      return
    }

    // set the first wallet as the signer (we assume there is only one wallet)
    api.setSigner(extensions[0].signer)

    const injectedAccounts = await web3Accounts()

    if (injectedAccounts.length > 0) {
      setAccounts(injectedAccounts)
    }

    const abi = new Abi(ABI, api.registry.getChainProperties())

    const contract = new ContractPromise(api, abi, address)

    setContract(contract)
  }

  const handleOnSelect = async (event: any) => {
    if (!api || !apiReady) {
      setError('The API is not ready')
      return false
    }
    const address: string = event.target.value
    const account = accounts.find(account => account.address === address)
    if (account) {
      setAccount(account)

      const injected = await web3FromSource(account.meta.source)
      api.setSigner(injected.signer)
    }
  }

  return (
    <div>
      <main className="main">
        <nav className="navbar mt-4 mb-4">
          <div className="container">
            <div className="navbar-brand">
              <h1>WASM Lottery</h1>
            </div>
            {accounts.length === 0
              ? <div className="navbar-end">
                  <button onClick={connectWalletHandler} className="button is-link">Connect Wallet</button>
                </div>
              : null
            }
          </div>
        </nav>
        <div className="container">
          <section className="mt-5">
            <div className="columns">
              <div className="column is-two-thirds">
                <section className="mt-5">
                  <p>Enter the lottery by sending Value</p>
                  <div>

                    <select onChange={handleOnSelect}>
                      <option value="">Select Address</option>
                      {accounts.map(account => (
                        <option key={account.address} value={account.address}>{account.meta.name} {account.address}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button onClick={enterLotteryHandler} className="button is-link is-large is-light mt-3">Play now</button>
                  </div>
                </section>
                <section className="mt-6">
                  <button onClick={pickWinnerHandler} className="button is-primary is-large is-light mt-3">Pick Winner</button>
                </section>
                <section>
                  <div className="container has-text-danger mt-6">
                    <p>{error}</p>
                  </div>
                </section>
                <section>
                  <div className="container has-text-success mt-6">
                    <p>{successMsg}</p>
                  </div>
                </section>
              </div>
              <div className={"column is-one-third"}>
                <section className="mt-5">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <h2>Lottery History</h2>
                        {/* {
                          (lotteryHistory && lotteryHistory.length > 0) && lotteryHistory.map(item => {
                            if (lotteryId != item.id) {
                              return <div className="history-entry mt-3" key={item.id}>
                                <div>Lottery #{item.id} winner:</div>
                                <div>
                                  <a href={`https://etherscan.io/address/${item.address}`} target="_blank">
                                    {item.address}
                                  </a>
                                </div>
                              </div>
                            }
                          })
                        } */}
                      </div>
                    </div>
                  </div>
                </section>
                <section className="mt-5">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <h2>Players ({lotteryPlayers.length})</h2>
                        <ul className="ml-0">
                          {
                            (lotteryPlayers && lotteryPlayers.length > 0) && lotteryPlayers.map((player, index) => {
                              return <li key={`${player}-${index}`}>
                                <a href={`https://${network}.subscan.io/account/${player}`} target="_blank">
                                  {player}
                                </a>
                              </li>
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="mt-5">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <h2>Pot</h2>
                        <p>{lotteryPot}</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;
