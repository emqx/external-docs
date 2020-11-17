## MQTTクライアントツールまとめ

## はじめに

[MQTT](https://www.emqx.io/mqtt)の学習と使用の過程で、便利なクライアントツールを使用すると、ユーザーはMQTT機能を調べたり、機能コンポーネントをデバッグしたりできます。世界中の開発者が、様々なオペレーティングシステムやプラットフォームでMQTTプロトコルのクライアントテストツールを数多く開発してきました。

これらのクライアントツールには、焦点や品質が異なる多くの種類があります。したがって、初心者やMQTTの専門家にとって、適切なMQTTクライアントツールを選ぶのは難しいことになります。

今回の記事では、できるだけ多くの情報を収集し、読者が参照できるように、市場に出回っているさまざまなMQTTクライアントツールを総合的に評価します。

## MQTTクライアントツールが持つべき機能

MQTTクライアントツールは、[MQTTブローカー](https://www.emqx.io/products/broker) との接続を確立し、トピックのサブスクリプションやメッセージの送受信などの操作を実行するためによく使用されます。 MQTTクライアントツールの機能特性は、以下の方法で評価することができます。

- ツールは、MQTTで利用可能なすべての機能を使用して、ユーザーがどのような使用シナリオや使用方法のシミュレーションテストに対処できるように、各セッションに可能な限りのパラメータ化機能を提供する必要があります。この部分の機能としては、クライアント認証のサポート、接続するための証明書や複数の暗号化方式の設定のサポート、MQTT接続、パブリッシュ、およびサブスクリプションプ過程で複数のパラメーターの構成のサポート、[MQTT5](https://www.emqx.io/mqtt/mqtt5)など。
- 総合的な機能とスムーズなインターフェース操作に基づいて、ユーザーの操作性と使いやすさを向上させます。
- 複数クライアントの同時接続、MQTTプロトコルのデバッグなど、他の拡張機能を提供します。
- クロスプラットフォーム、さまざまなオペレーティングシステムで使用できます。
- 日本語/英語など多言語対応の有無。
- MQTTペイロード形式の変換をサポートするかどうか。

今回は、各クライアントツールの特徴を組み合わせて、上記の点から導入評価を行い、以下のクライアントツールを選定します。

1. MQTT X
2. Mosquito CLI
3. MQTT.fx
4. MQTT Explorer
5. MQTT Box
6. mqtt-spy
7. MQTT Lens
8. MQTT WebSocket Toolkit

## MQTT X

### 概要

[MQTT X](https://mqttx.app/)は、[Hangzhou Yingyun Technology Co.、Ltd。](https://www.emqx.io/about)がオープンソースとするクロスプラットフォームのMQTT5.0デスクトップクライアントツールです。 macOS、Linux、Windowsで使えます。これまでの市場でデザインが最も美しいMQTTクライアントツールです。

MQTT Xは、Electronのクロスプラットフォーム技術を使用して、インタラクティブな形式のメッセージチャットの形でメッセージを送受信できます。複数のクライアント接続の同時確立を可能にし、より良い相互作用で自由に切り替えて通信できるようにし、MQTTの開発とテストの効率を大幅に向上させます。

MQTT Xには、MQTT/TCP、MQTT/TLS、MQTT/WebSocket、および他のMQTTプロトコル機能の接続/パブリッシュ/サブスクライブ機能をすばやくテストできます。

### 機能

- MQTT v3.1.1とMQTT v5.0のプロトコルをサポートしています。
- 一方向/双方向SSL認証：CA、自己署名証明書、一方向/双方向SSL認証に対応しています。
- ライト、ダーク、ナイトの切り替えテーマに対応しています。
- MQTTサーバーへのWebSocket接続をサポートしています。
- Hex、Base64、JSON、Plaintextをサポートしています。
- 簡体字中国語、英語、日本語を対応しています。
- トピックをサブスクライブするとき、カスタムカラーマーキングをサポートします。
- サブスクライブされたトピックをクリックして、メッセージをフィルタリングできます。
- MQTTサーバーへの接続情報を保存します。

![mqttx.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/763141/47443870-84af-02d0-74da-9953009cba44.png)

### ダウンロード

**オペレーティングシステム：** Windows、macOS、Linux
**プロジェクトアドレス：** [MQTT X公式ウェブサイト](https://mqttx.app/)
**ダウンロードアドレス：** [MQTT X GitHub](https://github.com/emqx/MQTTX/releases)



## Mosquito CLI

### 概要

Mosquittoはオープンソース(EPL / EDLライセンス)のメッセージブローカーです。Mosquittoをインストールした後、[mosquitto_pub](https://mosquitto.org/man/mosquitto_pub-1.html)と[mosquitto_sub](https://mosquitto.org/man/mosquitto_sub-1.html)2つのコマンドラインMQTTクライアントツールが提供されています。

Mosquito CLIにはいくつかの構成オプションがあり、TLS証明書接続、プロキシサーバー経由の接続、およびデバッグモードをサポートしています。デバッグモードでは、より詳細なメッセージ情報を取得できます。

使い方も非常に簡単で、デフォルトの環境ではいくつかのパラメータを設定するだけで使用できます。

```bash
## DEBUGモードをオンにして、testtopic /#トピックにサブスクライブする
wivwiv-mac:workspace emqtt$ mosquitto_sub -t "testtopic/#" -d
Client mosqsub/66418-wivwiv-ma sending CONNECT
Client mosqsub/66418-wivwiv-ma received CONNACK
Client mosqsub/66418-wivwiv-ma sending SUBSCRIBE (Mid: 1, Topic: testtopic/#, QoS: 0)
Client mosqsub/66418-wivwiv-ma received SUBACK
Subscribed (mid: 1): 0
Client mosqsub/66418-wivwiv-ma received PUBLISH (d0, q0, r0, m0, 'testtopic/1', ... (5 bytes))
Hello

## testtopic/1トピックにメッセージを送信する
mosquitto_pub -t "testtopic/1" -m "Hello"
```

### 機能

- デバッグモードをサポートする軽量なコマンドラインツール、インストールは簡単です。
- MQTTサーバへの暗号化された接続と暗号化されていない接続の両方をサポートします。
- リモートサーバーで簡単にテストできます。

### ダウンロード

**オペレーティングシステム：** Windows、macOS、Linux
**プロジェクトアドレス：** [Github Mosquitto](https://github.com/eclipse/mosquitto)
**ダウンロードリンク：** [Mosquitto公式ウェブサイト](https://mosquitto.org/)


## MQTT.fx

### 概要

MQTT.fxは、[Jens Deters](https://www.jensd.de/wordpress/?page_id=154)氏によって開発したMQTTクライアントです。IoT Hubサービスと対話してメッセージをパブリッシュしたり、サブスクライブできるかどうかをすばやく確認できます。Apache License 2.0で公開したMQTT.fxは、ソースコードを提供していません。

MQTT.fxは昔ながらのMQTTクライアントツールです。Azure IoT Hub、AWS IoT、Alibaba Cloud IoTなどのクラウドサービスプロバイダーに関連する製品ドキュメントのチュートリアルは、MQTT.fxを例として取り上げています。 MQTT.fxは、JavaFX技術を用いて開発されています。Java仮想マシンのため、一部の古いマシンではスタッタリングが発生する場合があります。

基本的にMQTT .fxは、複数の接続設定を保存し、複数種類のTCL暗号化方式をサポートし、複数種類の証明書を指定できます。接続を作成するときに、HTTPプロキシサーバーを指定できます。成功した接続の後に、パブリッシュおよびサブスクライブ機能全体が比較的合理的かつスムーズになります。`Topics Collector` 機能は、ブローカー側のエージェント、トピックのサブスクリプションなどが一目でわかります。 MQTT.fxは、Google Cloud Iotの接続テストもサポートしています。

高度な機能の中でも、MQTT.fxのハイライトは、JavaScript関数スクリプトの実行をサポートしていることです。NashornEngineでは、ユーザーが記述したJavaScriptコードを使用して、Javaメソッドおよびフィールドにアクセスして関数拡張を実装できます。MQTT.fx関連のAPIを使いこなせば、ユーザーはビジネスに適したテストスクリプトを記述できます。  テストスクリプト、シミュレートされたセンサーレポート、さらにはパフォーマンステストツールなど、より強力な機能を提供しています。

Mosquittoを使用している場合、MQTT.fxでは、システムトピック(ブローカーの操作に関する情報を配信するためのトピック)をサブスクライブすることで、ブローカーのステータスを可視化するための専用タブが用意されています。 ブローカーのバージョン、時間、その他のシステム情報に加え、クライアント数、メッセージ数、ネットワークトラフィック、負荷状況などの運用情報を即座に取得できます。

全体的に見ると、MQTT.fxは豊富で成熟した機能を備えて、TCP接続のすべての可能な設定をサポートしています。わずかに不十分な対話性とインターフェイスのフリーズを除いて、ユーザーは同時に1つの接続しか確立できないため、複数のテスト接続を同時に使用するには十分ではありません。また、WebSocketのサポートを実装しておらず、MQTT overWebSocketsテストシナリオでは使用できません。

### 機能

- 事前定義されたメッセージテンプレートをサポートします。
- システムテーマ `$SYS`を介してブローカーステータスを取得できます。
- 最近使用したトピックを記憶できます。
- NashornEngineを介してJavaScriptスクリプトをサポートします。
- 接続中のログメッセージを表示するためのログ表示をサポートします。

![2.png](https://static.emqx.net/images/4f592bb17cbbfe3adf0d13e07277c0dd.png)

### ダウンロード
**オペレーティングシステム：** Windows、macOS、Linux
**プロジェクトアドレス：** [MQTT.fx 公式ウェブサイト](http://mqttfx.org)
**ダウンロードアドレス：** https://mqttfx.jensd.de/index.php/download


## MQTT Explorer

### 概要

MQTT Explorerは、包括的で使いやすい、より人気のあるMQTTデスクトップクライアントの1つです。MQTTトピックの構造化されたプレビュー表示を提供し、MQTTブローカー上のデバイス/サービスを非常に簡単に使用することができます。現在はCC BY-NC-ND 4.0プロトコルに基づいてオープンソース化された、ユーザーは自由にソースコードを閲覧して利用することができます。

MQTT Explorerのハイライトは、ダイナミックプレビューを使用したトピックの視覚的で垂直方向にレイヤー化されたプレゼンテーションです。レイヤードビューにより、MQTT Explorerは使いやすくなり、他の優れたMQTTデスクトップクライアントは一線を画しています。カスタムサブスクリプションは、MQTT Explorerが処理する必要のあるメッセージの数を制限することができ、サブスクリプションは、高度な接続設定で管理できます。また、受信ペイロードメッセージの差分比較ビューを表示することができます。デメリットとしては、複数のクライアントが同時にオンラインで接続するのではなく、1つのクライアントでしか接続できないことです。

### 機能

- 視覚的なトピックとトピックの変更の動的プレビューできます。
- Retainされたトピックを削除できます。
- トピックの検索/フィルターをサポートします。
- トピックを再帰的に削除できます。
- 現在のメッセージと以前に受信したメッセージの差分ビューをサポートします。
- トピック数の可視化をサポートします。
- 各トピックの履歴を保持できます。
- ダーク/ライトテーマがあります。

![mqtt-explorer.png](https://static.emqx.net/images/7be0606fdbb16f93359429dba0cc3e6e.png)

### ダウンロード
**オペレーティングシステム：** Windows、macOS、Linux
**プロジェクトアドレス：** [MQTT-Explorer公式ウェブサイト](https://mqtt-explorer.com)
**ダウンロードアドレス：** [Github MQTT-Explorer](https://github.com/thomasnordquist/MQTT-Explorer/releases)



## MQTT Box

### 概要

MQTT Boxは、Sathya Vikram氏によって開発したMQTTクライアントツールであり、元々は[Chrome](https://chrome.google.com/webstore/detail/mqttbox/kaajoficamnjijhkeomgfljpicifbkaf?utm_source=chrome-ntp-launcher)の拡張機能のみ利用可能です。ソースコードを書き換えた後、デスクトップクロスプラットフォームのオープンソースソフトウェアになります。

MQTT Boxも、Electronのクロスプラットフォーム技術を使用しています。インターフェイスはシンプルでわかりやすく、同時に複数のクライアントをオンラインでサポートします。ただし、クライアントを切り替えてお互いにメッセージを送信する際に不便な点があります。 Chromeの助けを借りて、MQTT Boxは非常に強力なクロスプラットフォーム機能を備え、シンプルな負荷テスト機能と組み合わせることで、試す価値のあるMQTTクライアントツールとなっています。

### 機能

- Chrome OS、Linux、macOS、Windows上のChromeの拡張機能として使えます。Linux、macOS、Windows向けのデスクトップアプリケーションを簡単にインストールできます。
- MQTT、MQTT over WebSocket、様々なTCP暗号化接続をサポートします。
- 送信履歴を保存できます。
- 履歴からメッセージのコピー/貼り付けをサポートします。
- サブスクリプションメッセージの履歴を保存できます。
- 簡単なパフォーマンステスト、ブローカーへの負荷をテストし、グラフでテスト結果を可視化します。

![3.png](https://static.emqx.net/images/4d230117efab9a40e2ff30f7cd82744d.png)

### ダウンロード
**オペレーティングシステム：** Windows、macOS、Linux、Chrome OS
**プロジェクトアドレス：** [GitHub MQTTBox](https://github.com/workswithweb/MQTTBox)
**ダウンロードアドレス：** [MQTTBox公式ウェブサイト](http://workswithweb.com/html/mqttbox/downloads.html)


## mqtt-spy

### 概要

mqtt-spyは、Eclipse PahoとEclipse IoTの一部です。Java 8 と JavaFX 上で JAR ファイルを直接起動して動作します。mqtt-spyには、基本的なMQTTパブリッシュ/サブスクライブの仕組みをインタラクティブに提示する素晴らしい方法があります。

mqtt-spyは個別のインストールパッケージを提供していません。ユーザーは使用する前にJavaランタイム環境をインストールする必要があります。ただし、mqtt-spyは起動後の操作が簡単で、ブートストラップ機能により、MQTTの初心者がmqtt-spyを使って探索するためのパブリックMQTT Brokerに簡単に接続することができます。 mqtt-spyの機能的なインターフェースは少し複雑ですが、各コンポーネントの機能に慣れると、開発やデバッグのための強力なツールになります。もう1つ言及しなければならないのは、mqtt-spyのパフォーマンスと安定性が不足していることです。私が使っているバージョンは最新のベータ版で、複数のブローカーを接続した後に頻繁にグリッチや偽死が発生します。

### 機能

- MQTT、MQTT over WebSocketサポートをサポートします。
- 操作しやすく、パブリッシュとサブスクライブを同時に行うことができ、異なるタブで複数のブローカーを接続できます。
- パブ/サブウィンドウの異なる領域(パブリッシュ、新規サブスクリプション、サブスクライブ、メッセージ)を閉じて、現在使用中のスペースを確保することができます。
- 検索機能を使用すると、頻繁に使用されるMQTTメッセージを見つけることができ、パブ/サブスクライブメッセージの標準出力やファイルへのエクスポートをサポートしています。

![4.png](https://static.emqx.net/images/9836d2b3d18279f9e4d43c5e4c6660f0.png)

![5.png](https://static.emqx.net/images/25b0be7357a3c3cfdc46bae9474c4477.png)

### ダウンロード
**オペレーティングシステム：** Windows、macOS、Linux
**プロジェクトアドレス：** [GitHub mqtt-spy](https://github.com/eclipse/paho.mqtt-spy)
**ダウンロードアドレス：** https://github.com/eclipse/paho.mqtt-spy/releases

### 補足
Eclipse Paho中に他のGUIツールもあります。スタンドアロンのRCPアプリケーションとしてツールを実行したり、Eclipseプラグインとして既存のEclipse IDEにインストールすることができます。

![MQTT RCP Application.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/763141/ebe76b9e-d280-e7b7-bad0-72e6e99cd788.png)

**ダウンロードアドレス：** [Eclipse Paho](https://www.eclipse.org/paho/index.php?page=components/tool/index.php)


## MQTT Lens

### 概要

MQTT Lensは、ChromeウェブアプリストアからインストールできるChrome拡張機能です。MQTTレンズのインターフェースは非常にシンプルで、基本的なパブリッシュおよびサブスクライブ機能を提供します。

MQTT Lensは十分にシンプルですが、基本的なMQTTとMQTT over WebSocket接続を提供し、素早く入門的な探索的使用を可能にします。

### 機能

- 異なる色の関連付けを使用して、複数のMQTTサーバーへの接続を同時に受け入れます。
- サブスクライブ、パブリッシュ、すべての受信メッセージを表示するためのインターフェイスは非常にシンプルで簡単です。
- MQTT、MQTT over WebSocketサポートをサポートします。

### ダウンロード
**オペレーティングシステム：** Windows、macOS、Linux、Chrome OS
**ダウンロードアドレス：** [Chrome ウェブストア](https://chrome.google.com/webstore/detail/mqttlens/hemojaaeigabkbcookmlgmdigohjobjm)



## MQTT WebSocket Toolkit

### 概要

[MQTT WebSocket Toolkit](https://www.emqx.io/mqtt/mqtt-websocket-toolkit)は、ブラウザベースの使いやすいオンラインMQTTクライアントテストツール、WebSocket接続上のMQTTのみをサポートし、基本的なMQTT設定接続設定を提供します。

MQTT WebSocket Toolkitは、[MQTT X](https://mqttx.app/)と同じデザインに従い、インタラクティブな形式のメッセージチャットの形でメッセージを送受信できます。複数のクライアント接続の同時確立を可能にし、より良い相互作用で自由に切り替えて通信できるようにし、MQTTの開発とテストの効率を大幅に向上させます。MQTT WebSocket接続をテストする際に、アプリケーションをダウンロードしてインストールする必要がなく、すばやく素早く簡単に使用できます。

### 機能

- オンラインでのクイックアクセス、インストール不要、シンプルでわかりやすく使えます。
- MQTT over WebSocketサポートをサポートします。
- 複数のクライアントの作成をサポートし、次の訪問までクライアント情報を保存します。

![mqtt-websocket-toolkit.png](https://static.emqx.net/images/bb8967f026a3df9fad1ad92ac057caf3.png)

### ダウンロード
**オペレーティングシステム：** Windows、macOS、Linux
**オンラインアドレス：** [MQTT WebSocket Toolkit](http://tools.emqx.io/)
**プロジェクトアドレス：** [MQTT WebSocket Toolkit GitHub](https://github.com/emqx/MQTT-Web-Toolkit)
