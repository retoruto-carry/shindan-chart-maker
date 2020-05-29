type ChoiceNode = {
  label: string
  nodeTree: NodeTree
}

type ChoiceNodes = ChoiceNode[]

type QuestionNodeTree = {
  text: string
  type: 'QUESTION'
  choiceNodes: ChoiceNodes
}

type ResultNodeTree = {
  text: string
  type: 'RESULT'
}

export type NodeTree = QuestionNodeTree | ResultNodeTree

export type User = {
  id: string
  displayName: string
  photoUrl: string
}

export type Post = {
  id: string
  title: string
  nodeTree: NodeTree
  userId: string
  createdAt: Date
}

export type PostDocumentData = {
  id: string
  title: string
  userId: string
}
