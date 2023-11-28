import { Flex } from '@interlay/ui';

// eslint-disable-next-line @typescript-eslint/ban-types
type DepositFormProps = {};

// eslint-disable-next-line no-empty-pattern
const DepositForm = ({}: DepositFormProps): JSX.Element => {
  return (
    <Flex direction='column'>
      <form>
        <Flex direction='column' gap='spacing8'>
          <Flex direction='column' gap='spacing4'>
            {/* <TokenInput
              placeholder='0.00'
              label='Amount'
              valueUSD={transferAmountUSD}
              selectProps={mergeProps(form.getSelectFieldProps(TRANSFER_TOKEN_FIELD, true), {
                onSelectionChange: (ticker: Key) => handleTickerChange(ticker as string, TRANSFER_TOKEN_FIELD),
                items: selectItems
              })}
              {...mergeProps(
                form.getFieldProps(TRANSFER_AMOUNT_FIELD, false, true),
                getTokenInputProps(transferTokenBalance)
              )}
            />
            <Input
              placeholder='Enter recipient account'
              label='Recipient'
              padding={{ top: 'spacing5', bottom: 'spacing5' }}
              {...mergeProps(form.getFieldProps(TRANSFER_RECIPIENT_FIELD, false, true))}
            />
          </Flex>
          <Flex direction='column' gap='spacing4'>
            <TransactionFeeDetails
              fee={transaction.fee}
              selectProps={form.getSelectFieldProps(TRANSFER_FEE_TOKEN_FIELD)}
            />
            <AuthCTA type='submit' disabled={isBtnDisabled} size='large' loading={transaction.isLoading}>
              Transfer
            </AuthCTA> */}
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

export { DepositForm };
