import { firebase } from '../externals/firebase'
import { User, Post, PostDocumentData, TagObj } from '../../types/struct'
import { DocumentNotExistError } from '../../types/error'

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
  if (!doc.exists) throw new DocumentNotExistError()
  return toObject<User>(doc)
}

export function toPost(doc: Document): Post {
  if (!doc.exists) throw new DocumentNotExistError()
  const _doc: any = doc
  return {
    ...toObject<PostDocumentData>(doc),
    createdAt: _doc.data().createdAt.toDate(),
    nodeTree: JSON.parse(_doc.data().nodeTree)
  }
}

export function toTagObj(doc: Document): TagObj {
  if (!doc.exists) throw new DocumentNotExistError()
  const _doc: any = doc
  return {
    text: _doc.data().text
  }
}
