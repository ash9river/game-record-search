import { useNavigate } from "react-router-dom";
import useOCRStore from "../store/useOCRStore";

function Navbar() {
  const navigate = useNavigate();
  const setIsSubmit = useOCRStore((state) => state.setIsSubmit);
  const setImageFile = useOCRStore((state) => state.setImageFile);
  function goHome() {
    setImageFile("");
    setIsSubmit(false);
    navigate("/");
  }
  return (
    <button
      onClick={goHome}
      style={{
        width: "64px",
        height: "100vh",
        paddingBlock: "0",
        paddingInline: "0",
        position: "relative",
        top: "0",
      }}
    >
      홈
    </button>
  );
}

export default Navbar;
