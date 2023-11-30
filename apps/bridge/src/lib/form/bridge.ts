import yup, { MaxAmountValidationParams, MinAmountValidationParams } from './yup.custom';

const BRIDGE_DEPOSIT_AMOUNT = 'bridge-deposit-amount';
const BRIDGE_DEPOSIT_GAS_TOKEN = 'bridge-deposit-gas-token';

type BridgeDepositFormValues = {
  [BRIDGE_DEPOSIT_AMOUNT]?: string;
  [BRIDGE_DEPOSIT_GAS_TOKEN]?: string;
};

type BridgeDepositFormValidationParams = {
  [BRIDGE_DEPOSIT_AMOUNT]: MaxAmountValidationParams & MinAmountValidationParams;
};

const bridgeDepositSchema = (params: BridgeDepositFormValidationParams) =>
  yup.object().shape({
    [BRIDGE_DEPOSIT_AMOUNT]: yup
      .string()
      .requiredAmount('bridge')
      .maxAmount(params[BRIDGE_DEPOSIT_AMOUNT], 'bridge')
      .minAmount(params[BRIDGE_DEPOSIT_AMOUNT], 'bridge'),
    [BRIDGE_DEPOSIT_GAS_TOKEN]: yup.string().required()
  });

const BRIDGE_WITHDRAW_AMOUNT = 'bridge-withdraw-amount';
const BRIDGE_WITHDRAW_GAS_TOKEN = 'bridge-withdraw-gas-token';

type BridgeWithdrawFormValues = {
  [BRIDGE_WITHDRAW_AMOUNT]?: string;
  [BRIDGE_WITHDRAW_GAS_TOKEN]?: string;
};

type BridgeWithdrawFormValidationParams = {
  [BRIDGE_WITHDRAW_AMOUNT]: MaxAmountValidationParams & MinAmountValidationParams;
};

const bridgeWithdrawSchema = (params: BridgeWithdrawFormValidationParams) =>
  yup.object().shape({
    [BRIDGE_WITHDRAW_AMOUNT]: yup
      .string()
      .requiredAmount('bridge')
      .maxAmount(params[BRIDGE_WITHDRAW_AMOUNT], 'bridge')
      .minAmount(params[BRIDGE_WITHDRAW_AMOUNT], 'bridge'),
    [BRIDGE_WITHDRAW_GAS_TOKEN]: yup.string().required()
  });

export {
  BRIDGE_DEPOSIT_AMOUNT,
  BRIDGE_DEPOSIT_GAS_TOKEN,
  BRIDGE_WITHDRAW_AMOUNT,
  BRIDGE_WITHDRAW_GAS_TOKEN,
  bridgeDepositSchema,
  bridgeWithdrawSchema
};
export type {
  BridgeDepositFormValidationParams,
  BridgeWithdrawFormValidationParams,
  BridgeDepositFormValues,
  BridgeWithdrawFormValues
};
