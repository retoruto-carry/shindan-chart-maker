export type NodeType = 'QUESTION' | 'RESULT'

export type ChoiceNode = {
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
