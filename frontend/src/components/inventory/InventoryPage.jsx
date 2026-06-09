import React, { useEffect, useState, useContext } from "react";
import styles from "./InventoryPage.module.css";
import { AuthContext } from "../context/AuthContext";

const InventoryPage = () => {
  const { userRole } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const [inventory, setInventory] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [newItem, setNewItem]     = useState({ name: "", quantityAvailable: "", unitPrice: "" });
  const [adjustQty, setAdjustQty] = useState({});

  const fetchInventory = async () => {
    try {
      const res = await fetch("/api/inventory", { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setInventory(data);
      const init = {}; data.forEach(i => (init[i.partId] = "")); setAdjustQty(init);
    } catch { console.error("Failed to fetch inventory"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchInventory(); }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) throw new Error();
      setNewItem({ name: "", quantityAvailable: "", unitPrice: "" });
      fetchInventory();
    } catch { alert("Could not add item"); }
  };

  const updateStock = async (partId, type) => {
    const qty = adjustQty[partId];
    if (!qty || isNaN(qty) || qty <= 0) { alert("Enter a valid quantity"); return; }
    try {
      const res = await fetch(`/api/inventory/${partId}/${type}?quantity=${qty}`, {
        method: "POST", headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      fetchInventory();
      setAdjustQty(prev => ({ ...prev, [partId]: "" }));
    } catch { alert(`Failed to ${type} stock`); }
  };

  const handleDelete = async (partId) => {
    if (!window.confirm("Delete this inventory item?")) return;
    const res = await fetch(`/api/inventory/${partId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) fetchInventory(); else alert("Failed to delete item");
  };

  if (loading) return <div className={styles.loading}>Loading inventory…</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Inventory</h1>
      </div>

      {userRole === "ADMIN" && (
        <div className={styles.addCard}>
          <div className={styles.addTitle}>Add New Part</div>
          <form onSubmit={handleAddItem}>
            <div className={styles.addRow}>
              <div className={styles.field}>
                <label className={styles.label}>Part Name</label>
                <input className={styles.input} type="text" placeholder="e.g. Brake Pad" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} required />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Quantity</label>
                <input className={styles.input} type="number" placeholder="0" value={newItem.quantityAvailable} onChange={e => setNewItem({ ...newItem, quantityAvailable: e.target.value })} required />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Unit Price (₹)</label>
                <input className={styles.input} type="number" step="0.01" placeholder="0.00" value={newItem.unitPrice} onChange={e => setNewItem({ ...newItem, unitPrice: e.target.value })} required />
              </div>
              <button type="submit" className={styles.addBtn}>+ Add</button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.tableWrapper}>
        {inventory.length === 0 ? (
          <div className={styles.empty}>No inventory items yet.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Part Name</th>
                <th>Stock</th>
                <th>Unit Price</th>
                {userRole === "ADMIN" && <th>Adjust Stock</th>}
                {userRole === "ADMIN" && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <tr key={item.partId}>
                  <td>{item.partId}</td>
                  <td><strong>{item.name}</strong></td>
                  <td>{item.quantityAvailable}</td>
                  <td>₹{Number(item.unitPrice).toFixed(2)}</td>
                  {userRole === "ADMIN" && (
                    <td>
                      <div className={styles.qtyCell}>
                        <input
                          className={styles.qtyInput}
                          type="number" min="1" placeholder="qty"
                          value={adjustQty[item.partId] ?? ""}
                          onChange={e => setAdjustQty(prev => ({ ...prev, [item.partId]: e.target.value }))}
                        />
                        <button className={styles.incBtn} title="Increase" onClick={() => updateStock(item.partId, "increase")}>+</button>
                        <button className={styles.decBtn} title="Decrease" onClick={() => updateStock(item.partId, "decrease")}>−</button>
                      </div>
                    </td>
                  )}
                  {userRole === "ADMIN" && (
                    <td><button className={styles.deleteBtn} onClick={() => handleDelete(item.partId)}>Delete</button></td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default InventoryPage;
