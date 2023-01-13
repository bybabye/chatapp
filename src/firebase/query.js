import { db } from "./config";
import {
  doc,
  setDoc,
  query,
  where,
  collection,
  orderBy,
  limit,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export const addDocument = async (id, collection, data, collection2, id2) => {
  try {
    if (collection2) {
      await setDoc(doc(db, collection, id, collection2, id2), data);
    } else {
      await setDoc(doc(db, collection, id), data);
    }
  } catch (error) {
    console.log(error);
  }
};
// condition
export const getDocumentWhere = (collection2, condition) => {
  const ref = collection(db, collection2);
  if (!condition) return ref;
  const q = query(
    ref,
    where(condition.fieldName, condition.operator, condition.compareValue)
  );
  return q;
  // const docSnap = await getDocs(q);
  // return docSnap;
};

export const getDocsCollections = (collection1, id1, collection2) => {
  const ref = collection(db, collection1, id1, collection2);
  const q = query(ref, orderBy("createAt", "asc"));
  return q;
};

export const generateKeywords = (displayName) => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name = displayName.split(" ").filter((word) => word);

  const length = name.length;
  let flagArray = [];
  let result = [];
  let stringArray = [];

  /**
   * khoi tao mang flag false
   * dung de danh dau xem gia tri
   * tai vi tri nay da duoc su dung
   * hay chua
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name) => {
    const arrName = [];
    let curName = "";
    name.split("").forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(" "));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};

export const fetchUser = async (search, curMembers) => {
  const ref = collection(db, "users");
  const q = query(
    ref,
    where(
      "keywords",
      "array-contains",
      search?.toLowerCase(),
      orderBy("keywords"),
      orderBy("displayName"),
      limit(20)
    )
  );
  const docSnap = await getDocs(q);

  return docSnap.docs
    .map((doc ) => ({
      displayName: doc.data().displayName ?? '',
      uid: doc.data().uid ?? '',
      photoURL: doc.data().photoURL ?? '',
      email: doc.data().email ?? ''
    })  )
    .filter((opt) => !curMembers.includes(opt.uid)) ;
};

export const updateDocuments = async (collection1,id,data) => {
  const ref = doc(db,collection1,id)
  await updateDoc(ref,data);
}
