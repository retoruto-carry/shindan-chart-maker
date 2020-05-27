export type NodeType = 'QUESTION' | 'RESULT'

export type NodeTree = {
  text: string
  yes?: NodeTree
  no?: NodeTree
  type: NodeType
}
