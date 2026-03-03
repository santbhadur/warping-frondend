import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  Form,
  Table,
  Alert,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";

const API = "http://localhost:5000/employees";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);

  // ✅ Add/Edit Modal
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  // ✅ Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");

  // ✅ Search
  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    department: "",
    designation: "",
    salary: "",
    date_of_joining: "",
  });

  // ================= FETCH =================
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API);
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= VALIDATION =================
  const validateForm = () => {
    const {
      name,
      email,
      mobile,
      department,
      designation,
      salary,
      date_of_joining,
    } = form;

    if (
      !name ||
      !email ||
      !mobile ||
      !department ||
      !designation ||
      !salary ||
      !date_of_joining
    ) {
      return "All fields are required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) return "Invalid mobile number";

    if (Number(salary) <= 0) return "Salary must be greater than 0";

    return "";
  };

  // ================= ADD / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const msg = validateForm();
    if (msg) {
      setError(msg);
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form);
      } else {
        await axios.post(API, form);
      }

      setShowModal(false);
      setEditId(null);
      setError("");
      setForm({
        name: "",
        email: "",
        mobile: "",
        department: "",
        designation: "",
        salary: "",
        date_of_joining: "",
      });

      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  // ================= EDIT =================
  const handleEdit = (emp) => {
    setEditId(emp._id);
    setForm({
      name: emp.name,
      email: emp.email,
      mobile: emp.mobile,
      department: emp.department,
      designation: emp.designation,
      salary: emp.salary,
      date_of_joining: emp.date_of_joining?.slice(0, 10),
    });
    setError("");
    setShowModal(true);
  };

  // ================= OPEN DELETE POPUP =================
  const openDeletePopup = (emp) => {
    setDeleteId(emp._id);
    setDeleteName(emp.name);
    setShowDeleteModal(true);
  };

  // ================= CONFIRM DELETE =================
  const confirmDelete = async () => {
    try {
      await axios.delete(`${API}/${deleteId}`);
      setShowDeleteModal(false);
      setDeleteId(null);
      setDeleteName("");
      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= ADD MODAL =================
  const openAddModal = () => {
    setEditId(null);
    setError("");
    setForm({
      name: "",
      email: "",
      mobile: "",
      department: "",
      designation: "",
      salary: "",
      date_of_joining: "",
    });
    setShowModal(true);
  };

  // ================= SEARCH FILTER =================
  const filteredEmployees = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return employees;

    return employees.filter((emp) => {
      return (
        emp.name?.toLowerCase().includes(q) ||
        emp.email?.toLowerCase().includes(q) ||
        emp.mobile?.toString().includes(q) ||
        emp.department?.toLowerCase().includes(q) ||
        emp.designation?.toLowerCase().includes(q)
      );
    });
  }, [employees, search]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Employee Management System</h2>

      {/* ✅ Top Bar: Search + Add */}
      <div className="d-flex justify-content-end mb-2">
         <Button onClick={openAddModal}>+ Add Employee</Button>
     </div>
     <InputGroup className="mb-3">
                 <Form.Control
                   placeholder="Search by name, email, mobile, department, designation..."
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                 />
               
               </InputGroup>

      {/* ================= TABLE ================= */}
      <div className="table-responsive">
        <Table bordered hover responsive className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Joining Date</th>
              <th width="180">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length ? (
              filteredEmployees.map((emp, index) => (
                <tr key={emp._id}>
                  <td>{index + 1}</td>
                  <td>{emp.name}</td>
                  <td style={{ wordBreak: "break-word" }}>{emp.email}</td>
                  <td>{emp.mobile}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>₹ {emp.salary}</td>
                  <td>{emp.date_of_joining?.slice(0, 10)}</td>

                  <td>
                    <div className="d-flex flex-column flex-md-row gap-2">
                      <Button
                        size="sm"
                        variant="warning"
                        className="w-100"
                        onClick={() => handleEdit(emp)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="danger"
                        className="w-100"
                        onClick={() => openDeletePopup(emp)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* ================= ADD/EDIT MODAL ================= */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Employee" : "Add Employee"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="Enter department"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    placeholder="Enter designation"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="number"
                    name="salary"
                    value={form.salary}
                    onChange={handleChange}
                    placeholder="Enter salary"
                  />
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Date of Joining</Form.Label>
                  <Form.Control
                    type="date"
                    name="date_of_joining"
                    value={form.date_of_joining}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Button type="submit" className="w-100">
                  {editId ? "Update Employee" : "Save Employee"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ================= DELETE CONFIRM MODAL ================= */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete{" "}
          <b className="text-danger">{deleteName}</b> ?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
