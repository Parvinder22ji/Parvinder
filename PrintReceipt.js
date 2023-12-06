import React from "react";

const PrintReceipt = React.forwardRef(({ name, amount, reason }, ref) => {
  return (
    <div ref={ref}>
      <h2>Receipt</h2>
      <p>Name: {name}</p>
      <p>Amount: {amount}</p>
      <p>Reason: {reason}</p>
    </div>
  );
});

export default PrintReceipt;
