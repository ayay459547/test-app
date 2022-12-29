
import { h } from 'vue'

const columnNode = (slots, column, rowItem, isHeader) => {
  return column.map(columnItem => {
    const { 
      title = '',
      width = 0, 
      minWidth = 0, 
      class: columnClass = '',
      style: columnStyle = '',
      key: columnKey = ''
    } = columnItem

    const {
      index: rowIndex = 0
    } = rowItem

    const columnNode = isHeader ? slots[`header-${columnKey}`] : slots[`column-${columnKey}`]

    let showClass = null
    if (typeof columnClass === 'string') {
      showClass = {
        columnClass: true
      }
    } else if(Object.prototype.toString.call(columnClass) === '[object Object]') {
      showClass = {...columnClass}
    } else {
      showClass = {}
    }

    let showStyle = null
    if (typeof columnStyle === 'string') {
      showStyle = columnStyle
    } else if(Object.prototype.toString.call(columnStyle) === '[object Object]') {
      showStyle = {...columnStyle}
    } else {
      showStyle = {}
    }

    const defalutNode = isHeader ? title : rowItem[columnKey]

    return h(
      'div',
      {
        width: `${width}px`,
        minWidth: `${minWidth}px`,
        class: {
            ...showClass,
          'table-column': true
        },
        style: {
          ...showStyle
        },
        key: columnKey
      },
      ![undefined, null].includes(columnNode) ? columnNode({
        key: columnKey,
        index: rowIndex,
        data: defalutNode
      }) : defalutNode
    )
  })
}

const rowNode = (slots, column, row, isHeader) => {
  if (isHeader) {
    return h(
      'div',
      {
        class: 'table-header'
      },
      columnNode(slots, column, {}, true)
    )
  } else {
    return row.map((rowItem, rowIndex) => {
      return h(
        'div',
        {
          class: 'table-row'
        },
        columnNode(slots, column, {
          ...rowItem,
          index: rowIndex
        }, false)
      )
    })
  }
}

const headerNode = (slots, column) => {
  return rowNode(slots, column, [], true)
} 

const bodyNode = (slots, column, row) => {
  if (row.length === 0) {
    return h('div', { 
      class: 'flex-row content-center',
      style: 'padding: 8px'
    }, '無資料')
  } else {
    return h(
      'div',
      {
        class: 'table-body'
      },
      rowNode(slots, column, row, false)
    )
  }
}

const vnode = (props, context) => {
  console.log('context => ', context)
  console.log('props => ', props)

  const { slots = {} } = context
  const { column = [], row = [] } = props
  return h(
    'div',
    {
      class: 'table-main'
    },
    [
      headerNode(slots, column),
      bodyNode(slots, column, row)
    ]
  )
}

export default vnode