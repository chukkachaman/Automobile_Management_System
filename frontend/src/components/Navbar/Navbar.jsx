import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, userRole } = useContext(AuthContext);

  const [showCustomerMenu, setShowCustomerMenu]     = useState(false);
  const [showUserMenu, setShowUserMenu]             = useState(false);
  const [showAppointmentMenu, setShowAppointmentMenu] = useState(false);
  const [showServiceMenu, setShowServiceMenu]       = useState(false);
  const [showInvoiceMenu, setShowInvoiceMenu]       = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  };

  const Dropdown = ({ label, show, onEnter, onLeave, children }) => (
    <div
      className={styles.dropdownContainer}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className={styles.navLink}>
        {label} <span className={styles.chevron}>▾</span>
      </span>
      {show && <div className={styles.dropdown}>{children}</div>}
    </div>
  );

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🚗</span>
          AutoShop
        </Link>

        <div className={styles.navLinks}>
          {(userRole === "RECEPTIONIST" || userRole === "ADMIN") && (
            <Dropdown
              label="Customers"
              show={showCustomerMenu}
              onEnter={() => setShowCustomerMenu(true)}
              onLeave={() => setShowCustomerMenu(false)}
            >
              <Link to="/add-customer"    className={styles.dropdownItem}>Add Customer</Link>
              <Link to="/show-customers"  className={styles.dropdownItem}>All Customers</Link>
            </Dropdown>
          )}

          {userRole === "ADMIN" && (
            <Dropdown
              label="Staff"
              show={showUserMenu}
              onEnter={() => setShowUserMenu(true)}
              onLeave={() => setShowUserMenu(false)}
            >
              <Link to="/register"       className={styles.dropdownItem}>Add Staff</Link>
              <Link to="/show-managers"  className={styles.dropdownItem}>All Staff</Link>
            </Dropdown>
          )}

          {(userRole === "RECEPTIONIST" || userRole === "ADMIN") && (
            <Dropdown
              label="Appointments"
              show={showAppointmentMenu}
              onEnter={() => setShowAppointmentMenu(true)}
              onLeave={() => setShowAppointmentMenu(false)}
            >
              <Link to="/add-appointment-page" className={styles.dropdownItem}>New Appointment</Link>
              <Link to="/all-appointments"     className={styles.dropdownItem}>All Appointments</Link>
            </Dropdown>
          )}

          {(userRole === "RECEPTIONIST" || userRole === "ADMIN") && (
            <>
              <Link to="/add-veichles" className={styles.navLink}>Vehicles</Link>
              <Link to="/mechanics"    className={styles.navLink}>Mechanics</Link>
            </>
          )}

          {userRole === "ADMIN" && (
            <Link to="/inventory" className={styles.navLink}>Inventory</Link>
          )}

          {userRole === "ADMIN" && (
            <Dropdown
              label="Services"
              show={showServiceMenu}
              onEnter={() => setShowServiceMenu(true)}
              onLeave={() => setShowServiceMenu(false)}
            >
              <Link to="/add-services"  className={styles.dropdownItem}>Add Service</Link>
              <Link to="/view-services" className={styles.dropdownItem}>All Services</Link>
            </Dropdown>
          )}

          {(userRole === "RECEPTIONIST" || userRole === "ADMIN") && (
            <Dropdown
              label="Invoices"
              show={showInvoiceMenu}
              onEnter={() => setShowInvoiceMenu(true)}
              onLeave={() => setShowInvoiceMenu(false)}
            >
              <Link to="/all-invoices" className={styles.dropdownItem}>All Invoices</Link>
            </Dropdown>
          )}

          <div className={styles.divider} />

          {isAuthenticated ? (
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Sign Out
            </button>
          ) : (
            <Link to="/login" className={styles.loginBtn}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
