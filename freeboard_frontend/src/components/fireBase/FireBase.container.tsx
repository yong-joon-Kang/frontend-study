import { SetStateAction, useEffect, useState } from "react";
import { fireBaseApp } from "../../commons/libraries/firebase";
import // collection,
// getFirestore,
// addDoc,
// getDocs,

"firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  listAll,
  deleteObject,
} from "firebase/storage";

import { useDispatch } from "react-redux";
import { bannerImageList } from "../../commons/libraries/reducers/bannerImage";

function FireBase() {
  // dispatch를 사용하기 위한 준비
  const dispatch = useDispatch();

  const storage = getStorage(fireBaseApp);
  const [image, setImage] = useState("");
  const [fileValue, setFileValue] = useState("");
  const [imageList, setImageList] = useState<string[]>([]);
  const [isBannerChange, setIsBannerChange] = useState(false);

  // const onClickSubmit = async () => {
  //   const banner = collection(getFirestore(fireBaseApp), "banner");
  //   await addDoc(banner, {
  //     imgUrl: "jjj",
  //     alt: "컴퓨터",
  //   });
  // };
  const listRef = ref(storage, "gs://frontend-yongjunkang.appspot.com");
  const onClickGetList = () => {
    // const product = collection(getFirestore(fireBaseApp), "product");
    // const result = await getDocs(product);
    // const docs = result.docs.map((el) => el.data());
    // console.log(docs);

    setImageList([]);
    // console.log(listRef);
    listAll(listRef)
      .then((res: { prefixes: any[]; items: any[] }) => {
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          console.log("===============리스트 다시 조회 : ");
          console.log(itemRef._location.path);
          setImageList((prev) => [...prev, itemRef]);
        });
        setIsBannerChange(!isBannerChange);
      })
      .catch((_error: any) => {
        console.log("에러발생");
      });
  };

  useEffect(() => {
    console.log("isBannerChange 변경되어 useEffect 실행=========");
    // console.log(imageList);
    dispatch(bannerImageList(imageList));
  }, [isBannerChange]);

  const onChangeImageFile = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    console.log("이미지 파일 바꿈======================");
    console.log(event.target.value);
    setFileValue(event.target.value);
    setImage(event.target.value);
  };

  const onClickBannerChange = async () => {
    // console.log("배너 변경 클릭========================");
    if (fileValue === "") return;

    const imageList: string | any[] = [];

    // console.log(listRef);
    await listAll(listRef)
      .then((res: { prefixes: any[]; items: any[] }) => {
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          imageList.push(itemRef);
        });
      })
      .catch((_error: any) => {
        console.log("에러발생");
      });

    console.log("=======이미지 리스트 확인 : " + imageList);
    console.log(imageList.length);
    if (imageList.length === 3) {
      // console.log("이미지 세개라서 타는 로직");
      const desertRef = ref(storage, imageList[2]);
      // console.log(desertRef);
      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          console.log("File deleted successfully!!!");
          // File deleted successfully
          // console.log("삭제 후 imageList 채움");
          onClickGetList();
        })
        .catch((error: any) => {
          // Uh-oh, an error occurred!
          console.log(error);
        });
    }
    const message = "This is my message.";

    const storageRef = ref(storage, image);
    uploadString(storageRef, message).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      setFileValue("");
    });
  };

  return (
    <>
      <div>FireBase</div>
      <input
        type="file"
        value={fileValue === "" ? "" : fileValue}
        onChange={onChangeImageFile}
      />
      <button onClick={onClickBannerChange}>배너 사진 변경</button>
      {/* <button onClick={onClickGetList}>리스트 불러오기</button> */}
    </>
  );
}

export default FireBase;
