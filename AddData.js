import React, { useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrintReceipt from "./PrintReceipt"; // Import the PrintReceipt component
import { databases } from "./appwriteConfig";
import { ID } from "appwrite";
import { Link } from "react-router-dom";

const AddData = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      // Callback to execute after printing
      SubmitData(name, amount, reason);
    },
  });

  const SubmitData = async (name, amount, reason) => {
    let data = { name, amount, reason };
    console.log("Selected Reason:", reason);
    try {
      const response = await databases.createDocument(
        "655e2ed85bb706d92824",
        "6562d89965fdfe494f82",
        ID.unique(),
        data
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Data</h2>
      <label className="form-field-wrapper">
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label className="form-field-wrapper">
        Amount:
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <br />
      <label className="form-field-wrapper dropdown">
        Reason:
        <select value={reason} onChange={(e) => setReason(e.target.value)}>
          <option value="">Select the reason</option>
          <option value="Karah Prashad">Karah Prashad</option>
          <option value="Langar">Langar</option>
          <option value="Ardaas">Ardaas</option>
          <option value="Gurudwara Infrastructure">
            Gurudwara Infrastructure
          </option>
          {/* Add more options as needed */}
        </select>
      </label>
      <br />
      <div className="form-field-wrapper">
        <button onClick={() => SubmitData(name, amount, reason)}>Submit</button>
        <span style={{ margin: "0 10px" }}></span>
        <button onClick={handlePrint}>Print Receipt</button>
      </div>
      {/* Invisible component used by react-to-print */}
      <div style={{ display: "none" }}>
        <PrintReceipt
          ref={componentRef}
          name={name}
          amount={amount}
          reason={reason}
        />
      </div>
    </div>
  );
};

export default AddData;
