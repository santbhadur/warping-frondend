import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    employeeName: "",
    date: "",
    machineNo: "",
    production: "",
    remarks: "",
  });

  const token = localStorage.getItem("adminToken");

  const fetchData = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/daily-entry/public"
    );
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/daily-entry",
      form
    );

    alert("Entry Added");
    setForm({
      employeeName: "",
      date: "",
      machineNo: "",
      production: "",
      remarks: "",
    });

    fetchData();
  };

  const deleteEntry = async (id) => {
    if (!window.confirm("Delete entry?")) return;

    await axios.delete(
      `http://localhost:5000/api/admin/daily-entry/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchData();
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      {/* DAILY ENTRY FORM */}
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <h3>Daily Entry</h3>

        <input
          name="employeeName"
          placeholder="Employee Name"
          value={form.employeeName}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input value="Warping" readOnly />

        <input
          name="machineNo"
          placeholder="Machine No"
          value={form.machineNo}
          onChange={handleChange}
        />

        <input
          type="number"
          name="production"
          placeholder="Production"
          value={form.production}
          onChange={handleChange}
        />

        <textarea
          name="remarks"
          placeholder="Remarks"
          value={form.remarks}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>

      <br />
      <button onClick={logout}>Logout</button>

      <hr />

      {/* DISPLAY TABLE */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Date</th>
            <th>Employee</th>
            <th>Machine</th>
            <th>Production</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.date.slice(0, 10)}</td>
              <td>{item.employeeName}</td>
              <td>{item.machineNo}</td>
              <td>{item.production}</td>
              <td>{item.remarks}</td>
              <td>
                <button onClick={() => deleteEntry(item._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan="6" align="center">No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;