import { create } from "zustand";

interface OCRInterface {
  isSubmit: boolean;
  imageFile: string | null;
  setIsSubmit: (isSubmit: boolean) => void;
  setImageFile: (imageFile: string | null) => void;
}

let imageFileState: string | null = null;

const useOCRStore = create<OCRInterface>((set) => ({
  isSubmit: false,
  imageFile: imageFileState,
  setIsSubmit: (isSubmit) => set(() => ({ isSubmit })),
  setImageFile: (imageFile) => set(() => ({ imageFile })),
}));

export default useOCRStore;
