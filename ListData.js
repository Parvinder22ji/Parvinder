import React, { useState, useEffect } from "react";
import { databases } from "./appwriteConfig";
import { Link } from "react-router-dom";
import "./App.css"; // Import the provided CSS file

const ListData = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [hoveredTransaction, setHoveredTransaction] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    ListDocuments(setTransactions);
  }, []);

  const ListDocuments = async () => {
    try {
      const response = await databases.listDocuments(
        "655e2ed85bb706d92824",
        "6562d89965fdfe494f82",
        []
      );

      if (Array.isArray(response.documents)) {
        setTransactions(response.documents);
      } else {
        console.error(
          "Response.documents is not an array:",
          response.documents
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id, name, amount, reason) => {
    setSelectedDocumentId(id);
    setName(name);
    setAmount(amount);
    setReason(reason);
    setIsEditing((prevIsEditing) => !prevIsEditing);
    if (isEditing) {
      setName("");
      setAmount("");
      setReason("");
      setSelectedDocumentId("");
    } else {
      setSelectedDocumentId(id);
      setName(name);
      setAmount(amount);
      setReason(reason);
    }
  };

  const handleUpdateData = async () => {
    try {
      const response = await databases.updateDocument(
        "655e2ed85bb706d92824", // Your project ID
        "6562d89965fdfe494f82", // Your collection ID
        selectedDocumentId, // ID of the document you want to update
        {
          name,
          amount,
          reason,
        }
      );

      // Clear the input fields and reset state
      setName("");
      setAmount("");
      setReason("");
      setSelectedDocumentId("");
      setIsEditing(false);

      console.log("Document updated:", response);

      // Fetch data again to update the list
      ListDocuments();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await databases.deleteDocument(
        "655e2ed85bb706d92824",
        "6562d89965fdfe494f82",
        id
      );

      console.log("Document deleted:", response);

      // Fetch data again to update the list
      ListDocuments();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="nav-container"></div>
      <h2>List Data</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction["$id"]}
                onMouseEnter={() => setHoveredTransaction(transaction["$id"])}
                onMouseLeave={() => setHoveredTransaction(null)}
              >
                <td>{transaction.name}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.reason}</td>
                <td>
                  {hoveredTransaction === transaction["$id"] && (
                    <>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(transaction["$id"])}
                      >
                        Delete
                      </button>
                      <button
                        className="edit-button"
                        onClick={() =>
                          handleEdit(
                            transaction["$id"],
                            transaction.name,
                            transaction.amount,
                            transaction.reason
                          )
                        }
                      >
                        Edit
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditing && (
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
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
          <button onClick={handleUpdateData}>Update</button>
        </div>
      )}
    </div>
  );
};

export default ListData;
