import { useEffect } from "react";
import Card from "../components/Card";
import InputTheScreenShot from "../components/InputTheScreenShot";
import useOCRStore from "../store/useOCRStore";

function Home() {
  const isSubmit = useOCRStore((state) => state.isSubmit);
  const imageFile = useOCRStore((state) => state.imageFile);

  /*   return (
    <>{isSubmit && imageFile ? <p>{imageFile}</p> : <InputTheScreenShot />}</>
  ); */
  return <>{isSubmit ? <Card /> : <InputTheScreenShot />}</>;
}

export default Home;
