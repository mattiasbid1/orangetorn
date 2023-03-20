import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const FactionDetails = ({ data }) => {
  const { factionName, factionId, members } = data;
  return (
    <div>
      <h3 className="mt-5">
        {factionName} [{factionId}]
      </h3>
      <ListGroup className="mt-3">
        {members.map((member, index) => (
          <ListGroupItem key={index} className="bg-dark text-white">
            {member}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

FactionDetails.fetchData = async (apiKey) => {
  const url = `https://api.torn.com/faction/?selections=basic&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.ID && data.name && data.members) {
    const members = Object.values(data.members).map((member) => member.name);
    return {
      factionName: data.name,
      factionId: data.ID,
      members,
    };
  }
  return {
    factionName: "",
    factionId: "",
    members: [],
  };
};

export default FactionDetails;
