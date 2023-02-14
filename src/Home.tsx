import React, { useContext, useEffect, useState } from 'react'
import {
  web3Enable,
  isWeb3Injected,
  web3Accounts,
  web3FromSource
} from '@polkadot/extension-dapp'
import Identicon from '@polkadot/react-identicon'
import { ApiPromise, Keyring } from '@polkadot/api'
import { Abi, ContractPromise } from '@polkadot/api-contract'
import type { WeightV2 } from '@polkadot/types/interfaces'
import { BN } from '@polkadot/util/bn'
import type { InjectedAccountWithMeta, InjectedExtension } from '@polkadot/extension-inject/types'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import CardContent from '@mui/material/CardContent'

import ABI from './artifacts/lottery.json'
import { ApiContext } from './context/ApiContext'

const address: string = process.env.CONTRACT_ADDRESS || 'XbktSrCssNPbGREvbjRVR8Ag71wS7F6ym9uddecYzxj1TQ8'
const network: string = process.env.NETWORK || 'shibuya'

const BN_TWO = new BN(2)

function Home() {
  const { api, apiReady } = useContext(ApiContext)
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([])
  const [account, setAccount] = useState<InjectedAccountWithMeta>()
  const [lotteryPot, setLotteryPot] = useState<string>('')
  const [lotteryPlayers, setPlayers] = useState<string[]>([])
  const [lotteryHistory, setLotteryHistory] = useState([])
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [contract, setContract] = useState<ContractPromise>()

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

    if (!account) {
      setError('Account not initialized')
      return
    }

    if (!contract) {
      setError('Contract not initialized')
      return
    }

    const gasLimit = getGasLimit(api)

    const { gasRequired, result, output } = await contract.query.pot(
      account.address,
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

    const { gasRequired, storageDeposit, result } = await contract.query.enter(
      account.address,
      {
        gasLimit: gasLimit,
        storageDepositLimit: null,
        value: new BN('1000000000000000000')
      }
    )

    console.log('gasRequired', gasRequired.toHuman())
    console.log('storageDeposit', storageDeposit.toHuman())

    if (result.isErr) {

      let error = ''
      if (result.asErr.isModule) {
        const dispatchError = api.registry.findMetaError(result.asErr.asModule)
        console.log('error', dispatchError.name)
        error = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name
      } else {
        error = result.asErr.toString()
      }

      setError(error)
      return
    }

    if (result.isOk) {
      const flags = result.asOk.flags.toHuman()
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
        storageDepositLimit: null,
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
      account.address,
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
      const flags = result.asOk.flags.toHuman()
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
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <h1>WASM Lottery</h1>
            </Grid>
            <Grid item xs={2}>
              {accounts.length === 0
                ? <Box sx={{ p: 2 }}>
                    <Button onClick={connectWalletHandler} variant="outlined">Connect Wallet</Button>
                  </Box>
                : null
              }
            </Grid>
            <Grid item xs={8}>
              <Typography>Enter the lottery by sending value</Typography>
              <FormControl sx={{'width': '600px'}} >
                <InputLabel>Select Account</InputLabel>
                <Select
                  value={accounts[0]?.address || ''}
                  label="Select Account"
                  onChange={handleOnSelect}
                >
                  {accounts.map(account => (
                    <MenuItem value={account.address}>
                      <Grid container spacing={2}>
                        <Grid item xs={1}>
                          <Identicon
                            value={account.address}
                            theme='polkadot'
                            size={40}
                          />
                        </Grid>
                        <Grid item xs={11}>
                          <Typography sx={{ fontWeight: 'bold' }}>{account.meta.name}</Typography>
                          <Typography>{account.address}</Typography>
                        </Grid>
                      </Grid>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Lottery Pot: {lotteryPot || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={8}>
              <Button variant="outlined" onClick={enterLotteryHandler}>Play now</Button>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Players ({lotteryPlayers.length})
                  </Typography>
                  {
                    (lotteryPlayers && lotteryPlayers.length > 0) && lotteryPlayers.map((player, index) => {
                      return <li key={`${player}-${index}`}>
                        <a href={`https://${network}.subscan.io/account/${player}`} target="_blank">
                          {player}
                        </a>
                      </li>
                    })
                  }
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={8}>
              <Button variant="contained" onClick={pickWinnerHandler}>Pick Winner</Button>
            </Grid>
            <Grid item xs={4}>
              <Card>
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
              </Card>
            </Grid>
            <Grid item>
              <div className="container has-text-danger mt-6">
                <p>{error}</p>
              </div>
            </Grid>
            <Grid item>
              <div className="container has-text-success mt-6">
                <p>{successMsg}</p>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Home
