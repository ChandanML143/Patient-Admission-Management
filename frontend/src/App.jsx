
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";

function App() {
  return (
      <div>
        <Navbar />

        <main className="main-content">
          <h1>Patient Admission Management</h1>
          <p>Manage hospital patients and admission records.</p>

          <Dashboard />

          <PatientForm />

          <PatientList />
        </main>
      </div>
  );
}

export default App;
