import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from "react";
import {
  TransactionHandler,
  TransactionHandlerProps
} from "../Page/TransactionHandler";

export interface TransactionHandlerContextType {
  setTx: (
    loadingMsg: string,
    successMsg: string,
    txPromise: Promise<any>,
    onTxDone?: (success: boolean) => void
  ) => void;
}

const TransactionHandlerContext = createContext<
  TransactionHandlerContextType | undefined
>(undefined);

export const TransactionHandlerProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [txHandlerProps, setTxHandlerProps] = useState<TransactionHandlerProps>(
    {
      loadingMessage: "",
      successMessage: "",
      txPromise: undefined,
      onTxDone: undefined
    }
  );

  const setTx = useCallback(
    (
      loadingMessage: string,
      successMessage: string,
      txPromise: Promise<any>,
      onTxDone?: (success: boolean) => void
    ) => {
      setTxHandlerProps({
        loadingMessage,
        successMessage,
        txPromise,
        onTxDone
      });
    },
    [setTxHandlerProps]
  );

  return (
    <TransactionHandlerContext.Provider
      value={{
        setTx
      }}
    >
      {children}
      <TransactionHandler
        loadingMessage={txHandlerProps.loadingMessage}
        successMessage={txHandlerProps.successMessage}
        txPromise={txHandlerProps.txPromise}
        onTxDone={txHandlerProps.onTxDone}
      />
    </TransactionHandlerContext.Provider>
  );
};

export const useTransactionHandler = (): TransactionHandlerContextType => {
  const context = useContext(TransactionHandlerContext);
  if (!context) {
    throw new Error(
      "useTransactionHandler must be used within a TransactionHandlerProvider"
    );
  }
  return context;
};
