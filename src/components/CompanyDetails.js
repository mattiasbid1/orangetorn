import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const CompanyDetails = ({ data }) => {
  return (
    <ListGroup className="mt-5">
      {data.map((employeeName, index) => (
        <ListGroupItem key={index} className="bg-dark text-white">
          {employeeName}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

CompanyDetails.fetchData = async (apiKey) => {
  const url = `https://api.torn.com/company/?selections=employees&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.company_employees) {
    return Object.values(data.company_employees).map(
      (employee) => employee.name
    );
  }
  return [];
};

export default CompanyDetails;
