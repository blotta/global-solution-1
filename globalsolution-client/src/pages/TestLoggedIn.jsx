import { Button } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

export default function TestLoggedIn() {
  const {logout} = useAuth();
  const handleLogout = () => {
    logout();
  }
  return(
    <div>
      <p>
      You are logged in!
      </p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}