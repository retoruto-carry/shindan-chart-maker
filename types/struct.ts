export type NodeType = 'QUESTION' | 'RESULT'

type ChoiceNode = {
  label: string
  nodeTree: NodeTree
}

export type QuestionNodeTree = {
  text: string
  type: 'QUESTION'
  choiceNodes: ChoiceNode[]
}

export type ResultNodeTree = {
  text: string
  type: 'RESULT'
}

export type NodeTree = QuestionNodeTree | ResultNodeTree

export type NodeTreeSample = {
  title: string
  nodeTree: NodeTree
}

export type User = {
  id: string
  displayName: string
  photoUrl: string
  username: string
}

export type Post = {
  id: string
  title: string
  subtitle: string
  hashtag: string
  tags: string[]
  nodeTree: NodeTree
  userId: string
  createdAt: Date
}

export type PostFormData = {
  title: string
  subtitle: string
  hashtag: string
  tags: TagObj[]
  nodeTree: NodeTree
}

export type PostDocumentData = {
  id: string
  title: string
  subtitle: string
  hashtag: string
  tags: string[]
  userId: string
}

export type TagObj = {
  text: string
}
