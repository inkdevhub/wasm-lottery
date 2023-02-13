/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@supercolony/typechain-types';
import { buildSubmittableExtrinsic } from '@supercolony/typechain-types';
import type * as ArgumentTypes from '../types-arguments/lottery';
import type BN from 'bn.js';



export default class Methods {
	private __nativeContract : ContractPromise;

	constructor(
		nativeContract : ContractPromise,
	) {
		this.__nativeContract = nativeContract;
	}
	/**
	 * owner
	 *
	*/
	"owner" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "owner", [], __options);
	}

	/**
	 * isRunning
	 *
	*/
	"isRunning" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "isRunning", [], __options);
	}

	/**
	 * getPlayers
	 *
	*/
	"getPlayers" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "getPlayers", [], __options);
	}

	/**
	 * getBalance
	 *
	 * @param { ArgumentTypes.AccountId } caller,
	*/
	"getBalance" (
		caller: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "getBalance", [caller], __options);
	}

	/**
	 * enter
	 *
	*/
	"enter" (
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "enter", [], __options);
	}

	/**
	 * pickWinner
	 *
	*/
	"pickWinner" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "pickWinner", [], __options);
	}

	/**
	 * startLottery
	 *
	*/
	"startLottery" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "startLottery", [], __options);
	}

	/**
	 * stopLottery
	 *
	*/
	"stopLottery" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "stopLottery", [], __options);
	}

}