import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/daily-entry",
      {
        headers: {
          // PUBLIC DISPLAY ke liye backend me
          // is route ko open karna hoga (neeche bataya hai)
          Authorization: "public",
        },
      }
    );
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Daily Production Report (Warping)</h2>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Employee</th>
            <th>Machine</th>
            <th>Production</th>
            <th>Remarks</th>
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
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan="5" align="center">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;