import { getDocumentWhere } from "../firebase";

import { useEffect, useState } from "react";
import {  onSnapshot } from "firebase/firestore";
import { getDocsCollections } from "../firebase/query";

export const useFirestore = (
  collection2,
  condition
) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const q = getDocumentWhere(collection2, condition);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const documents = [];
      snapshot.docs.forEach((doc) => documents.push(doc.data()));
      setDocuments(documents);
    });

    return unsubscribe;
  }, [collection2, condition]);
  //condition
  /**
   *
   * {
   *  fieldName
   *  operator ''
   *  value
   * }
   */

  return documents;
};
export const useFirestoreTwo = (collection,id,collection2) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const q = getDocsCollections(collection,id,collection2);
    const unsubscribe = onSnapshot(q,(snapshot) => {
      const documents = [];
      snapshot.docs.map((doc) => { 
        
        documents.push(doc.data())
      })
      setDocuments(documents);
    })
    return unsubscribe;
  },[collection,collection2,id])
  return documents;
}