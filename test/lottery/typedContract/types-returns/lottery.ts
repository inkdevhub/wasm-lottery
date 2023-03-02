import type BN from 'bn.js';
import type {ReturnNumber} from '@727-ventures/typechain-types';

export type AccountId = string | number[]

export type Key = string | number[]

export enum Error {
	lotteryNotRunning = 'LotteryNotRunning',
	callerNotOwner = 'CallerNotOwner',
	noValueSent = 'NoValueSent',
	errTransfer = 'ErrTransfer',
	playerAlreadyInLottery = 'PlayerAlreadyInLottery',
	noEntries = 'NoEntries'
}

