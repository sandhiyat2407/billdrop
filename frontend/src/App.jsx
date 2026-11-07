import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:8080";

const steps = [
  { n: 1, title: "Upload", text: "Drop up to 20 bills (PDF, JPG or PNG)." },
  { n: 2, title: "Read", text: "OCR and AI turn each bill into fields." },
  { n: 3, title: "Check", text: "Wrong totals and double payments are flagged." },
  { n: 4, title: "Export", text: "Save clean bills and download Excel." },
];

const roles = [
  { role: "Accountant", can: "Upload bills, review, correct, save, export Excel" },
  { role: "Manager", can: "View supplier totals and bills with problems (read only)" },
];

export default function App() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    fetch(`${API}/api/health`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setStatus(d.database === "up" ? "online" : "db-down"))
      .catch(() => setStatus("offline"));
  }, []);

  const label = {
    checking: "Checking server...",
    online: "Server and database are online",
    "db-down": "Server is online, database is down",
    offline: "Server is not connected yet",
  }[status];

  return (
    <div className="page">
      <header className="hero">
        <h1>BillDrop</h1>
        <p className="tag">
          Turn a week of paper supplier bills into clean, checked records in
          minutes.
        </p>
        <span className={`badge ${status}`}>{label}</span>
      </header>

      <section>
        <h2>The problem</h2>
        <p>
          Irumbu Mart, a hardware wholesaler in Salem, receives about 150 paper
          bills a week. Typing them into Excel takes 2 days and mistakes slip
          through, such as paying one supplier's Rs 64,000 bill twice.
        </p>
      </section>

      <section>
        <h2>How it works</h2>
        <div className="grid">
          {steps.map((s) => (
            <div className="card" key={s.n}>
              <div className="num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Who uses it</h2>
        <table>
          <thead>
            <tr><th>Role</th><th>What they can do</th></tr>
          </thead>
          <tbody>
            {roles.map((r) => (
              <tr key={r.role}><td>{r.role}</td><td>{r.can}</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer>
        Vizdale Internship, Milestone 1. Login and upload arrive in Milestone 2.
      </footer>
    </div>
  );
}
