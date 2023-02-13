import type BN from 'bn.js';

export type AccountId = string | number[]

export enum Error {
	lotteryNotRunning = 'LotteryNotRunning',
	callerNotOwner = 'CallerNotOwner',
	noValueSent = 'NoValueSent',
	errTransfer = 'ErrTransfer'
}

