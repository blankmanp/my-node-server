# Cat-Dialog
弹出框组件

buttons需要传递对象数组，每个对象的name属性将会作为buttons的显示文字，onClick方法可以绑定回调，若不设定，则自动设置成onClose所对应的方法

## API

Props属性如下

props | 说明 | 类型 | 默认值 | 备选 
------------ |--------------- | ------------- | ------------- | -------------
show | 显示参数 | boolean | false |
onClose | 关闭回调 | function | |
toBody | 生成的节点是否添加到body | boolean | true |
mySize | 大小 | string | medium | large\meduim\small
noCloseButton | 不显示X按钮 | boolean | false |
buttons | 按钮组参数 | array | |
noButtons | 不显示footer | boolean | false |

