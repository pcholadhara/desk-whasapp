import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const fileUpload = async(file, filename) =>{
    const storage = getStorage();
    const metadata = {
        contentType: 'image/jpeg'
      };

      const storageRef  = ref(storage, filename);
      const snap        = await uploadBytes(storageRef, file, metadata);
      const link        = await getDownloadURL(snap.ref);
      return link;
}

export const getCroppedImg = async (imageSrc, width, height) => {
  const canvas = document.createElement("canvas");
  const ctx    = canvas.getContext("2d");
  canvas.width   = width;
  canvas.height  = height;

  const img = new Image();

  img.onload = () =>{
      let maxSize     = Math.max(canvas.width/img.width, canvas.height/img.height);
      let newWidth    = img.width * maxSize;
      let newHeight   = img.height * maxSize;

      let x = (canvas.width/2) - (newWidth/2);
      let y = (canvas.height/2) - (newHeight/2);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, newWidth, newHeight);
  }

  img.src = imageSrc;

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file))
    }, 'image/jpeg')
  })
}


export const cropImage = async (imageSrc, width, height, onCrop) => {
  const canvas = document.createElement("canvas");
  const ctx    = canvas.getContext("2d");
  canvas.width   = width;
  canvas.height  = height;

  const img = new Image();

  img.onload = () =>{
      let maxSize     = Math.max(canvas.width/img.width, canvas.height/img.height);
      let newWidth    = img.width * maxSize;
      let newHeight   = img.height * maxSize;

      let x = (canvas.width/2) - (newWidth/2);
      let y = (canvas.height/2) - (newHeight/2);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, newWidth, newHeight);

      canvas.toBlob(file =>{
           onCrop(file);
      });
  }

  img.src = imageSrc;
}



