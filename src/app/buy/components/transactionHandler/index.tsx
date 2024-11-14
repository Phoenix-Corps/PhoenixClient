import React, { useEffect, useRef, useState } from "react";
import Toast from "../toast";
import { progressPropDefs } from "@radix-ui/themes/dist/esm/components/progress.props.js";

export interface TransactionHandlerProps {
  loadingMessage: string;
  successMessage: string;
  txPromise?: Promise<any>;
  onClose?: () => void;
  onTxDone: (success: boolean) => void;
}

const TransactionHandler = (props: TransactionHandlerProps) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"info" | "success" | "warning" | "error">("info");

  useEffect(() => {
    const waitForTx = async () => {
      setShowToast(true);

      let success = false;
      try {
        setMessage("Please sign the transaction in your wallet");
        const tx = await props.txPromise;

        setMessage(props.loadingMessage);
        await tx.wait();

        setMessage(props.successMessage);
        setType("success");
        success = true;
      } catch (error: any) {
        setMessage("transaction error");
        setType("error");
        success = false;
      } finally {
        const closeToastTimeout = success ? 2 : 5;
        setTimeout(() => setShowToast(false), closeToastTimeout * 1000);
        props.onTxDone(success);
      }
    }

    if (props.txPromise) {
      waitForTx();
    }
  }, [props.txPromise, setMessage, setType]);


  return (
    <>
      {showToast && (
        <Toast
          message={message}
          type={type}
          position={"bottom-right"}
          onClose={props.onClose ?? (() => { })} />
      )}
    </>
  );
}

export default TransactionHandler;
