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