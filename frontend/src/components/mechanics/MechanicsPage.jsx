import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MechanicsPage.module.css";

const MechanicsPage = () => {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchMechanics = async () => {
    try {
      const res = await fetch("/api/mechanics", { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error();
      setMechanics(await res.json());
    } catch { alert("Failed to load mechanics"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchMechanics(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this mechanic?")) return;
    const res = await fetch(`/api/mechanics/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setMechanics(prev => prev.filter(m => m.mechanicId !== id));
    else alert("Failed to delete mechanic");
  };

  if (loading) return <div className={styles.loading}>Loading mechanics…</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Mechanics</h1>
        </div>
        <button className={styles.addBtn} onClick={() => navigate("/addmechanic")}>
          + Add Mechanic
        </button>
      </div>

      {mechanics.length === 0 ? (
        <div className={styles.empty}>No mechanics found. Add your first mechanic.</div>
      ) : (
        <div className={styles.grid}>
          {mechanics.map((m) => (
            <div key={m.mechanicId} className={styles.card}>
              <div className={styles.avatar}>🔧</div>
              <div className={styles.name}>{m.firstName} {m.lastName}</div>
              <div className={styles.detail}><span>📍</span> {m.locality}, {m.city}</div>
              <div className={styles.detail}><span>📮</span> {m.pinCode}</div>
              {m.street && <div className={styles.detail}><span>🏠</span> {m.houseNo}, {m.street}</div>}
              <div className={styles.actions}>
                <button className={styles.editBtn} onClick={() => navigate("/addmechanic", { state: { mechanic: m } })}>Edit</button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(m.mechanicId)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MechanicsPage;
