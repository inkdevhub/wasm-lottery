/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@supercolony/typechain-types';
import type { QueryReturnType } from '@supercolony/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@supercolony/typechain-types';
import type * as ArgumentTypes from '../types-arguments/lottery';
import type * as ReturnTypes from '../types-returns/lottery';
import type BN from 'bn.js';
import {ReturnNumber} from '@supercolony/typechain-types';
import {getTypeDescription} from './../shared/utils';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
	}

	/**
	* enter
	*
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"enter" (
		__options ? : GasLimitAndRequiredValue,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "enter", [], __options , (result) => { return handleReturnType(result, getTypeDescription(5, 'lottery')); });
	}

	/**
	* pickWinner
	*
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"pickWinner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "pickWinner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(5, 'lottery')); });
	}

	/**
	* startLottery
	*
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"startLottery" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "startLottery", [], __options , (result) => { return handleReturnType(result, getTypeDescription(5, 'lottery')); });
	}

	/**
	* stopLottery
	*
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"stopLottery" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "stopLottery", [], __options , (result) => { return handleReturnType(result, getTypeDescription(5, 'lottery')); });
	}

}