import React, { useState, useEffect } from "react";
import EndPointRequestTable from "../components/admin/EndpointRequestTable";
import {baseurl} from "../constant/api"

const Admin = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const data = await fetch(
      `${baseurl}/admin`
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
