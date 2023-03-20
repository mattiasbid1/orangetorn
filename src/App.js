import { useState } from "react";
import { Container } from "react-bootstrap";
import Login from "./components/Login";
import UserDetails from "./components/UserDetails";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [userData, setUserData] = useState({});

  const handleLogin = async (apiKey) => {
    try {
      const user = await UserDetails.fetchData(apiKey);
      if (user.name) {
        setLoggedIn(true);
        setApiKey(apiKey);
        setUserData(user);
        return true;
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    return false;
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Container fluid className="bg-dark text-white min-vh-100">
          <UserDetails apiKey={apiKey} userData={userData.name} />
        </Container>
      )}
    </div>
  );
}

export default App;
