# EMQ X + ClickHouse でIoTデータの収集と分析を実現します

IOTのデータ収集が大量のデバイスアクセスとデータ送信に関係します。[EMQ X IOTメッセージ指向ミドルウェア](https://www.emqx.io/products/broker)とClickHouse分析(OLAP)データベースを組み合わされたテクノロジースタックはIOTのデータ収集、送信、保存、分析などのサービスに完全に適合しています。

データがデーターベース保存された後、有効活用するために、データ可視化システムを利用して、さまざまなデータから隠れた課題を抽出・改善し、業務を効率的に行うことができます。ClickHouseとオープンソースのソフトウェア Grafana を連携して、Internet ofThingsを迅速に構築できます。データ分析視覚化プラットフォーム。

上記一連のはプログラミングの専門知識を必要とせず、関連する製品は全てオープンソースソフトウェア、法人向けサービス、およびクラウドサービスなど、さまざまなレベルのソリューションを提供でき、プロジェクトの要件に応じて無償版、プライベートのエンタープライズ版またはクラウド展開を実現できます。

![image-20200916112653512](https://static.emqx.net/images/5ba8c46006e196b5ee8ca42cf60b2d86.png)



## はじめに

### EMQXとは

[EMQ X](https://www.emqx.io/)は、高い並行性のErlang / OTP言語プラットフォームに基づいて開発された出版-購読型モデルのオープンソースのMQTTメッセージサーバー、数百万の接続と分散クラスターアーキテクチャをサポートします。 EMQ Xには、多くすぐに使える機能があります。**エンタープライズ版 EMQ X Enterprise** は、ルールエンジンを介してClickHouseにIoTメッセージデータを保存することをサポートしています。


### ClickHouseとは

[ClickHouse](https://clickhouse.tech/)は、データ分析用の列指向のDBMS(OLAP)であり、ロシアの検索大手Yandexによってオープンソース化されています。現在、Tencent、Toutiao、Ctrip、快手、Huyaなど、数千ノードのクラスターサイズで、多くの中国大手メーカーが使用しています。

- [Toutiao](https://t.cj.sina.com.cn/articles/view/5901272611/15fbe462301900xolh)社内では、ClickHouseでユーザーの行動分析に使用されます。ClickHouseノードは合計で数千あり、1つのクラスターには最大1200のノードがあります。生データの毎日の増加は約300TBです。
- [Tencent](https://www.jiqizhixin.com/articles/2019-10-25-3)社内では、ゲームデータの分析にClickHouseを使用しており、監視運用・保守体制を整えています。
- [Ctrip](https://www.infoq.cn/article/WZ7aiC27lLrB7_BcGJoL)社内は2018年7月に試用を開始されました。今80％の業務がClickHouseで実行されています。毎日のデータ増加は10億を超え、100万近くのクエリ要求があります。
- [快手](https://archsummit.infoq.cn/2019/beijing/presentation/2183)ClickHouseは内部でも使用されており、合計ストレージ容量は約10PB、1日あたり200TBの増加、90％のクエリスピーは3秒未満です。

海外では、Yandexにはユーザークリック行動分析用の数百の内部ノードがあります。Uber、CloudFlare、Spotify、その他の大手企業もこれを使用しています。その他のユーザーリストについては、[ClickHouse公式ウェブサイト-ユーザーリスト](https：//clickhouse)をご覧ください。


### グラファナとは

[Grafana](https://grafana.com/)は、さまざまなデータソースからのデータを照会および処理して視覚的に表示できる、クロスプラットフォームのオープンソース測定分析および視覚化ツールです。クライアント側のチャートをすばやく柔軟に作成できます。パネルプラグインには、視覚的なインジケーターとログのさまざまな方法があります。公式ライブラリには、ヒートマップ、ラインチャート、チャート、その他の表示方法など、豊富なダッシュボードプラグインがあります。InfluxDB、OpenTSDB、Prometheus、Elasticsearch、CloudWatch、KairosDBなどのデータソースをサポートします。データ項目の独立/混合クエリ表示をサポートします。カスタムアラームルールを作成して、他のメッセージ処理サービスまたはコンポーネントに通知できます。

Grafanaバージョン4.6以降では、プラグインを介したClickhouseデータソースのインストールがサポートされています。使用する前に、ClickHouseプラグインをGrafanaにインストールする必要があります。



## ビジネスシーン

この記事では、Internet of Thingsの環境データ収集シナリオをシミュレートします。特定のデータを含む環境データ収集ポイントがあることを前提としています。収集されたすべてのポイントデータは、[MQTTプロトコル](https://www.emqx.io/mqtt)を介して収集プラットフォームに送信されます。 （MQTT Publish)、テーマは次のように設計されています。

```bash
sensor/data
```

センサーから送信されるデータ形式はJSONであり、収集されたデータには、温度、湿度、ノイズ量、PM10、PM2.5、二酸化硫黄、二酸化窒素、一酸化炭素、センサーID、面積、収集時間などが含まれます。

```json
{
    "temperature": 30,
    "humidity" : 20,
    "volume": 44.5,
    "PM10": 23,
    "pm25": 61,
    "SO2": 14,
    "NO2": 4,
    "CO": 5,
    "id": "10-c6-1f-1a-1f-47",
    "area": 1,
    "ts": 1596157444170
}
```

データをいつでも見えるように、リアルタイムのストレージが必要になりました。次の要件が提示されています。

- 各デバイスは5秒に1回の頻度でデータを報告し、データベースはその後の遡及的分析のために各データを保存する必要があります。
- ClickHouseを介して生データを保存し、データ分析と視覚的表示のためにGrafanaと協力します。



## 環境への準備

この記事で使用するコンポーネントには、すばやくビルドして実行できるDockerイメージがあります。開発の便宜のために、GrafanaはDockerを使用してビルドし、ClickHouseは推奨されるドキュメントの方法を使用してインストールし、EMQ Xはインストールパッケージまたはオンラインクラウドサービスの形式で使用されます。

関連リソースとチュートリアルは、公式Webサイトを参照しています。

 - EMQ X：[EMQ 公式ウェブサイト](https://www.emqx.io/)
 - ClickHouse：ClickHouse製品のホームページ[https://clickhouse.tech/](https://clickhouse.tech/)
 - グラファナ：グラファナ公式ウェブサイト[https://grafana.com/](https://grafana.com/)



### EMQXをインストールします

#### 方法1：EMQ XCloudを使用する

EMQは[フルマネージドIoT MQTTクラウドサービス-EMQXクラウド](https://cloud.emqx.io/)を提供します。EMQXクラウドでユーザーは可用性が高く、独立したEMQ X クラスターを作成できます。保守作業に注意を払うことなく、プロトタイプの設計とアプリケーションの開発をすぐに開始できます。製品の発売後、ビジネスの成長による容量拡張に対応するために、クラスターをシャットダウンすることなく拡張できる、コスト削減を最大化しながら可用性を確保できます。

EMQ X Cloudは、新規登録ユーザーに6か月間の無料トライアルを提供します。アカウントを登録してログインし、トライアルデプロイメントを作成したら、デプロイメントの詳細で[**EMQXダッシュボード**]をクリックして、EMQX管理コンソールを開きます。

> EMQ X Cloudを使用するには、パブリックネットワークアドレスを介してClickHouseにアクセスできることを確認する必要があります。

![image-20200915150048492](https://static.emqx.net/images/2ea6c46681440051e3679a04498c1039.png)



#### 方法2：プライベート展開とインストール

> EMQ Xの初心者ユーザーの場合は、[EMQ Xドキュメント](https://docs.emqx.net/broker/latest/cn/)からすぐに開始することをお勧めします。

[EMQダウンロード](https://www.emqx.io/downloads)ページにアクセスして、オペレーティングシステムに適したインストールパッケージをダウンロードします。この記事の執筆時点では、EMQXエンタープライズバージョンはv4.1.2です。zipパッケージをダウンロードするための起動手順は次のとおりです。

```bash
## ダウンロードしたインストールパッケージを解凍します
unzip emqx-macosx-v4.1.2.zip
cd emqx

## デバッグするために、コンソールモードでEMQXを起動します
./bin/emqx console
```

起動が成功すると、ブラウザは[http://127.0.0.1:18083](http://127.0.0.1:18083)にアクセスしてEMQ X管理コンソールダッシュボードにアクセスし、デフォルトのユーザー名とパスワードである `admin``public`を使用して初期ログインを完了します。



### ClickHouseをインストールする

[ClickHouseドキュメント](https://clickhouse.tech/#quick-start)の推奨インストール方法を使用してインストールします。この記事は、Huawei Cloud 2コア4GBのクラウドサーバーでインストールします。

```bash
sudo yum install yum-utils
sudo rpm --import https://repo.clickhouse.tech/CLICKHOUSE-KEY.GPG
sudo yum-config-manager --add-repo https://repo.clickhouse.tech/rpm/clickhouse.repo
sudo yum install clickhouse-server clickhouse-client

sudo /etc/init.d/clickhouse-server start
clickhouse-client
```

**デフォルトでは、ClickHouseはローカルポートのみをリッスンします。リモートアクセスが必要な場合は、構成ファイルを変更する必要があります**：

```xml
<!-- /etc/clickhouse-server/config.xml -->
<!--この行を見つけて、<listen_host> :: </ listen_host>のコメントを外し、以下に変更します。-->
<listen_host>0.0.0.0</listen_host>
```

再起動：

```bash
service clickhouse-server restart
```



### Grafanaをインストールする

次のコマンドを使用して、Docker経由でGrafanaをインストールして起動します。

```bash
docker run -d --name=grafana -p 3000:3000 grafana/grafana
```

起動が成功すると、ブラウザは[http://127.0.0.1:3000](http://127.0.0.1:3000)にアクセスしてGrafana視覚化パネルにアクセスし、デフォルトのユーザー名とパスワード `admin``admin`を使用して、ログインします。プロンプトに従ってパスワードを変更し、新しいパスワードでログインしてメイン画面に入ります。



## EMQXを設定してClickHouseにデータを保存する

> EMQ X Enterprise Editionは、ルールエンジンを介したさまざまなデータベースおよびメッセージミドルウェア(ClickHouseを含む)へのデバイスイベントおよびメッセージデータの書き込みをサポートしています。[ドキュメント](https://docs.emqx.net/broker/latest/を参照)cn/rule/rule-example.html#％E4％BF％9D％E5％AD％98％E6％95％B0％E6％8D％AE％E5％88％B0-クリックハウス)。

### ClickHouse データベースとデータテーブルを作成します

ClickHouseを起動し、コマンドラインを起動します。

```bash
sudo /etc/init.d/clickhouse-server start
clickhouse-client
```

**テスト** データベースを作成します。
```sql
create database test;
use test;
```
sensor_dataテーブルを作成します。ClickHouseSQL構文は通常のリレーショナルデータベースとは異なります。[ClickHousedocument-SQL構文](https://clickhouse.tech/docs/ja/sql-reference/syntax/)を参照してください。

> Grafana時系列表示の場合、DataTime列とDate列を追加する必要があります

```sql
CREATE TABLE sensor_data (
 	temperature Float32,
  humidity Float32,
  volume Float32,
  PM10 Float32,
  pm25 Float32,
  SO2 Float32,
  NO2 Float32,
  CO Float32,
  sensor_id String,
  area Int16,
  coll_time DateTime,
  coll_date Date
) engine = Log;

-- ClickHouseコマンドラインは、テーブル作成ステートメントの改行をサポートしていません。次のSQLを使用して実行します。
CREATE TABLE sensor_data( temperature Float32, humidity Float32, volume Float32, PM10 Float32, pm25 Float32, SO2 Float32, NO2 Float32, CO Float32, sensor_id String, area Int16, coll_time DateTime, coll_date Date) engine = Log;
```



### EMQXルールエンジンを構成する

EMQ X Dashboaredを開き、**RuleEngine** -> **Rule** ページに入り、**Create** ボタンをクリックして作成ページに入ります。

#### ルールSQL

ルールSQLは、EMQ Xメッセージおよびイベントをフィルタリングするために使用されます。次のSQLは、 `sensor/data`のサブジェクトからpayloadを取得します。

```sql
SELECT
  payload
FROM
  "sensor/data"
```

**SQLテスト関数** を使用して、結果テストをスクリーニングするためのテストデータを入力します。sqlが正しい場合、出力内容は次の結果が得られます。

**テストデータ：**

```json
{
    "temperature": 30,
    "humidity" : 20,
    "volume": 44.5,
    "PM10": 23,
    "pm25": 61,
    "SO2": 14,
    "NO2": 4,
    "CO": 5,
    "id": "10-c6-1f-1a-1f-47",
    "area": 1,
    "ts": 1596157444170
}
```

**テスト出力：**

```json
{
  "payload": "{\"temperature\":30,\"humidity\":20,\"volume\":44.5,\"PM10\":23,\"pm25\":61,\"SO2\":14,\"NO2\":4,\"CO\":5,\"id\":\"10-c6-1f-1a-1f-47\",\"area\":1,\"ts\":1596157444170}"
}
```

![image-20200915163114173](https://static.emqx.net/images/27a5b570c0cac5047c81b781584fecab.png)



#### 応答アクション

EMQ X Enterprise EditionとEMQX Cloudはどちらも、ルールエンジンを介したClickHouseへのデータの書き込みをサポートしています。

応答アクションを構成するには、2つのデータが必要です。1つは関連するリソースで、もう1つはSQLテンプレートです。

- 関連リソース：ClickHouseリソースを作成し、接続パラメーターを構成します
- SQLテンプレート：これはデータを運ぶINSERTSQLです。SQLでデータベース名を指定する必要があることに注意してください。

```sql
INSERT INTO test.sensor_data VALUES(
  ${payload.temperature},
  ${payload.humidity},
  ${payload.volume},
  ${payload.PM10},
  ${payload.pm25},
  ${payload.SO2},
  ${payload.NO2},
  ${payload.CO},
  '${payload.id}',
  ${payload.area},
  ${payload.ts}/1000,
  ${payload.ts}/1000
)
```



#### 作成プロセス

応答アクションの下にある[**追加**]ボタンをクリックし、ポップアップボックスで[**データをClickHouseに保存**]を選択し、[**新しいリソース**]をクリックして新しいClickHouseリソースを作成します。

リソースタイプ **ClickHouse** を選択し、リソース名、サーバーアドレス、および認証情報を入力します。

![image-20200915164110500](https://static.emqx.net/images/b1624cbb7e5665b6d0052f5c21d04f07.png)

応答アクションの作成ページで新しく作成されたリソースを選択し、SQLテンプレートに入力します。

![image-20200915163932584](https://static.emqx.net/images/8ba4873997c3e8a8a7783287218cbab7.png)



## シミュレーションデータを生成する

次のスクリプトは、10台のデバイスが過去24時間の中に5秒ごとにシミュレートされたデータを報告し、EMQXに送信するシナリオをシミュレートします。

Node.jsをインストールし、必要に応じて構成パラメーターを変更して、次のコマンドで開始します。

```bash
npm install mqtt mockjs --save --registry=https://registry.npm.taobao.org
node mock.js
```

シミュレートされたデータが生成され、EMQ X　コードに送信されます。クラスターのパフォーマンスに応じて、関連するパラメーターを調整してください。

```javascript
// mock.js
const mqtt = require('mqtt')
const Mock = require('mockjs')

const EMQX_SERVER = 'mqtt://localhost:1883'
const CLIENT_NUM = 10
const STEP = 5000 //アナログ取得時間間隔ms
const AWAIT = 500 //メッセージレートが速すぎるのを防ぐための各送信後のスリープ時間　ms
const CLIENT_POOL = []

startMock()


function sleep(timer = 100) {
  return new Promise(resolve => {
    setTimeout(resolve, timer)
  })
}

async function startMock() {
  const now = Date.now()
  for (let i = 0; i < CLIENT_NUM; i++) {
    const client = await createClient(`mock_client_${i}`)
    CLIENT_POOL.push(client)
  }
  // last 24h every 5s
  const last = 24 * 3600 * 1000
  for (let ts = now - last; ts <= now; ts += STEP) {
    for (const client of CLIENT_POOL) {
      const mockData = generateMockData()
      const data = {
        ...mockData,
        id: client.options.clientId,
        ts,
      }
      client.publish('sensor/data', JSON.stringify(data))
    }
    const dateStr = new Date(ts).toLocaleTimeString()
    console.log(`${dateStr} send success.`)
    await sleep(AWAIT)
  }
  console.log(`Done, use ${(Date.now() - now) / 1000}s`)
}

/**
 * Init a virtual mqtt client
 * @param {string} clientId ClientID
 */
function createClient(clientId) {
  return new Promise((resolve, reject) => {
    const client = mqtt.connect(EMQX_SERVER, {
      clientId,
    })
    client.on('connect', () => {
      console.log(`client ${clientId} connected`)
      resolve(client)
    })
    client.on('reconnect', () => {
      console.log('reconnect')
    })
    client.on('error', (e) => {
      console.error(e)
      reject(e)
    })
  })
}

/**
* Generate mock data
*/
function generateMockData() {
 return {
   "temperature": parseFloat(Mock.Random.float(22, 100).toFixed(2)),
   "humidity": parseFloat(Mock.Random.float(12, 86).toFixed(2)),
   "volume": parseFloat(Mock.Random.float(20, 200).toFixed(2)),
   "PM10": parseFloat(Mock.Random.float(0, 300).toFixed(2)),
   "pm25": parseFloat(Mock.Random.float(0, 300).toFixed(2)),
   "SO2": parseFloat(Mock.Random.float(0, 50).toFixed(2)),
   "NO2": parseFloat(Mock.Random.float(0, 50).toFixed(2)),
   "CO": parseFloat(Mock.Random.float(0, 50).toFixed(2)),
   "area": Mock.Random.integer(0, 100),
 }
}
```



## 視覚化構成

コンポーネントがインストールされ、シミュレーションデータが正常に書き込まれたら、Grafana視覚化画面の操作ガイドラインに従って、ビジネスに必要なデータ視覚化構成を完了します。

まず、Grafana ClickHouseデータソースプラグインをインストールする必要があります：[プラグインのインストール手順を表示](https://grafana.com/grafana/plugins/vertamedia-clickhouse-datasource/installation)

### データソースを追加する

データソース、つまり表示されているデータソース情報を追加します。 **ClickHouse** タイプのデータソースを選択し、構成用の接続パラメーターを入力します。デフォルトでは、主要な構成情報は次のとおりです。

![image-20200916110233266](https://static.emqx.net/images/384986bdbaca56ab3bf8268fa9681ab4.png)



### ダッシュボードの追加(新しいダッシュボード)

データソースを追加した後、データダッシュボード情報を追加します。ダッシュボードは、複数の視覚化パネルのコレクションです。[**新しいダッシュボード**]をクリックした後、[**+クエリ**]を選択して、クエリを通じてデータパネルを追加します。

### 平均値パネル

Grafanaの視覚化クエリビルダーを使用して、すべてのデバイスの平均値をクエリします。

ClickHouseプラグインは、SQLを生成するときにいくつかの変数を自動的に入力し、Grafanaはクエリを実行するときにこれらの変数を認識できます。

- $ timeSeries：指定されたDateTime列と、データがGrafanaがディスプレイで使用できる形式であることを確認するための変換ロジック
- $ table：データベーステーブル名
- $ timeFilter：自動生成された時系列フィルター条件

必要に応じて、2つのAVG処理済みフィールドを追加できます。

```sql
SELECT
    $timeSeries as t,
    avg(temperature) as temperature,
    avg(humidity) as humidity
FROM $table

WHERE $timeFilter

GROUP BY t

ORDER BY t
```

折れ線チャートなどの時系列のあるチャートの場合、Grafanaは時系列を選択するためにDateTime列を必要とします。時系列を入力する必要があり、列はDateTimeまたはTimestampデータタイプである必要があります。

下の図の赤いボックスにある[編集]ボタンをクリックして、テーブル名と時間列の構成を入力します。

![image-20200916110544930](https://static.emqx.net/images/ff07248e60a570409f1ee5bc64925fb4.png)

データベースとデータテーブルを選択します。データテーブルにDateTimeフィールドとDateフィールドがある場合は、Column：DateTimeとColumn：Dateで識別して選択できます。

- 列：日付：Grafanaが時間範囲をドラッグするときにデータをフィルタリングするために使用されます
- 列：DateTime：タイミング表示の時間データとして使用されます

<img src="https://static.emqx.net/images/07b9a092530b50bfa314447a189f8d4b.png" alt="image-20200916111101870" style="zoom:67%;" />

終了したら、編集ボタンをもう一度クリックし、アイコンの右上隅をクリックして時間範囲を選択し、時間範囲内にデータがあることを確認し、更新アイコンをクリックしてデータを更新すると、レンダリングされた平均パネルが表示されます。

![image-20200916111420196](https://static.emqx.net/images/1eda9c065405599c21d9163d334e1a08.png)

作成が完了したら、左上隅の戻るボタンをクリックすると、データパネルがダッシュボードに正常に追加されます。上部のナビゲーションバーにある[**保存**]アイコンをクリックし、ダッシュボード名を入力してダッシュボードの作成を完了します。



### 最大値パネル

ダッシュボードの[**Add panel**]ボタンをクリックして、最大チャートと最小チャートを追加します。操作手順は平均値の追加と同じで、クエリの **SELECT** 統計メソッドフィールドのみが調整され、**AVG** 関数は **MAX** に調整されます。

```sql
SELECT
    $timeSeries as t,
    max(temperature) as temperature,
    max(humidity) as humidity
FROM $table

WHERE $timeFilter

GROUP BY t

ORDER BY t
```



### ダッシュボード効果

ダッシュボードを保存し、ドラッグアンドドロップして各データパネルのサイズと位置を調整し、最後に視覚効果の高いデータダッシュボードを取得します。ダッシュボードの右上隅で、時間間隔と自動更新時間を選択できます。このとき、デバイスは引き続きデータ収集データを送信し、ダッシュボードのデータ値が変化するため、視覚化効果が向上します。

![image-20200916112334081](https://static.emqx.net/images/684f512f88a96596d86e5590264e7ebe.png)



## 総括する

これまでに、EMQ X + ClickHouseを使用して、IoTデータの送信、保存、分析、表示のプロセス全体のシステム構築を完了しました。読者は、EMQ Xの豊富な拡張機能と、IoTデータ収集におけるClickHouseの主要なデータ処理および分析機能のアプリケーションを理解できます。 Grafanaの他の機能を詳細に調査および習得した後、ユーザーはより完全なデータ視覚化分析、さらには監視およびアラームシステムをカスタマイズできます。
