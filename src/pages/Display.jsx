import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Display() {
  const [display, setDisplay] = useState([]);
  const [search, setSearch] = useState("");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 1;

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/employees");
      setDisplay(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔍 search filter
  const filteredData = display.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 pagination logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredData.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  return (
    <div className="container">
      <h1>Display</h1>

      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // reset page on search
        }}
      />

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Add</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {records.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.mobile}</td>

              <td>
                <Link to="/add">
                  <button>Add</button>
                </Link>
              </td>

              <td>
                <Link to={`/edit/${item._id}`}>
                  <button>Edit</button>
                </Link>
              </td>

              <td>
                <Link to={`/delete/${item._id}`}>
                  <button>Delete</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔢 Pagination Buttons */}
      <div style={{ marginTop: "10px" }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
