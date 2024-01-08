import { FC, ReactNode, createContext, useEffect, useRef } from 'react';
import { Transaction, useGetTransactions } from '../pages/Bridge/hooks/useGetTransactions';
import { useMutation } from '@gobob/react-query';
import { MessageStatus } from '@eth-optimism/sdk';
import { useCrossChainMessenger } from '../pages/Bridge/hooks/useCrossChainMessenger';

const TransactionsContext = createContext({});

export const TransactionsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: transactions } = useGetTransactions();
  const { messenger } = useCrossChainMessenger();

  const { mutateAsync } = useMutation({
    mutationKey: ['transactions-resolutions'],
    mutationFn: async (transaction: Transaction) => {
      await messenger?.proveMessage(transaction.transactionHash);
      queueRef.current = queueRef.current.filter((hash) => hash === transaction.transactionHash);
    }
  });

  const queueRef = useRef<string[]>([]);

  console.log(queueRef);

  useEffect(() => {
    transactions?.forEach(async (t) => {
      if (t.status !== MessageStatus.READY_TO_PROVE || queueRef.current.includes(t.transactionHash)) return;

      queueRef.current.push(t.transactionHash);

      try {
        await mutateAsync(t);
      } catch (e) {
        console.log(e);
        queueRef.current = queueRef.current.filter((hash) => hash === t.transactionHash);
      }
    });
  }, [transactions]);

  return <TransactionsContext.Provider value={{}}>{children}</TransactionsContext.Provider>;
};
