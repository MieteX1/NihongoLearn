import { useEffect } from "react"
import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"
import katakanaData from "../data/katakana.json"

export default function UploadKanaData() {
  useEffect(() => {
    const uploadData = async () => {
      const colRef = collection(db, "katakana")
      for (const item of katakanaData) {
        await addDoc(colRef, item)
      }
      console.log("Dane przesłane!")
    }

    uploadData()
  }, [])

  return <p>Wysyłam dane do Firestore…</p>
}
