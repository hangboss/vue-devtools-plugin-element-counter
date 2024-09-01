import { setupDevtoolsPlugin } from '@vue/devtools-api'
import type { ComponentInstance } from '@vue/devtools-api'
import { isVue2 } from 'vue-demi'

type Settings = {
  limitForRoot: number | string
  limitForComponent: number | string
}

const ELEMENT_NODE = 1
const STATE_TYPE = 'element-counter-properties'

function countChildrenByTraverse(node: ComponentInstance) {
  if (!node) {
    return 0
  }

  let count = 0
  let stack = [node]

  while (stack.length) {
    let currentNode = stack.pop()
    let { subTree, component, el } = currentNode

    if (!component && el?.nodeType === 1) {
      // element node
      count += 1
      count += el.getElementsByTagName('*')?.length ?? 0
    } else if (component) {
      // vue component: <vue-comp></vue-comp>
      stack.push(component)
    } else if (subTree) {
      if (subTree?.el?.nodeType === 1) {
        // root element in vue-comp template
        count += 1
        count += subTree.el.getElementsByTagName('*').length ?? 0
      } else {
        for (let child of subTree?.children || []) {
          // other any node in vue-comp template
          stack.push(child)
        }
      }
    }
  }

  return count
}

const isSingleRootElComponent = (componentInstance: ComponentInstance) => {
  return isVue2 ? true : componentInstance?.vnode?.el?.nodeType === ELEMENT_NODE
}

const getComponentElNumsBySelector = (
  componentInstance: ComponentInstance,
): number => {
  if (isVue2) {
    const el = componentInstance?.$el
    const elNums = el?.getElementsByTagName('*').length ?? 0
    return elNums + (el?.nodeType === ELEMENT_NODE ? 1 : 0)
  } else {
    const el = componentInstance?.vnode?.el
    const parentEl = el?.parentElement
    const isSingleRootNode = isSingleRootElComponent(componentInstance)

    // getElementsByTagName is more efficient than querySelectorAll.
    return isSingleRootNode
      ? el.getElementsByTagName('*').length +
          (el?.nodeType === ELEMENT_NODE ? 1 : 0)
      : parentEl.getElementsByTagName('*')?.length +
          (el?.nodeType === ELEMENT_NODE ? 1 : 0)
  }
}

export function setupDevtools(app: any) {
  const normalColor = {
    textColor: 0x808080,
    backgroundColor: 0xe0e0e0,
  }
  const warningColor = {
    textColor: 0,
    backgroundColor: 0xfbbc04,
  }

  setupDevtoolsPlugin(
    {
      id: 'vue-devtools-plugin-element-counter',
      label: 'Element counting',
      componentStateTypes: [STATE_TYPE],
      settings: {
        limitForRoot: {
          label: 'Limit elements in root',
          type: 'text',
          defaultValue: '3000',
        },
        limitForComponent: {
          label: 'Limit elements in component',
          type: 'text',
          defaultValue: '200',
        },
      },
      app,
    },
    api => {
      const formatSettings = (settings: Settings): Settings => {
        return {
          ...settings,
          limitForRoot: parseInt(settings.limitForRoot as string, 10) || 3000,
          limitForComponent:
            parseInt(settings.limitForComponent as string, 10) || 200,
        }
      }
      api.on.visitComponentTree(({ treeNode, componentInstance }) => {
        const settings = formatSettings(api.getSettings())
        const isSingleRootNode = isSingleRootElComponent(componentInstance)
        const isRootNode = treeNode?.id?.includes(':root')
        const suffix = ' els'
        const overLimitTips = {
          tooltip: `Too many elements may affect the performance.`,
        }

        let eleNums = 0
        if (!isSingleRootNode && !isVue2 && !isRootNode) {
          eleNums = countChildrenByTraverse(componentInstance)
        } else {
          eleNums = getComponentElNumsBySelector(componentInstance)
        }

        if (isRootNode) {
          const overLimit = eleNums > (settings.limitForRoot as number)
          const { textColor, backgroundColor } = overLimit
            ? warningColor
            : normalColor

          treeNode.tags.push({
            label: eleNums + suffix,
            textColor,
            backgroundColor,
            ...(overLimit ? overLimitTips : {}),
          })

          treeNode.tags.push({
            label:
              document.querySelector('body')?.getElementsByTagName('*')?.length +
              ' els in body',
            textColor,
            backgroundColor,
            ...(overLimit ? overLimitTips : {}),
          })
        } else {
          const overLimit = eleNums > (settings.limitForComponent as number)
          const { textColor, backgroundColor } = overLimit
            ? warningColor
            : normalColor
          treeNode.tags.push({
            label: eleNums + suffix,
            textColor,
            backgroundColor,
            ...(overLimit ? overLimitTips : {}),
          })
        }
      })

      api.on.inspectComponent(({ componentInstance, instanceData }) => {
        if (instanceData) {
          const isRootNode =
            componentInstance?.__VUE_DEVTOOLS_UID__?.includes(':root')
          let eleNums = 0
          if (isRootNode || isVue2) {
            eleNums = getComponentElNumsBySelector(componentInstance)
          } else {
            eleNums = countChildrenByTraverse(componentInstance)
          }
          instanceData.state.push({
            type: STATE_TYPE,
            key: 'elements',
            value: eleNums,
          })
        }
      })
    },
  )
}
