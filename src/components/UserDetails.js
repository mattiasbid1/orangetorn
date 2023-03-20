import React, { useState } from "react";
import {
  Container,
  Button,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "react-bootstrap";
import CompanyDetails from "./CompanyDetails";
import FactionDetails from "./FactionDetails";

const UserDetails = ({ apiKey, playerName }) => {
  const [loading, setLoading] = useState(false);
  const [detailsData, setDetailsData] = useState(null);
  const [detailsType, setDetailsType] = useState("");

  const handleCompanyDetails = async () => {
    setLoading(true);
    setDetailsType("company");
    setDetailsData(null);

    try {
      const data = await CompanyDetails.fetchData(apiKey);
      setDetailsData(data);
    } catch (error) {
      console.error("Error fetching company details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFactionDetails = async () => {
    setLoading(true);
    setDetailsType("faction");
    setDetailsData(null);

    try {
      const data = await FactionDetails.fetchData(apiKey);
      setDetailsData(data);
    } catch (error) {
      console.error("Error fetching faction details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="bg-dark text-white min-vh-100 p-5">
      <h2 className="float-left">{playerName}</h2>
      <Button
        className="mt-2 mr-2"
        variant="primary"
        onClick={handleCompanyDetails}
      >
        Company Details
      </Button>
      <Button className="mt-2" variant="primary" onClick={handleFactionDetails}>
        Faction Details
      </Button>
      {loading && <SemiCircleSpinner />}
      {detailsData &&
        (detailsType === "company" ? (
          <CompanyDetails data={detailsData} />
        ) : (
          <FactionDetails data={detailsData} />
        ))}
    </Container>
  );
};

const SemiCircleSpinner = () => (
  <div className="spinner">
    <div className="spinner-half-circle"></div>
  </div>
);

UserDetails.fetchData = async (apiKey) => {
  const url = `https://api.torn.com/user/?selections=basic&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.name) {
    return { name: data.name };
  }
  return {};
};

export default UserDetails;
