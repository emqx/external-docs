export default {
  __not: [],
  listNull: {
    zh: '列表为空，请调整过滤条件再试',
    jp: 'データがありません。条件を確認してもう一度試してください',
    en: 'Empty. Please change the filter and try again',
  },
  unit: {
    zh: '个插件',
    jp: '個プラグイン',
    en: '',
  },
  plugin: {
    zh: '插件',
    jp: 'プラグイン',
    en: 'Plugin',
  },
  numberOfPlugIns: {
    zh: '插件数量',
    jp: 'プラグイン数',
    en: 'Number of plugins',
  },
  numPlugins: {
    zh: '个插件',
    jp: '個プラグイン',
    en: 'Plugins',
  },
  running: {
    zh: '运行中',
    jp: '実行中',
    en: 'Running',
  },
  individual: {
    zh: '个',
    jp: '個',
    en: '',
  },
  stop: {
    zh: '停 止',
    jp: '停止',
    en: 'Stop',
  },
  stopped: {
    zh: '已停止',
    jp: '停止済',
    en: 'Stopped',
  },
  pluginsList: {
    zh: '插件列表',
    jp: 'プラグインリスト',
    en: 'Plugins',
  },
  selectNode: {
    zh: '节点选择',
    jp: 'ノードを選択してください',
    en: 'Node',
  },
  all: {
    zh: '全部',
    jp: '全て',
    en: 'All',
  },
  startRunning: {
    zh: '启 动',
    jp: '起動',
    en: 'Run',
  },
  config: {
    zh: '配置',
    jp: '設定',
    en: 'config',
  },
  tutorial: {
    zh: '使用文档',
    jp: 'チュートリアル',
    en: 'Tutorial',
  },
  pluginName: {
    zh: '插件名称',
    jp: 'プラグイン名',
    en: 'Name',
  },
  version: {
    zh: '版本',
    jp: 'バージョン',
    en: 'Version',
  },
  describe: {
    zh: '描述',
    jp: '詳細',
    en: 'Description',
  },
  type: {
    zh: '类型',
    jp: 'タイプ',
    en: 'Type',
  },
  state: {
    zh: '状态',
    jp: 'ステータス',
    en: 'State',
  },
  authentication: {
    zh: '认证',
    jp: '認証',
    en: 'Auth',
  },
  backend: {
    zh: '持久化',
    jp: 'バックエンド',
    en: 'Backend',
  },
  bridge: {
    zh: '桥接',
    jp: 'ブリッジ',
    en: 'Bridge',
  },
  protocol: {
    zh: '协议',
    jp: 'プロトコル',
    en: 'Protocol',
  },
  feature: {
    zh: '功能',
    jp: '機能',
    en: 'Feature',
  },
  other: {
    zh: '其他',
    jp: 'その他',
    en: 'Other',
  },
  thisActionWillStopThePlugIn: {
    zh: '此操作将停止该插件,确认继续?',
    jp: 'この操作を実行するとプラグインを停止します、このまま処理を続けてもよろしいですか?',
    en: 'Confirm to stops the plugin?',
  },
  runSuccess: {
    zh: '开启成功',
    jp: '起動が成功しました',
    en: 'Run Success',
  },
  runFailed: {
    zh: '开启失败',
    jp: '起動が失敗しました',
    en: 'Run Failed',
  },
  stopSuccess: {
    zh: '停止成功',
    jp: '停止が成功しました',
    en: 'Stop Success',
  },
  pluginTips: {
    zh: '该功能仅做调试使用，配置将在 Broker 重启后将丢失，请将配置写入相应配置文件',
    jp: 'この機能はテストやデバッグのみ使用します。ブローカー再起動した後設定が失われますので、設定ファイルに書き入れてください',
    en: 'The module is only used for debugging or testing, and the configuration will be lost when broker restart',
  },
  configuration: {
    zh: '配置信息',
    jp: '設定',
    en: 'Configuration',
  },
  save: {
    zh: '保存',
    jp: '保存',
    en: 'Save',
  },
  updateSuccessful: {
    zh: '更新成功',
    jp: 'アップデートされました',
    en: 'Update Successful',
  },
  pluginBeforeSaveTips: {
    zh: '你的更改将不被保存，确认继续？',
    jp: '変更された内容は保存されないでよろしいですか',
    en: 'Your changes will not be saved. Confirm to continue?',
  },
  pleaseEnter: {
    zh: '请输入',
    jp: '入力してください',
    en: 'Please enter',
  },
  searchByName: {
    zh: '按插件名称搜索',
    jp: 'プラグイン名で検索してください',
    en: 'Search by plugin name',
  },
  manage: {
    zh: '管理',
    jp: '管理',
    en: 'Manage',
  },
  authClientidRequired: {
    zh: '请填写 Client ID 和密码',
    jp: 'Client ID とパスワードを入力してください',
    en: 'Client ID or Password is required',
  },
  confirmDelete: {
    zh: '确认删除？',
    jp: '削除してもよろしいですか？',
    en: 'Confirm Delete?',
  },
  algorithm: {
    zh: '加密算法',
    jp: 'アルゴリズム',
    en: 'Algorithm',
  },
  payloadDesc: {
    zh: '启用 verify_claims 时有效, 可以使用 %u，%c 占位符分别替换输入的 username 和 clientid，详见',
    jp: '%uと%cプレースホルダは、入力したusernameとclientidの代わりに使用できます（verify_claimsを起動する場合）、詳細はこちらへ',
    en: 'It is valid when verify_claims is enabled. You can use% u and% c placeholders to replace the entered user name and clientid respectively. For details, see',
  },
  jwtDoc: {
    zh: 'JWT 认证',
    jp: 'JWT認証',
    en: 'JWT Authentication',
  },
  dataDesc: {
    zh: '一行一组数据，使用逗号分割 username,clientid',
    jp: 'データセットは行で表示されています。usernameとclientidはコンマで区切られます',
    en: 'One line is a set of data, separated by comma username,clientid',
  },
  secret: {
    zh: '密钥或私钥',
    jp: 'シークレットやプライベートキー',
    en: 'Secret or Private key',
  },
  secretRequired: {
    zh: '请输入 Secret',
    jp: 'シークレットを入力してください',
    en: 'Secret is required',
  },
  payloadRequired: {
    zh: '请输入 Payload 模版',
    jp: 'Payloadのテンプレートを入力してください',
    en: 'Payload template is required',
  },
  dataRequired: {
    zh: '请填写 Payload 数据',
    jp: 'Payloadのデータを入力してください',
    en: 'Payload data is required',
  },
  leaveTokenPage: {
    zh: '离开页面后当前输入的配置与生成的 TOKEN 信息均不再保留，确认离开？',
    jp: '現在のページを離れると、入力内容及び生成したTOKENが失われます、このまま処理を続けてもよろしいですか？',
    en: 'After leaving the page, the currently entered configuration and generated TOKEN information are no longer retained. Continue?',
  },
  usernameOrClientid: {
    zh: '用户名或 Client ID',
    jp: 'ユーザー名やClient ID',
    en: 'Username or Client ID',
  },
  mnesiaTip: {
    zh: '默认使用 Username，以 auth.mnesia.as 配置为准',
    jp: 'デフォルトはUsernameを使用して、auth.mnesia.as設定内容に基づきます',
    en: 'Username is used by default, but follow the auth.mnesia.as configuration',
  },
  authMnesiaRequired: {
    zh: '请填写完整的认证信息',
    jp: '認証情報を入力してください',
    en: 'Authentication information is required',
  },
  auth: {
    zh: '认证',
    jp: '認証',
    en: 'Authentication',
  },
  isAllow: {
    zh: '是否允许',
    jp: '許可',
    en: 'Allowed',
  },
  allow: {
    zh: '允许',
    jp: '許可',
    en: 'Allow',
  },
  deny: {
    zh: '不允许',
    jp: '拒否',
    en: 'Deny',
  },
  aclMnesiaRequired: {
    zh: '请填写完整的 ACL 信息',
    jp: 'ACL情報を入力してください',
    en: 'ACL information is required',
  },
  action: {
    zh: '主题动作',
    jp: 'アクション',
    en: 'Action',
  },
  allUsers: {
    zh: '全部用户',
    jp: 'すべてのユーザー',
    en: 'All Users',
  },
}