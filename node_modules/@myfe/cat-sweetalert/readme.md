#Cat-SweetAlert

依赖于Dialog组件，动态产生弹出框

* Sweet.alert()



* Sweet.confirm(info, function(confirm) {})

confirm，返回点击的选项值，info的内容为

```
{
	title: '主要部分内容',
	text: '副标题内容',
	style: '风格',
	closeText: '关闭按钮文案',
	confirmText: '确认按钮文案'
}
```

* Sweet.prompt(info, function(text){})

text返回输入值，info设置同confirm，多一个属性inputPlaceHolder，可以设定holder值
