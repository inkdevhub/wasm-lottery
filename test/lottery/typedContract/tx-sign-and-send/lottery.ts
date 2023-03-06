/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/lottery';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __apiPromise: ApiPromise;

	constructor(
		apiPromise: ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
	}

	/**
	* owner
	*
	*/
	"owner" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "owner", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lottery");
		}, [], __options);
	}

	/**
	* pot
	*
	*/
	"pot" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pot", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lottery");
		}, [], __options);
	}

	/**
	* isRunning
	*
	*/
	"isRunning" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "isRunning", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lottery");
		}, [], __options);
	}

	/**
	* getPlayers
	*
	*/
	"getPlayers" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getPlayers", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lottery");
		}, [], __options);
	}

	/**
	* getBalance
	*
	* @param { ArgumentTypes.AccountId } caller,
	*/
	"getBalance" (
		caller: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getBalance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lottery");
		}, [caller], __options);
	}

	/**
	* enter
	*
	*/
	"enter" (
		__options ? : GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "enter", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lottery");
		}, [], __options);
	}

	/**
	* pickWinner
	*
	*/
	"pickWinner" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "pickWinner", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lottery");
		}, [], __options);
	}

	/**
	* startLottery
	*
	*/
	"startLottery" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "startLottery", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lottery");
		}, [], __options);
	}

	/**
	* stopLottery
	*
	*/
	"stopLottery" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "stopLottery", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "lottery");
		}, [], __options);
	}

}