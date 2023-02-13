import { ApiPromise, Keyring } from '@polkadot/api'
import { useMemo } from 'react'
import Lottery from '../typedContract/contracts/lottery'

const useContract = (api: ApiPromise | undefined, apiReady: boolean) => {
  const address: string = process.env.CONTRACT_ADDRESS || 'XJvi9BGdvzRx6KJbVv8t1mqmrQoe4eiFyH6KetrRRj4J5Hf'

  return useMemo(() => {
    if (!address || !api || !apiReady) return null
    const keyring = new Keyring({ type: 'sr25519' })
    const aliceKeyringPair = keyring.addFromUri('//Alice')
    try {
      return new Lottery(
        address,
        aliceKeyringPair,
        api
      )
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, api, apiReady])
}

export default useContract
