import { ImageAnnotatorClient } from "@google-cloud/vision";
import axios from "axios";
import { useEffect, useRef } from "react";
import useOCRStore from "../store/useOCRStore";
import { useNavigate } from "react-router-dom";

let apiKey = process.env.REACT_APP_GOOGLE_VISION_API_KEY as string;

function Card() {
  const navigate = useNavigate();
  const imageFile = useOCRStore((state) => state.imageFile);
  const setIsSubmit = useOCRStore((state) => state.setIsSubmit);
  const setImageFile = useOCRStore((state) => state.setImageFile);

  const payload = {
    requests: [
      {
        image: {
          content: imageFile,
        },
        features: [
          {
            type: "DOCUMENT_TEXT_DETECTION",
          },
        ],
      },
    ],
  };

  useEffect(() => {
    async function findVision() {
      try {
        const res = await axios.post(
          `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,

          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const textAnnotations = res.data.responses[0].textAnnotations;
        if (textAnnotations && textAnnotations.length > 0) {
          console.log(textAnnotations[0].description);
        } else {
          console.log("No text detected");
        }

        console.log(res);

        const arr = textAnnotations[0].description.split("\n");
        let paramsArray = [];
        for (const item of arr) {
          console.log(item);

          if (item.length === 1) continue;
          if (item === "EMPTY" || item === "CLOSE") continue;
          if (item === "전체" || item === "플레이어" || item === "정보")
            continue;
          if (item.includes("전체 플레이어 정보")) continue;
          for (let i = 1; i < 25; ++i) {
            if (item === `실험체${i}`) continue;
          }
          paramsArray.push(item);
        }

        let nxtUrl = `?player1=${
          paramsArray.length > 0 ? paramsArray[0] : "입력이잘못되었어요"
        }&player2=${
          paramsArray.length > 1 ? paramsArray[1] : "입력이잘못되었어요"
        }&player3=${
          paramsArray.length > 2 ? paramsArray[2] : "입력이잘못되었어요"
        }`;

        setIsSubmit(false);
        setImageFile("");
        navigate(`/searchPlayer${nxtUrl}`);
        console.log(nxtUrl);
      } catch (err: any) {
        console.log("err");

        console.error(err);
        if (err.response) {
          console.log(err.response);
        }
      }
    }
    findVision();
  }, []);

  return <div>{imageFile}</div>;
}

export default Card;
