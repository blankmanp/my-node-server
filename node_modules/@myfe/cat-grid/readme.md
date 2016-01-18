# Cat-Grid

## 功能

* 展示行列数据

* 单元格数据格式化

* 增、删、查、改

* 分页

* 全选

* 排序

* 额外信息展示


如果不需要分页，就不传offset\limit\total

在columns的初始化中，如果使用自定义的renderer，在函数中会返回给使用者当前空的值、行数据、空格所在位置信息，详见advance这个例子



## API

Props属性如下

props | 说明 | 类型 | 默认值 | 备选 
------------ |--------------- | ------------- | ------------- | -------------
columns | 列的定义 | array | [] |
rows | 数据列表 | array | [] |
offset | 分页码、不设置相关属性则不会产生分页组件 | number | -1 |
total | 总页数 | number | 0 |
limit | 每页数量 | number | 20 |
renderKey | key，需要自定义绑定到一个key，如果数据没有唯一的key，将会自定采用index | string |
enableSelection | 使用全选功能 | boolean | false |
className | 自定义容器的类名 | string | table-responsive |
heightControl | 高度限制 | string | ‘’ |
TableStyle | 表格风格 | array | ['bordered'] | bordered\triped\condensed
myHeadStyle | 表格头风格 | string | active | active\success\info\warning\danger
batch | 自定义绑定多选功能的按钮 | array | [] |


