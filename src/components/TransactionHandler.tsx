import React, { useEffect, useState } from "react";

import { Toast } from "./Toast";

export interface TransactionHandlerProps {
  loadingMessage: string;
  successMessage: string;
  txPromise?: Promise<any>;
  onTxDone?: (success: boolean) => void;
}

export const TransactionHandler = (props: TransactionHandlerProps) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [txHash, setTxHash] = useState<string | undefined>(undefined);
  const [type, setType] = useState<"info" | "success" | "warning" | "error">(
    "info"
  );

  useEffect(() => {
    const waitForTx = async () => {
      setShowToast(true);
      setTxHash(undefined);
      setType("info");

      let success = false;
      try {
        setMessage("Please sign the transaction in your wallet");
        const tx = await props.txPromise;
        setTxHash(tx.hash);

        setMessage(props.loadingMessage);
        await tx.wait();

        setMessage(props.successMessage);
        setType("success");
        success = true;
      } catch (error: any) {
        let message = "Transaction failed.";
        setMessage(message);
        setType("error");
        success = false;
      } finally {
        props.onTxDone?.(success);
      }
    };

    if (props.txPromise) {
      waitForTx();
    }
  }, [props.txPromise, setMessage, setType, setTxHash]);

  return (
    <>
      {showToast && (
        <Toast
          message={message}
          txHash={txHash}
          type={type}
          position={"bottom-right"}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};
