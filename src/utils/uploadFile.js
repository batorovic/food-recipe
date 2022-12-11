import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db, updateField } from "./firebase";
const storage = getStorage();
const promises = [];
let filePath = {
  coverUrl: "",
  imagePath: [],
};
let testArray = [];
export const uploadFiles = async (
  files,
  uid,
  imagePath,
  coverImageName,
  documentId
) => {
  files.map((file) => {
    let fname = file.name;
    console.log("loop");

    // const sotrageRef = ref(storage, `files/${file.name}`);
    if (coverImageName === file.name) {
      fname = "coverImage.jpg";
    }
    const sotrageRef = ref(storage, `User/${uid}/${imagePath}/${fname}`);

    const uploadTask = uploadBytesResumable(sotrageRef, file);
    promises.push(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // setProgres(prog);
      },
      (error) => console.log(error),
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
          // setURLs((prevState) => [...prevState, downloadURLs]);
          if (coverImageName === file.name) {
            // filePath.coverUrl = downloadURLs;
            updateDoc(doc(db, "post", `${documentId}`), {
              coverImagePath: downloadURLs,
            });
          } else {
            updateDoc(doc(db, "post", `${documentId}`), {
              filePaths: arrayUnion(downloadURLs),
            });
          }
          // filePath.imagePath.push(downloadURLs);
        });
      }
    );
  });

  Promise.all(promises)
    .then(() => alert("Post succesfully added."))
    .then((err) => console.log(err));
};
