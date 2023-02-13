/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@supercolony/typechain-types';
import type { QueryReturnType } from '@supercolony/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@supercolony/typechain-types';
import { txSignAndSend } from '@supercolony/typechain-types';
import type * as ArgumentTypes from '../types-arguments/lottery';
import type * as ReturnTypes from '../types-returns/lottery';
import type BN from 'bn.js';
import {ReturnNumber} from '@supercolony/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __callerAddress : string;
	private __apiPromise: ApiPromise;

	constructor(
		apiPromise : ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
	}

	/**
	* enter
	*
	* @returns { void }
	*/
	"enter" (
		__options: GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "enter", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lottery");
		}, [], __options);
	}

	/**
	* pickWinner
	*
	* @returns { void }
	*/
	"pickWinner" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pickWinner", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lottery");
		}, [], __options);
	}

	/**
	* startLottery
	*
	* @returns { void }
	*/
	"startLottery" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "startLottery", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lottery");
		}, [], __options);
	}

	/**
	* stopLottery
	*
	* @returns { void }
	*/
	"stopLottery" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "stopLottery", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lottery");
		}, [], __options);
	}

}