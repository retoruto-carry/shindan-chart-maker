import { firebase } from '../externals/firebase'
import { User, Post, PostDocumentData } from '../../types/struct'

type Document = firebase.firestore.DocumentSnapshot<
  firebase.firestore.DocumentData
>
type Key<T> = keyof T

export function toObject<T>(doc: Document, omit?: Key<T>[]): T {
  const obj: any = {
    id: doc.id,
    ...doc.data()
  }
  ;(omit || []).forEach((k) => {
    delete obj[k]
  })
  return obj as T
}

export function toUser(doc: Document, omit?: Key<User>[]): User {
  return toObject<User>(doc, omit)
}

export function toPost(doc: Document, omit?: Key<Post>[]): Post {
  const postDocumentData = toObject<PostDocumentData>(doc, omit)
  const post: Post = {
    id: postDocumentData.id,
    title: postDocumentData.title,
    userId: postDocumentData.userId,
    nodeTree: JSON.parse(postDocumentData.nodeTree)
  }
  return post
}
