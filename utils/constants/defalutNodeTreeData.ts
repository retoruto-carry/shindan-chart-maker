import { NodeTree } from '~/types/struct'

export const defaultNodeTreeData: NodeTree = {
  type: 'QUESTION',
  text: '',
  choiceNodes: [
    {
      label: '',
      nodeTree: {
        type: 'RESULT',
        text: ''
      }
    },
    {
      label: '',
      nodeTree: {
        type: 'RESULT',
        text: ''
      }
    }
  ]
}
