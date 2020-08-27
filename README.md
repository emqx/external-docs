# EMQ X 外部文档

## 说明

外部文档仓库主要用于与合作伙伴与公开用户协同编辑、翻译，共享文档资料等，相关文档会定期同步至内部仓库。

## 翻译安排

以下是第一期的翻译安排，优先级按照顺序来执行。

### Dashboard

#### 开源版

将 (./dashboard/emqx-jp.js)[./dashboard/emqx-jp.js] 中的中文全部翻译为日文；

将 (./dashboard/emqx-rule.js)[./dashboard/emqx-rule.js] 中的**以下代码块**全部翻译为日文：

```js
export const ja = {
  viewStates: 'xxxxxxxxxxxxxxx',
  topic: 'xxxxx',
  node: 'xxxxx',
  ...
}
```


#### 企业版

处理 (./dashboard/emqx-ee)[./dashboard/emqx-ee] 中的全部 `.js` 文件，翻译 `jp` 属性，依照中文翻译出日文；

```js
// Alerts.js
alarm: {
  zh: '告警',
  jp: '告警',
  en: 'Alarm',
}

alarm: {
  zh: '告警',
  // 翻译后
  jp: '警告する',
  en: 'Alarm',
}
```

### 对比文档

翻译 [./comparison/EMQ_vs_Hive.docx](./comparison/EMQ_vs_Hive.docx) 文件，
[./comparison/EMQ_Hive_Verne_Active.xlsx](./comparison/EMQ_Hive_Verne_Active.xlsx) 文件，

保留源文件，翻译后的文件采用日语命名。

### 白皮书

翻译 [./white-paper](./white-paper) 下面的 `.docx` 文件，保留源文件，翻译后的文件采用日语命名。


### 热门博客

翻译 [./blog](./blog) 下的两篇文章，保留原文件，翻译后文件名、内容均为日文。