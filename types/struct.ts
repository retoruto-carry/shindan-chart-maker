export type NodeType = 'QUESTION' | 'RESULT'

export type ChoiceNode = {
  label: string
  nodeTree: NodeTree
}

export type ChoiceNodes = ChoiceNode[]

export type QuestionNodeTree = {
  text: string
  type: 'QUESTION'
  choiceNodes: ChoiceNodes
}

export type ResultNodeTree = {
  text: string
  type: 'RESULT'
}

export type NodeTree = QuestionNodeTree | ResultNodeTree
