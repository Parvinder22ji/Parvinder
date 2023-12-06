// GuestAddData.js
import React, { useState } from "react";
import { databases } from "./appwriteConfig";
import { ID } from "appwrite";
import { Link } from "react-router-dom";
import "./App.css"; // Import global styles

const GuestAddData = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState("");

  const SubmitData = async () => {
    let data = { name, amount, reason };
    try {
      const response = await databases.createDocument(
        "655e2ed85bb706d92824",
        "6562d89965fdfe494f82",
        ID.unique(),
        data
      );
      setTransactions([]);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="login-register-container">
        <form className="login-form" onSubmit={() => SubmitData()}>
          <div className="form-field-wrapper">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-field-wrapper">
            <label htmlFor="amount">Amount:</label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="form-field-wrapper dropdown">
            <label htmlFor="reason">Reason:</label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select the reason</option>
              <option value="Karah Prashad">Karah Prashad</option>
              <option value="Langar">Langar</option>
              <option value="Ardaas">Ardaas</option>
              <option value="Gurudwara Infrastructure">
                Gurudwara Infrastructure
              </option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="form-field-wrapper">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuestAddData;
