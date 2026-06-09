import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Auth.module.css";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { userRole, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "", firstName: "", middleNames: [""], lastName: "",
    role: "", emails: [""], password: "",
    houseNo: "", street: "", locality: "", city: "", state: "", pinCode: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e, index, field) => {
    if (field === "middleNames" || field === "emails") {
      const list = [...formData[field]];
      list[index] = e.target.value;
      setFormData({ ...formData, [field]: list });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const addField    = (f) => setFormData({ ...formData, [f]: [...formData[f], ""] });
  const removeField = (f, i) => { const l = [...formData[f]]; l.splice(i, 1); setFormData({ ...formData, [f]: l }); };

  const validateStep1 = () => {
    const err = {};
    if (!formData.username.trim())  err.username  = "Required";
    if (!formData.firstName.trim()) err.firstName = "Required";
    if (!formData.lastName.trim())  err.lastName  = "Required";
    if (!formData.role)             err.role      = "Required";
    if (!formData.emails.some(e => e.includes("@"))) err.emails = "At least one valid email required";
    if (formData.password.length < 6) err.password = "Min 6 characters";
    return err;
  };

  const validateStep2 = () => {
    const err = {};
    ["houseNo","street","locality","city","state"].forEach(f => { if (!formData[f].trim()) err[f] = "Required"; });
    if (!/^\d{6}$/.test(formData.pinCode)) err.pinCode = "6-digit pin required";
    return err;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const err = validateStep1();
    if (Object.keys(err).length) { setErrors(err); return; }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateStep2();
    if (Object.keys(err).length) { setErrors(err); return; }
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const text = await res.text();
      let data; try { data = JSON.parse(text); } catch { data = { message: text }; }
      if (res.ok) { alert("Staff member registered successfully!"); navigate("/"); }
      else alert(data.message || "Registration failed.");
    } catch { alert("Something went wrong."); }
  };

  const roleOptions = isAuthenticated && userRole === "ADMIN"
    ? [{ value: "RECEPTIONIST", label: "Receptionist" }, { value: "ADMIN", label: "Admin" }]
    : isAuthenticated && userRole === "RECEPTIONIST"
    ? [{ value: "RECEPTIONIST", label: "Receptionist" }]
    : [{ value: "ADMIN", label: "Admin" }, { value: "RECEPTIONIST", label: "Receptionist" }];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Stepper */}
        <div className={styles.stepper}>
          <div className={styles.step}>
            <div className={`${styles.stepCircle} ${step >= 1 ? styles.active : ""}`}>1</div>
            <span className={`${styles.stepLabel} ${step === 1 ? styles.active : ""}`}>Personal Info</span>
          </div>
          <div className={`${styles.stepLine} ${step === 2 ? styles.done : ""}`} />
          <div className={styles.step}>
            <div className={`${styles.stepCircle} ${step === 2 ? styles.active : ""}`}>2</div>
            <span className={`${styles.stepLabel} ${step === 2 ? styles.active : ""}`}>Address</span>
          </div>
        </div>

        <div className={styles.card}>
          {step === 1 ? (
            <>
              <div className={styles.cardTitle}>Add Staff Member</div>
              <div className={styles.cardSubtitle}>Step 1 of 2 — Personal information</div>
              <form onSubmit={handleNext}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Username</label>
                    <input className={styles.input} name="username" value={formData.username} onChange={handleChange} placeholder="e.g. john_doe" required />
                    {errors.username && <span className={styles.errorText}>{errors.username}</span>}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Role</label>
                    <select className={styles.select} name="role" value={formData.role} onChange={handleChange} required>
                      <option value="">Select role</option>
                      {roleOptions.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                    {errors.role && <span className={styles.errorText}>{errors.role}</span>}
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>First Name</label>
                    <input className={styles.input} name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" required />
                    {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Last Name</label>
                    <input className={styles.input} name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" required />
                    {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Middle Name(s)</label>
                  {formData.middleNames.map((m, i) => (
                    <div key={i} className={styles.multiRow}>
                      <input className={styles.input} value={m} onChange={e => handleChange(e, i, "middleNames")} placeholder={`Middle name ${i + 1}`} />
                      {i > 0 && <button type="button" className={styles.removeBtn} onClick={() => removeField("middleNames", i)}>✕</button>}
                    </div>
                  ))}
                  <button type="button" className={styles.addBtn} onClick={() => addField("middleNames")}>+ Add middle name</button>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Email Address(es)</label>
                  {formData.emails.map((em, i) => (
                    <div key={i} className={styles.multiRow}>
                      <input className={styles.input} type="email" value={em} onChange={e => handleChange(e, i, "emails")} placeholder={`Email ${i + 1}`} required={i === 0} />
                      {i > 0 && <button type="button" className={styles.removeBtn} onClick={() => removeField("emails", i)}>✕</button>}
                    </div>
                  ))}
                  {errors.emails && <span className={styles.errorText}>{errors.emails}</span>}
                  <button type="button" className={styles.addBtn} onClick={() => addField("emails")}>+ Add email</button>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Password</label>
                  <input className={styles.input} type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Min. 6 characters" required />
                  {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                </div>

                <div className={styles.formActions}>
                  <button className={styles.btnNext} type="submit">Continue →</button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className={styles.cardTitle}>Address Details</div>
              <div className={styles.cardSubtitle}>Step 2 of 2 — Where does this staff member live?</div>
              <form onSubmit={handleSubmit}>
                <div className={styles.row}>
                  {[["houseNo","House No","e.g. 42B"],["street","Street","Street name"]].map(([name, label, ph]) => (
                    <div key={name} className={styles.field}>
                      <label className={styles.label}>{label}</label>
                      <input className={styles.input} name={name} value={formData[name]} onChange={handleChange} placeholder={ph} required />
                      {errors[name] && <span className={styles.errorText}>{errors[name]}</span>}
                    </div>
                  ))}
                </div>
                <div className={styles.row}>
                  {[["locality","Locality","Locality/Area"],["city","City","City"]].map(([name, label, ph]) => (
                    <div key={name} className={styles.field}>
                      <label className={styles.label}>{label}</label>
                      <input className={styles.input} name={name} value={formData[name]} onChange={handleChange} placeholder={ph} required />
                      {errors[name] && <span className={styles.errorText}>{errors[name]}</span>}
                    </div>
                  ))}
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>State</label>
                    <input className={styles.input} name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
                    {errors.state && <span className={styles.errorText}>{errors.state}</span>}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>PIN Code</label>
                    <input className={styles.input} name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="6-digit PIN" required />
                    {errors.pinCode && <span className={styles.errorText}>{errors.pinCode}</span>}
                  </div>
                </div>
                <div className={styles.formActions}>
                  <button type="button" className={styles.btnBack} onClick={() => setStep(1)}>← Back</button>
                  <button type="submit" className={styles.btnSubmit}>Register Staff</button>
                </div>
              </form>
            </>
          )}
        </div>

        {!isAuthenticated && (
          <p className={styles.switchText}>
            Already have an account?{" "}
            <Link to="/login" className={styles.switchLink}>Sign In</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
