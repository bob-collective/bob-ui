const BRIDGE_AMOUNT = 'bridge-amount';

type BridgeFormValues = {
  [BRIDGE_AMOUNT]?: string;
};

type BTCIssueValidationParams = { s: never };

// const btcIssueSchema = (params: BTCIssueValidationParams): yup.ObjectSchema<any> =>
//   yup.object().shape({
//     [BTC_ISSUE_AMOUNT_FIELD]: yup
//       .string()
//       .requiredAmount('issue')
//       .maxAmount(
//         params[BTC_ISSUE_AMOUNT_FIELD],
//         'issue',
//         i18n.t('forms.amount_must_be_at_most', {
//           action: 'issue',
//           amount: params[BTC_ISSUE_AMOUNT_FIELD].maxAmount.toString()
//         })
//       )
//       .minAmount(params[BTC_ISSUE_AMOUNT_FIELD], 'issue'),
//     [BTC_ISSUE_CUSTOM_VAULT_FIELD]: yup.string().when([BTC_ISSUE_CUSTOM_VAULT_SWITCH], {
//       is: (isManualVault: string) => isManualVault,
//       then: (schema) => schema.required(i18n.t('forms.please_select_your_field', { field: 'issue vault' }))
//     }),
//     [BTC_ISSUE_SECURITY_DEPOSIT_TOKEN]: yup.string().required(),
//     [BTC_ISSUE_FEE_TOKEN]: yup.string().required()
//   });

export type { BridgeFormValues, BTCIssueValidationParams };
