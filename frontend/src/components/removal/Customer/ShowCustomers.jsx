import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ShowCustomers.module.css";

const ShowCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading]     = useState(true);
  const token   = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("/api/customers", { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error();
        setCustomers(await res.json());
      } catch { console.error("Failed to fetch customers"); }
      finally { setLoading(false); }
    };
    fetchCustomers();
  }, [token]);

  if (loading) return <div className={styles.loading}>Loading customers…</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Customers ({customers.length})</h1>
      </div>

      {customers.length === 0 ? (
        <div className={styles.empty}>No customers found.</div>
      ) : (
        <div className={styles.grid}>
          {customers.map((c) => (
            <div key={c.customerId} className={styles.card} onClick={() => navigate(`/customer/${c.customerId}`)}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>👤</div>
                <div>
                  <div className={styles.name}>{c.firstName} {c.lastName}</div>
                  <div className={styles.id}>ID #{c.customerId}</div>
                </div>
              </div>
              <div className={styles.detail}><span>📍</span>{c.houseNo}, {c.street}, {c.locality}, {c.city} — {c.pinCode}</div>
              {c.emails?.length > 0 && <div className={styles.detail}><span>✉️</span>{c.emails[0]?.email || c.emails[0]}</div>}
              <div className={styles.cardFooter}>👆 Click to view details</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowCustomers;
