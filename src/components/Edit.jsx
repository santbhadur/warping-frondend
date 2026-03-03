import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Edit() {
  const navigate = useNavigate();
  const {id} = useParams()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [date_of_joining, setDate_of_joining] = useState("");


useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/employees/${id}`);
        const emp = res.data;

        setName(emp.name);
        setEmail(emp.email);
        setMobile(emp.mobile);
        setDepartment(emp.department);
        setDesignation(emp.designation);
        setSalary(emp.salary);
        setDate_of_joining(emp.date_of_joining?.slice(0, 10));
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployee();
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ stop page refresh

    try {
       await axios.put(`http://localhost:5000/employees/${id}`, {
        
        name,
        email,
        mobile,
        department,
        designation,
        salary,
        date_of_joining,
      });

      
      alert("update successfully ✅");
      navigate("/");

    } catch (err) {
    console.error(err);
    alert("Update failed ❌");
  }
  };

  return (
    <div className="container">
      <h1>Add Employee</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Department"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Designation</Form.Label>
          <Form.Control
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="Designation"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Salary"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date of Joining</Form.Label>
          <Form.Control
            type="date"
            value={date_of_joining}
            onChange={(e) => setDate_of_joining(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
