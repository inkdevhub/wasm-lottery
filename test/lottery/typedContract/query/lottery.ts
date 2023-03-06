/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/lottery';
import type * as ReturnTypes from '../types-returns/lottery';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __apiPromise: ApiPromise;
	private __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		nativeApi : ApiPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
		this.__apiPromise = nativeApi;
	}

	/**
	* owner
	*
	* @returns { ReturnTypes.AccountId }
	*/
	"owner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnTypes.AccountId > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "owner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(0, 'lottery')); });
	}

	/**
	* pot
	*
	* @returns { ReturnNumber }
	*/
	"pot" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pot", [], __options , (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* isRunning
	*
	* @returns { boolean }
	*/
	"isRunning" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< boolean > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "isRunning", [], __options );
	}

	/**
	* getPlayers
	*
	* @returns { Array<ReturnTypes.AccountId> }
	*/
	"getPlayers" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Array<ReturnTypes.AccountId> > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getPlayers", [], __options , (result) => { return handleReturnType(result, getTypeDescription(4, 'lottery')); });
	}

	/**
	* getBalance
	*
	* @param { ArgumentTypes.AccountId } caller,
	* @returns { ReturnNumber | null }
	*/
	"getBalance" (
		caller: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnNumber | null > >{
		return queryJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getBalance", [caller], __options , (result) => { return handleReturnType(result, getTypeDescription(8, 'lottery')); });
	}

	/**
	* enter
	*
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"enter" (
		__options ? : GasLimitAndRequiredValue,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "enter", [], __options , (result) => { return handleReturnType(result, getTypeDescription(9, 'lottery')); });
	}

	/**
	* pickWinner
	*
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"pickWinner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "pickWinner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(9, 'lottery')); });
	}

	/**
	* startLottery
	*
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"startLottery" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "startLottery", [], __options , (result) => { return handleReturnType(result, getTypeDescription(9, 'lottery')); });
	}

	/**
	* stopLottery
	*
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"stopLottery" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "stopLottery", [], __options , (result) => { return handleReturnType(result, getTypeDescription(9, 'lottery')); });
	}

}