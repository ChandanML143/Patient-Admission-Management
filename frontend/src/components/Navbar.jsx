function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h2>PatientCare</h2>
                <span>Hospital Management System</span>
            </div>

            <div className="navbar-right">
                <span className="admin-label">Admin</span>
            </div>
        </nav>
    );
}

export default Navbar;
