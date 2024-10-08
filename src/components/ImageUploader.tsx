import {
  useState,
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  ClipboardEvent,
} from "react";
import useOCRStore from "../store/useOCRStore";
import styles from "./ImageUploader.module.scss";

interface imageInterface {
  image_file: string;
  file_obj: File | null;
}

function ImageUploader() {
  const setIsSubmit = useOCRStore((state) => state.setIsSubmit);
  const setImageFile = useOCRStore((state) => state.setImageFile);
  const [fileName, setFileName] = useState("");
  const pasteRef = useRef<HTMLTextAreaElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const getImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) {
      alert("파일이 없습니다.");
      return;
    }
    setFileName(file.name);
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      let tmpFile: string = "";
      if (fileReader.result && typeof fileReader.result === "string") {
        tmpFile = fileReader.result;
      }
      setIsSubmit(true);
      setImageFile(tmpFile.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
    };
  }, []);

  function getDisplayFileName(name: string) {
    if (name.length > 15) {
      return `${name.substring(0, 10)}...`;
    }
    return name;
  }

  function handleClick() {
    if (inputRef?.current) {
      inputRef.current.click();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    const clipboardData = e.clipboardData;
    const { items } = clipboardData;
    if (items && items[0].type.indexOf("image") !== -1) {
      const file = items[0].getAsFile();
      if (file) {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          let tmpFile: string = "";
          if (fileReader.result && typeof fileReader.result === "string") {
            tmpFile = fileReader.result;
          }
          setIsSubmit(true);
          setImageFile(
            tmpFile.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
          );
        };
      }
    }
  }

  /*   useEffect(() => {
    function handleFocus() {
      pasteRef.current?.focus();
    }
    window.addEventListener("focus", handleFocus);

    console.log(document.activeElement);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  useEffect(() => {
    if (pasteRef.current) {
      console.log("aa");

      pasteRef.current.focus();

      console.log(document.activeElement);
    }
  }, [pasteRef]); */

  function handleCaptureToolClick() {
    window.location.href = "ms-screensketch:";
  }

  return (
    <div className={styles["img-container"]} onPaste={handlePaste}>
      <h1 className={styles["my-h1"]}>앙평 검거기</h1>
      <h2 className={styles["my-h2"]}>
        캡쳐 버튼 누르고 캡쳐한 후, 회색 박스 영역을 클릭해서 CTRL + V
      </h2>
      <input
        type="file"
        accept="image/*"
        onChange={getImage}
        ref={inputRef}
        onPaste={handlePaste}
        autoFocus
        style={{
          display: "none",
        }}
      />
      <button
        className={`${styles["w-btn"]} ${styles["w-btn-pink"]}`}
        onClick={handleCaptureToolClick}
        type="button"
      >
        캡쳐버튼
      </button>
    </div>
  );
}

export default ImageUploader;
