import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { db, storage } from "../../utils/firebase";

export const FileUpload = (props) => {
  const [file, setFile] = useState("");
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    const uploadFile = () => {
      console.log("merhaba ben upload file  usereffect");

      //  farklı isim kullanmıyorum çünkü birden fazla banner photo yükleyince farklı dosyalar oluyor ve yer kaplıyor.
      //  bu şekilde tek bir dosya üzerinden override ediyorum.
      // const name = new Date().getTime() + file.name;
      // const storageRef = ref(
      //   storage,
      //   `User/${user.uid}/banner/bannerPhoto.jpg`
      // );
      const storageRef = ref(storage, `User/${props.user.uid}/${imagePath}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log(imagePath);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const userDbRef = doc(db, "User", `${props.user.uid}`);
            if (imagePath === "profile/bannerPhoto.jpg") {
              updateDoc(userDbRef, {
                bannerPhotoUrl: downloadURL,
              });
            } else if (imagePath === "profile/profilePicture.jpg") {
              updateDoc(userDbRef, {
                photoUrl: downloadURL,
              });
            }
            console.log("basarili upload get snaphot");
            props.getData();
            setFile(""); //--
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  return (
    <input
      type="file"
      id={props.id}
      style={{ display: "none" }}
      onChange={(e) => {
        setImagePath(props.path);
        setFile(e.target.files[0]);
      }}
    />
  );
};
