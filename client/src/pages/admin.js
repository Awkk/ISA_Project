import React, { useState, useEffect } from "react";
import EndPointRequestTable from "../components/admin/EndpointRequestTable";

const Admin = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const data = await fetch(
      "https://isa-rebbit-server.herokuapp.com/api/v1/admin"
    );
    const jsonData = await data.json();
    jsonData.sort((a, b) => b.request - a.request);
    console.log(jsonData);
    setRequests(jsonData);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return <EndPointRequestTable data={requests} />;
};

export default Admin;
