import { firebase } from '../externals/firebase'
import { User, Post, PostDocumentData } from '../../types/struct'

type Document = firebase.firestore.DocumentSnapshot<
  firebase.firestore.DocumentData
>
export function toObject<T>(doc: Document): T {
  const obj: any = {
    id: doc.id,
    ...doc.data()
  }
  return obj as T
}

export function toUser(doc: Document): User {
  return toObject<User>(doc)
}

export function toPost(doc: Document): Post {
  const _doc: any = doc
  return {
    ...toObject<PostDocumentData>(doc),
    createdAt: _doc.data().createdAt.toDate(),
    nodeTree: JSON.parse(_doc.data().nodeTree)
  }
}
