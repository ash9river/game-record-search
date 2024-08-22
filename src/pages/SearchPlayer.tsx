import { useSearchParams } from "react-router-dom";
import CardContent from "../components/CardContent";
import Navbar from "../components/Navbar";

function SearchPlayer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const player1 = searchParams.get("player1");
  const player2 = searchParams.get("player2");
  const player3 = searchParams.get("player3");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Navbar />
      <CardContent player={player1} />
      <CardContent player={player2} />
      <CardContent player={player3} />
    </div>
  );
}

export default SearchPlayer;
