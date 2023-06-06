import { Button } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";

export default function TestLoggedIn() {
  const {logout} = useAuth();
  const handleLogout = () => {
    logout();
  }
  return(
    <div>
      <Header />
      <p>
      You are logged in!
      </p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}