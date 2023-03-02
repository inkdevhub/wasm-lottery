/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/lottery';
import type * as ReturnTypes from '../types-returns/lottery';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
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
	* owner
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"owner" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "owner", [], __options, (result) => { return handleReturnType(result, getTypeDescription(0, 'lottery')); });
	}

	/**
	* pot
	*
	* @returns { ReturnNumber }
	*/
	"pot" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pot", [], __options, (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* isRunning
	*
	* @returns { boolean }
	*/
	"isRunning" (
		__options: GasLimit,
	): Promise< QueryReturnType< boolean > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "isRunning", [], __options);
	}

	/**
	* getPlayers
	*
	* @returns { Array<ReturnTypes.AccountId> }
	*/
	"getPlayers" (
		__options: GasLimit,
	): Promise< QueryReturnType< Array<ReturnTypes.AccountId> > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getPlayers", [], __options, (result) => { return handleReturnType(result, getTypeDescription(4, 'lottery')); });
	}

	/**
	* getBalance
	*
	* @param { ArgumentTypes.AccountId } caller,
	* @returns { ReturnNumber | null }
	*/
	"getBalance" (
		caller: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnNumber | null > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getBalance", [caller], __options, (result) => { return handleReturnType(result, getTypeDescription(8, 'lottery')); });
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