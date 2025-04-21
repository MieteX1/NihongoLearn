import { db } from '../firebase'
import { collection, setDoc, doc } from 'firebase/firestore'
import hiragana from '../data/hiragana.json'

export const importHiragana = async () => {
  const promises = hiragana.map(async (item, index) => {
    const docRef = doc(collection(db, "hiragana"), `${item.kana}-${index}`)
    await setDoc(docRef, item)
  })
  await Promise.all(promises)
  console.log("✅ Hiragana zaimportowana!")
}
