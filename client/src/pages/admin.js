import React, { useState, useEffect, useContext } from "react";
import EndPointRequestTable from "../components/Admin/EndpointRequestTable";
import { baseurl } from "../constant/api";
import { UserContext } from "../context/UserContext";

const Admin = () => {
  const [requests, setRequests] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchRequests = async () => {
      const request = await fetch(`${baseurl}/admin`, {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      });
      if (request.status === 200) {
        const jsonData = await request.json();
        jsonData.sort((a, b) => b.request - a.request);
        console.log(jsonData);
        setRequests(jsonData);
      }
    };
    fetchRequests();
  }, [user.accessToken]);

  return <EndPointRequestTable data={requests} />;
};

export default Admin;
