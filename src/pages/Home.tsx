import { useEffect, useState } from "react";
import Card from "../components/Card";
import InputTheScreenShot from "../components/InputTheScreenShot";
import useOCRStore from "../store/useOCRStore";

function Home() {
  const isSubmit = useOCRStore((state) => state.isSubmit);
  const imageFile = useOCRStore((state) => state.imageFile);

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // mobile
      setMobile(true);
    } else {
      // desktop
      setMobile(false);
    }
  }, []);

  return <>{isSubmit ? <Card /> : <InputTheScreenShot />}</>;
  /*   return <>{
    mobile?
    <>
    {isSubmit ? <Card /> : <InputTheScreenShot />}
    </>
    :{isSubmit? <}
  }
  </>; */
}

export default Home;
