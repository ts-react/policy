# Policy

> 阿里云 [Policy](https://help.aliyun.com/document_detail/28664.html?spm=a2c8b.12215508.policylist.2.ff466253ERVmtX) 语法结构

## 如何使用

1、添加到仓库依赖

`npm install @jiumao/policy` || `yarn add @jiumao/policy`

2、引用

```
import Policy form '@jiumao/policy';

const actions = [
  { module: 'module1', action: 'action1' },
  { module: 'module1', action: 'action2' },
  { module: 'module1', action: 'action3' },
  { module: 'module2', action: 'action1' },
  { module: 'module2', action: 'action2' },
]

const policy = new Policy();

policy.addPolicy({
  version: 1,
  statement: [
    {
      effect: 'allow',
      action: [
        'module1:*'
      ]
    }
  ]
})

policy.verifyAction('module1/action1'); // true
policy.verifyAction('module2/action1'); // false

```

## 策略数据结构

```
{
  // 策略版本
  version: 1,
  // 授权语句
  statement: [
    {
      // 授权效力 allow: 允许 deny: 禁止
      effect: 'allow',
      // 操作 
      // * | string[]
      // eg: "*" 代表可访问所有权限
      // eg: "module1/*" 代表可访问module1下所有权限
      // eg: "module1/action1" 代表可访问module1下action1权限
      action: 'system:*'
    },
    {
      effect: 'allow',
      action: [
        'permission:actionCreate',
        'permission:actionUpdate'
      ]
    }
  ]
}

```
