import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1> Hoem page</h1>
      <Link to={"/tata"} >Tata</Link><br></br>
      <Link to={"/maruti"} >Maruti</Link>
    </div>
  );
}
