export default {
  __not: [
    '确认继续',//処理の続行を確認する
  ],
  addASubscription: {
    zh: '添加订阅',
    jp: 'サブスクリプション追加',
    en: 'Add',
  },
  pleaseEnter: {
    zh: '请输入',
    jp: '入力してください',
    en: 'Please enter',
  },
  add: {
    zh: '添加',
    jp: '追加',
    en: 'Add',
  },
  connect: {
    zh: '连接',
    jp: '接続',
    en: 'Connections',
  },
  clients: {
    zh: '客户端',
    jp: 'クライアント',
    en: 'Clients',
  },
  currentConnection: {
    zh: '当前在线连接客户端',
    jp: 'カレントクライアント',
    en: 'Current Clients',
  },
  input: {
    zh: '输入',
    jp: '入力',
    en: 'Input',
  },
  search: {
    zh: '搜索',
    jp: '検索',
    en: 'Search',
  },
  reset: {
    zh: '重置',
    jp: 'リセット',
    en: 'Reset',
  },
  refresh: {
    zh: '刷新',
    jp: 'リフレシュ',
    en: 'Refresh',
  },
  overview: {
    zh: '概览',
    jp: '概要',
    en: 'Overview',
  },
  detailed: {
    zh: '详细',
    jp: '詳細',
    en: 'Detailed',
  },
  clientId: {
    zh: '客户端 ID',
    jp: 'クライアント ID',
    en: 'Client ID',
  },
  username: {
    zh: '用户名',
    jp: 'ユーザー名',
    en: 'Username',
  },
  ipAddress: {
    zh: 'IP 地址',
    jp: 'IP アドレス',
    en: 'IP Address',
  },
  port: {
    zh: '端口',
    jp: 'ポート',
    en: 'Port',
  },
  keepalive: {
    zh: '心跳（秒）',
    jp: 'キープアライブ',
    en: 'Keepalive',
  },
  expiryInterval: {
    zh: '会话过期间隔',
    jp: 'タイムアウト間隔',
    en: 'Expiry Interval',
  },
  createdAt: {
    zh: '会话创建时间',
    jp: '作成日時',
    en: 'Created At',
  },
  accessNode: {
    zh: '接入节点',
    jp: 'ノードへアクセス',
    en: 'Access Node',
  },
  protocol: {
    zh: '接入协议',
    jp: 'プロトコル',
    en: 'Protocol',
  },
  protocolVersion: {
    zh: '协议版本',
    jp: 'プロトコルバージョン',
    en: 'Protocol Version',
  },
  clearSession: {
    zh: '清除会话',
    jp: 'セッションクリア',
    en: 'Clear Session',
  },
  SSL: {
    zh: '连接加密',
    jp: 'SSL通信',
    en: 'SSL',
  },
  connectionAt: {
    zh: '连接时间',
    jp: '接続日時',
    en: 'Connection At',
  },
  disConnectionAt: {
    zh: '断开连接时间',
    jp: '切断日時',
    en: 'Disconnected At',
  },
  connectedStatus: {
    zh: '连接状态',
    jp: '接続ステータス',
    en: 'Connect Status',
  },
  connected: {
    zh: '已连接',
    jp: '接続済',
    en: 'Connected',
  },
  disconnected: {
    zh: '未连接',
    jp: '未接続',
    en: 'Disconnected',
  },
  disconnect: {
    zh: '断开连接',
    jp: '接続切れ',
    en: 'Disconnect',
  },
  cleanSession: {
    zh: '清除会话',
    jp: 'セッションクリア',
    en: 'Clean Session',
  },
  willDisconnectTheConnection: {
    zh: '此操作将踢除该连接，连接可能通过重连机制再次连接，确认继续?',
    jp: 'この操作を実行すると接続を切断になります。このまま処理を続けてもよろしいですか?',
    en: 'This operation will kick out the connection, conifrm?',
  },
  willCleanSession: {
    zh: '确认清除会话？',
    jp: 'セッションをクリアしてもよろしいですか',
    en: 'Confirm Clean Session?',
  },
  successfulDisconnection: {
    zh: '断开成功',
    jp: '接続が成功に切れました',
    en: 'Successful disconnection',
  },
  successfulCleanSession: {
    zh: '成功清除会话',
    jp: 'セッションが成功にクリアしました',
    en: 'Session cleared successfully',
  },
  clientDetails: {
    zh: '客户端详情',
    jp: 'クライアント詳細',
    en: 'Client',
  },
  basicInfo: {
    zh: '基本信息',
    jp: '基本情報',
    en: 'Basic Info',
  },
  subscriptions: {
    zh: '订阅列表',
    jp: 'サブスクリプションリスト',
    en: 'Subscriptions',
  },
  connectionInfo: {
    zh: '连接信息',
    jp: '接続情報',
    en: 'Connection Info',
  },
  sessionInfo: {
    zh: '会话信息',
    jp: 'セッション情報',
    en: 'Session Info',
  },
  bridge: {
    zh: '桥接设备',
    jp: 'ブリッジ',
    en: 'Bridge',
  },
  protocolType: {
    zh: '协议类型',
    jp: 'プロトコルタイプ',
    en: 'Protocol Type',
  },
  sslCert: {
    zh: 'SSL 证书',
    jp: 'SSL証明書',
    en: 'SSL',
  },
  zone: {
    zh: '接入分区',
    jp: 'ゾーン',
    en: 'Zone',
  },
  subscription: {
    zh: '当前 / 最大订阅数量',
    jp: 'カレント / 最大サブスクリプション',
    en: 'Current / Max Subscriptions',
  },
  inflight: {
    zh: '当前 / 最大飞行窗口',
    jp: 'カレント / 最大インフライト',
    en: 'Current / Max Inflight',
  },
  mqueue: {
    zh: '当前 / 最大消息队列',
    jp: 'カレント / 最大メッセージキュー',
    en: 'Current / Max Mqueue',
  },
  heapSize: {
    zh: '进程堆栈大小',
    jp: 'ヒープ サイズ',
    en: 'Heap Size',
  },
  reductions: {
    zh: '调度递减计数',
    jp: '減少数',
    en: 'Reductions',
  },
  mailbox: {
    zh: '进程邮箱中的消息数量',
    jp: 'メールボックス',
    en: 'Mailbox',
  },
  currentSubscription: {
    zh: '当前订阅',
    jp: 'カレントサブスクリプション',
    en: 'Subscriptions',
  },
  node: {
    zh: '节点',
    jp: 'ノード',
    en: 'Node',
  },
  unsubscribe: {
    zh: '取消订阅',
    jp: 'アンサブスクリプション',
    en: 'unsubscribe',
  },
  onLine: {
    zh: '在线',
    jp: 'オンライン',
    en: 'Online',
  },
  unsubscribeTitle: {
    zh: '此操作将取消订阅该主题',
    jp: 'この操作を実行するとアンサブスクリプションになります',
    en: 'This action will cancel subscription to the topic',
  },
  awaiting_rel_desc: {
    zh: '正在等待 PUBREL 的 QoS2 消息数量',
    jp: 'PUBRELのQoS2メッセージの待ち数',
    en: 'The number of QoS2 messages waiting for PUBREL',
  },
  max_awaiting_rel_desc: {
    zh: '允许同时等待 PUBREL 的 QoS2 消息的最大数量',
    jp: 'PUBRELのQoS2メッセージを同時に待ち受けの最大数',
    en: 'Maximum number of QoS2 messages allowed to wait for PUBREL at the same time',
  },
  recv_cnt_desc: {
    zh: '接收的 TCP 报文数量',
    jp: '受け取った TCP メッセージ数',
    en: 'Number of received TCP messages',
  },
  recv_msg_desc: {
    zh: '接收的 PUBLISH 报文数量',
    jp: '受け取った PUBLISH メッセージ数',
    en: 'Number of received PUBLISH messages',
  },
  recv_oct_desc: {
    zh: '接收字节数',
    jp: '受け取ったバイト数',
    en: 'Number of bytes received',
  },
  recv_pkt_desc: {
    zh: '接收的 MQTT 报文数量',
    jp: '受け取った MQTT メッセージ数',
    en: 'Number of received MQTT messages',
  },
  send_cnt_desc: {
    zh: '发送的 TCP 报文数量',
    jp: '送信された TCP メッセージ数',
    en: 'Number of TCP messages sent',
  },
  send_msg_desc: {
    zh: '发送的 PUBLISH 报文数量',
    jp: '送信された PUBLISH メッセージ数',
    en: 'Number of PUBLISH messages sent',
  },
  send_oct_desc: {
    zh: '发送字节数',
    jp: '送信されたバイト数',
    en: 'Number of bytes sent',
  },
  send_pkt_desc: {
    zh: '发送的 MQTT 报文数量',
    jp: '送信された MQTT メッセージ数',
    en: 'Number of MQTT messages sent',
  },
  kickOut: {
    zh: '踢除',
    jp: 'キックアウト',
    en: 'Kick Out',
  },
  awaiting_rel: {
    zh: '未确认的 PUBREC 数据包计数',
    jp: '未確認のPUBRECパケットカウント',
    en: 'Unconfirmed PUBREC Packets Count',
  },
  max_awaiting_rel: {
    zh: '最大未确认的 PUBREC 数据包计数',
    jp: '最大未確認のPUBRECパケットカウント',
    en: 'Maximum Unconfirmed PUBREC Packets Count',
  },
  collapse: {
    zh: '折叠',
    jp: '折り畳み',
    en: 'Collapse',
  },
  expand: {
    zh: '展开',
    jp: '展開',
    en: 'Expand',
  },
}
