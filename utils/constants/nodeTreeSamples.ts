import { NodeTree, NodeTreeSample } from '~/types/struct'

const sampleNodeTree1: NodeTree = {
  type: 'QUESTION',
  text: 'あなたはどっち派？',
  choiceNodes: [
    {
      label: 'きのこ',
      nodeTree: {
        type: 'RESULT',
        text: 'きのこ死すべし、慈悲は無い'
      }
    },
    {
      label: 'たけのこ',
      nodeTree: {
        type: 'RESULT',
        text: 'やっぱり、たけのこの方が美味しいよね'
      }
    }
  ]
}
const sample1: NodeTreeSample = {
  title: 'きのこたけのこ戦争',
  nodeTree: sampleNodeTree1
}

const sampleNodeTree2: NodeTree = {
  type: 'QUESTION',
  text: '私の事好き？',
  choiceNodes: [
    {
      label: '好きだよ',
      nodeTree: {
        type: 'RESULT',
        text: '私も好き❤️\n\nHAPPY END'
      }
    },
    {
      label: '嫌いだよ',
      nodeTree: {
        type: 'QUESTION',
        text: 'なんでそんなこと言うの？',
        choiceNodes: [
          {
            label: 'やっぱり好きだよ',
            nodeTree: {
              type: 'RESULT',
              text: '私も好き❤️\n\nHAPPY END'
            }
          },
          {
            label: '嫌いだよ',
            nodeTree: {
              type: 'QUESTION',
              text: 'なんでそんな事言うの？',
              choiceNodes: [
                {
                  label: 'やっぱり好きだよ',
                  nodeTree: {
                    type: 'RESULT',
                    text: '私も好き❤️\n\nHAPPY END'
                  }
                },
                {
                  label: '嫌いだよ',
                  nodeTree: {
                    type: 'RESULT',
                    text:
                      '突如彼女は斧を振りかざした！\nズブシャァッ！\nあなたは死んでしまった。\n\nDEAD END'
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
}
const sample2: NodeTreeSample = {
  title: 'ノベルゲーム風',
  nodeTree: sampleNodeTree2
}

const sampleNodeTree3: NodeTree = {
  type: 'QUESTION',
  text: '無人島に持っていくなら？',
  choiceNodes: [
    {
      label: '水',
      nodeTree: {
        type: 'RESULT',
        text: 'あなたの性格は....\n\n几帳面！！！！！'
      }
    },
    {
      label: '食料',
      nodeTree: {
        type: 'RESULT',
        text: 'あなたの性格は....\n\nしっかりもの！！！！！'
      }
    },
    {
      label: 'ゲーム',
      nodeTree: {
        type: 'RESULT',
        text: 'あなたの性格は....\n\nお気楽！！！！！'
      }
    },
    {
      label: 'テント',
      nodeTree: {
        type: 'RESULT',
        text: 'あなたの性格は....\n\nぐうたら！！！！'
      }
    }
  ]
}
const sample3: NodeTreeSample = {
  title: '無人島にもっていくものであなたの性格がわかる',
  nodeTree: sampleNodeTree3
}

export const nodeTreeSamples: NodeTreeSample[] = [sample1, sample2, sample3]
