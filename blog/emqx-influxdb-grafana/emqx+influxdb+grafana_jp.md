# EMQ X + InfluxDB + GrafanaでIoT視覚化プラットフォームを構築します



![画板 172x8.png](https://admin.emqx.io/_uploads/PHOTO/91d497420de71170fd69655588faeac5.png)



この記事では、一般的なIoTの使用シナリオを例として、EMQ XMQTTサーバー+ InfluxDB + GrafanaでIoTデータ視覚化プラットフォームを構築し、IoTデバイスによってアップロードされた時系列データを便利に表示する方法を紹介します。

IoTプロジェクトのプラットフォームに接続するデバイスデータおよびデータストレージソリューションには、次の特徴があります。

- データ収集はデータの次元、頻度、および収集用のデバイス数は非常に多くのがありますので、収集されるデータの量はたくさんあるんです、メッセージサーバーのアクセススループットとバックエンドデータベースのストレージスペース消費には大きなプレッシャーがあります。
- データは、収集サイクルに従って、通常は時系列で報告、送信、および保存されます。

したがって、IoTプロジェクトでは時系列データベースを使用することをお勧めします。 **時系列データベース** は、容量の増加、大規模検索の高速化、データ圧縮率の向上など、パフォーマンスを大幅に向上させることができます。データがデータベースに保存された後、データの価値を十分に活用するために、データ視覚化プラットフォームはルールに従ってデータをカウントおよび表示して，データの監視やインデックス統計などのビジネス要件を実現することがよくあります



## ビジネスシーン

1ロットのデバイスがあると仮定すると、各デバイスにはクライアントIDがあり、すべてのデバイスは[MQTTプロトコル](https://www.emqx.io/mqtt)を介して[MQTTサーバー](https://www.emqx.io/products/broker)の対応するテーマにデータを送信します。テーマは次のように設計されています。

```bash
devices/{client_id}/messages
```

各デバイスから送信されるデータ形式はJSONであり、センサーによって収集された温度と湿度のデータが送信します。

```json
{
    "temperature": 30,
    "humidity" : 20
}
```

今後いつでも表示できるように、データをリアルタイムで保存する必要があります。具体的な要件は次のとおりです。

- 各デバイスは5秒に1回の頻度でデータを報告し、データベースは各データを保存する必要があります。
- 視覚化システムを使用して、**任意の時間間隔** での温度/湿度の平均値、最大値、最小値、および**すべての時間間隔**での温度/湿度の平均値を表示します。

視覚化プラットフォームの最終的な表示効果を以下に示します。ダッシュボードの右上隅で、時間間隔と自動更新時間を選択できます。このとき、デバイスは引き続きデータを送信し、それに応じてダッシュボードのデータ値が変化されます、より包括的な視覚化効果が得られます。


![image20191125152935211.png](https://admin.emqx.io/_uploads/PHOTO/8da1266462ee04b19bc134414f3bc026.png)



## はじめに

現在、多くのIoTメッセージミドルウェア、時系列データベース、データ収集とレポート作成、ネットワーク・アクセス、メッセージストレージと可視化などの機能と組み合わせることで、EMQ X(高性能IoT MQTTメッセージミドルウェア) + InfluxDB(時系列データベース) + Grafana(美しく強力な視覚的モニタリングインジケーター表示ツール)のは、間違いなく最高のIoTデータ視覚化統合ソリューションです。

ソリューションの全体的な構造を次の図に示します。

![image20191125163959537.png](https://admin.emqx.io/_uploads/PHOTO/132d0cbb3f4166478a7c06dbcfa051d4.png)

- **EMQX**：[EMQ X](https://github.com/emqx/emqx)は、高度に同時実行されるErlang / OTP言語プラットフォーム開発に基づいており、数百万の接続と分散クラスターアーキテクチャ、出版-購読型モデルをサポートするオープンソースのMQTTメッセージサーバー。 EMQ Xには、すぐに使用できる多数の組み込み機能があります。**エンタープライズバージョンのEMQX Enterpriseのは、ルールエンジンまたはメッセージ永続化プラグインを介してInfluxDBでのデバイスメッセージの高性能ストレージをサポートします**。オープンソースユーザーは、メッセージストレージを自分で処理する必要があります。
- **InfluxDB**：InfluxDBは、InfluxDataによってオープンソース化された時系列データベースです。 Goによって作成され、高性能の時系列データの検索と保存に重点を置いています。 InfluxDBは、ストレージシステムのデータの監視やIoT業界のリアルタイムデータなどのシナリオで広く使用されています。
- **Grafana**：Grafanaは、クロスプラットフォームのオープンソース測定分析および視覚化ツールであり、柔軟な構成を通じて収集されたデータを視覚化することができます。クライアント側のチャートをすばやく柔軟に作成できます。公式ライブラリには、ヒートマップ、ラインチャート、チャート、その他の表示方法など、豊富なダッシュボードプラグインがあります。 Graphite、InfluxDB、OpenTSDB、Prometheus、Elasticsearch、CloudWatch、KairosDBなどのデータソースをサポートします。カスタムアラームルールを作成し、他のメッセージ処理サービスまたはコンポーネントに通知できます。



## 実装手順

この記事で使用する各コンポーネントにはDockerイメージがあります。ダウンロードしてインストールする必要があるEMQX(一部の構成を変更すると便利のため)を除いて、InfluxDBとGrafanaはDockerを使用して構築されます。詳細なインストール手順はこの記事では繰り返されません。

3つの主要コンポーネントの公式Webサイトには、さまざまなオペレーティングシステム用のインストールパッケージリソースとチュートリアルがあります。

- [EMQ X公式ウェブサイト](https://www.emqx.io/cn/)
- [InfluxDB公式ウェブサイト](https://www.influxdata.com/)
- [Grafana公式サイト](https://grafana.com/)

### EMQXのインストール

#### インストール

[EMQ Xダウンロード](https://www.emqx.io/downloads)ページにアクセスして、オペレーティングシステムに適したインストールパッケージをダウンロードします。**データの永続化はエンタープライズ機能であるため、EMQXEnterpriseEditionをダウンロードする必要があります(ライセンスの試用を申請できます)**。この記事の執筆時点で、EMQ X Enterprise Editionの最新バージョンはv3.4.5です。このチュートリアルでは、このバージョン以降を使用する必要があります。ダウンロード後の起動手順は次のとおりです。

```bash
## ダウンロードしたインストールパッケージを解凍します
unzip emqx-ee-macosx-v3.4.4.zip
cd emqx

## ライセンスファイルをEMQXの指定されたディレクトリ　etc/　にコピーし、ライセンスはトライアルを申請するか、購入してを取得する必要があります
cp ../emqx.lic ./etc

## EMQXをコンソールモードで起動します
./bin/emqx console
```

#### 設定を変更する

この記事で必要な構成ファイルは次のとおりです。

1. ライセンスファイル、EMQ X Enterprise Editionライセンスファイル、使用可能なライセンスを上書きします。

   ```
   etc/emqx.lic
   ```

2. EMQ X InfluxDBメッセージストレージプラグイン構成ファイルはInfluxDB接続情報を構成し、ストレージトピックを選択するために使用されます。

   ```
   etc/plugins/emqx_backend_influxdb.conf
   ```

   次のように、実際の展開状況に応じてプラグイン構成情報を入力します。

   ```
   backend.influxdb.pool1.server = 127.0.0.1:8089

   backend.influxdb.pool1.pool_size = 5

   ## Whether or not set timestamp when encoding InfluxDB line
   backend.influxdb.pool1.set_timestamp = true

   ## Store Publish Message
   ## ビジネスにはdevices / {client_id} / messagesテーマのみが必要なので、ここでデフォルトのテーマフィルターを変更します
   backend.influxdb.hook.message.publish.1 = {"topic": "devices/+/messages", "action": {"function": "on_message_publish"}, "pool": "pool1"}
   ```

3. EMQ X InfluxDBメッセージストレージプラグインメッセージテンプレートファイル。メッセージの解析とストレージのテンプレートを定義するために使用されます。

   ```
   ## テンプレートファイル
   data/templates/emqx_backend_influxdb_example.tmpl

   ## 名前が変更されました
   data/templates/emqx_backend_influxdb.tmpl
   ```

   MQTTメッセージをInfluxDBに直接書き込むことはできないため、MQTTメッセージをInfluxDBに直接書き込むことはできないので、EMQ Xは、MQTTメッセージをInfluxDBに書き込むことができるDataPointに変換するためのemqx_backend_influxdb.tmplテンプレートファイルを提供します。

   ```
   {
     "devices/+/messages": {
       "measurement": "devices",
       "tags": {
         "client_id": "$client_id"
       },
       "fields": {
         "temperature": ["$payload", "temperature"],
         "humidity": ["$payload", "humidity"]
       },
       "timestamp": "$timestamp"
     }
   }
   ```

   > EMQ X InfluxDBの使用に関する詳細なチュートリアルについては、[InfluxDBデータストレージ]を参照してください。

### InfluxDBのインストール

Docker経由でインストールし、データフォルダーと `8089`udpポートおよび`8086`ポート(Grafanaで使用)をマップします。

> EMQXはInfluxDB UDPチャネルのみをサポートし、influx_udpプラグインのサポートが必要であり、データベース名はdbとして指定されます

```bash
## influx_udpプラグインを使用する
git clone https://github.com/palkan/influx_udp.git

## プラグインディレクトリに入る
cd influx_udp

## プラグイン構成を使用してコンテナを作成して起動します
docker run --name=influxdb --rm -d -p 8086:8086 -p 8089:8089/udp \
	-v ${PWD}/files/influxdb.conf:/etc/influxdb/influxdb.conf \
  -e INFLUXDB_DB=db \
  influxdb:latest

## 起動後、コンテナの実行状態を確認してください
docker ps -a

```

**この時点で、EMQXを再起動し、プラグインを起動して上記の構成を適用できます**：

```bash
./bin/emqx stop

./bin/emqx start

## または、コンソールモードを使用して詳細を確認してください
./bin/emqx console

## プラグインを起動します
./bin/emqx_ctl plugins load emqx_backend_influxdb

## 正常に起動すると、次のプロンプトが表示されます
Plugin emqx_backend_influxdb loaded successfully.

```

### Grafanaのインストール

次のコマンドを使用して、Docker経由でGrafanaをインストールして起動します。

```bash
docker run -d --name=grafana -p 3000:3000 grafana/grafana
```

起動が成功すると、ブラウザは `http://127.0.0.1:3000`にアクセスしてGrafana視覚化パネルに入って、デフォルトのユーザー名とパスワード`admin` `admin`を使用して初期ログインをします。ログイン後、プロンプトに従ってパスワードを変更し、新しいパスワードでログインしてメインインターフェイスに入ります。 ：

![image20191125100532923.png](https://admin.emqx.io/_uploads/PHOTO/f4dc1b6aa64a2c542b2ae052b75a5250.png)



## シミュレーションデータを書き込む

構成プロセス中の効果のプレビューを容易にするために、視覚化構成の前にシミュレーションデータを書き込む必要があります。

次のスクリプトは、100台のデバイスが過去12時間に5秒ごとにシミュレートされた温度と湿度のデータを報告し、それをEMQ Xに送信したシナリオをシミュレートします。Node.jsプラットフォームをインストールした後、次のコマンドで開始できます。

```bash
npm install mqtt mockjs --save
node mock.js
```

シミュレーションスクリプトが実行された後、データはInfluxDB `db`データベースに書き込まれ、次のコマンドでInfluxDBコンテナに入ってデータを表示します。

```bash
## dockerコンテナに入る
docker exec -it influxdb bash

## influxdbコマンドラインを入ります
root@581bde65650d:/# influx

## dbデータベースに切り替えます
use db;

## 検索データ
select * from devices limit 1;

## 検索結果
name: devices
time                client_id      humidity temperature
----                ---------      -------- -----------
1574578725608000000 mock_client_1  54.33    98.5

```

シミュレーションスクリプトは次のとおりです。

```javascript
// Node.js
// mock.js
const mqtt = require('mqtt')
const Mock = require('mockjs')

class MockData {
  constructor(clientNum = 20) {
    this.EMQX_SERVER = 'mqtt://localhost:1883'
    this.clientNum = clientNum
    this.clients = {}
    this.startMock()
  }

  async startMock() {
    const now = Date.now()
    // last 12h every 5s
    for (let ts = now - 12 * 3600 * 1000; ts <= now; ts += 5 * 1000) {
      for (let i = 0; i < this.clientNum; i++) {
        const clientId = `mock_client_${i}`
        const client = this.clients[clientId] || await this.createClient(clientId)
        this.clients[clientId] = client
        const mockData = this.getMockData()
        client.publish(`devices/${clientId}/messages`, JSON.stringify(mockData))
        console.log(`${clientId} send temperature ${mockData.temperature} humidity ${mockData.humidity}`)
      }
    }
  }

  /**
   * Init a virtual mqtt client
   * @param {string} clientId ClientID
   */
  createClient(clientId) {
    return new Promise((resolve, reject) => {
      const client = mqtt.connect(this.EMQX_SERVER, {
        clientId,
      })
      client.on('connect', () => {
        console.log('client s% connected', clientId)
        resolve(client)
      })
      client.on('error', (e) => {
        reject(e)
      })
    })
  }

  /**
   * Generate mock data
   */
  getMockData() {
    return {
      temperature: parseFloat(Mock.Random.float(22, 100).toFixed(2)),
      humidity: parseFloat(Mock.Random.float(12, 86).toFixed(2)),
    }
  }
}

// startup
new MockData(100)

```



## 視覚的構成

コンポーネントがインストールされ、シミュレーションデータが正常に書き込まれたら、Grafana視覚化インターフェイスの操作ガイドラインに従って、ビジネスに必要なデータ視覚化構成を完了します。

### データソースを追加する

データソース、つまり表示されているデータソース情報を追加します。 **InfluxDB**タイプのデータソースを選択して構成用の接続パラメーターを入力します。デフォルトでは、主要な構成情報は次のとおりです。

- URL：InfluxDB接続アドレスを入力します。Dockerを使用してインストールするので、GrafanaはInfluxDBコンテナネットワークに接続されていません。`127.0.0.1`または `localhost`の代わりに現在のサーバーイントラネット/ローカルエリアネットワークアドレスを入力してください。
- Auth：InfluxDBはデフォルトで認証なしモードを開始するので、実際の状況に応じて入力します。
- Database：デフォルトでEMQ Xのデータベース名を書き込むには、 `db`を入力します。

### ダッシュボードを追加

データソースを追加した後、表示したいデータダッシュボード情報を追加します。ダッシュボードは、複数の視覚化パネルのコレクションです。[**New Dashboard**]をクリックした後、[**Add Query**]を選択して、検索してデータパネルを追加します。

![image20191125135546283.png](https://admin.emqx.io/_uploads/PHOTO/ad69fdbc04d1284b234452e4e3231da7.png)



パネルを作成するには、**Queries（検索）**、**Visualization（視覚化）**、**General(チャート構成)**、**Alert**の4つのステップがあり、以下のビジネス要件に従って作成します

### 温度と湿度の平均パネル

Grafanaの視覚化検索ビルダーを使用して、すべてのデバイスの平均値を検索します。

- FROM：データの `measurement` を選択し、`emqx_backend_influxdb.tmpl`ファイルに従って構成します。ここで、`measurement`は`devices`です。
- SELECT：選択されたフィールドと計算されたフィールド。ここでの2つの検索は、**Aggregation**関数を使用して処理する必要があります。`temperature``mean`と`humidity``mean`を選択し、温度フィールドと湿度フィールドの平均値を検索して計算します。
- GROUP BY：時間間隔の集計がデフォルトで使用されます。
  - `time($__interval)`関数は、 `$__interval`時間間隔でデータを取得することを意味します。たとえば、`time(5s)`は、`5`秒間隔ごとに元のデータから値を取得して計算(SELECTでの計算)することを意味します。
  - `fill`パラメータは、値がない場合のデフォルト値を表します。`null`の場合、データポイントはチャートに表示されません。
  - `tag`は任意で、指定されたタグに従って表示されます。
- ALIAS BY：検索のエイリアス。目視検査に便利です。

**Visualization**はデフォルトでは変更されません。**General**のパネルの名前は`Device temperature and humidity mean value`に変更されます。ビジネスを監視およびアラームする必要がある場合は、**Alert**のアラームルールを編集できます。ここでは視覚的な表示のみが行われ、機能は使用されません。

![image20191125140117416.png](https://admin.emqx.io/_uploads/PHOTO/c7a4f990ef6dd23007c0f45ff9872049.png)



作成が完了したら、左上隅の戻るボタンをクリックするとデータパネルがダッシュボードに正常に追加されます。上部のナビゲーションバーにある[**保存**]アイコンをクリックし、ダッシュボード名を入力してダッシュボードの作成を完了します。

![image20191125144011475.png](https://admin.emqx.io/_uploads/PHOTO/ca04c7cfedeffd193f7ae1bd9290d7ef.png)




### 最高および最低の温度と湿度のパネル

ダッシュボードの[パネルの追加]ボタンをクリックして最高温度と最低温度のチャートを追加します。操作手順は、平均値を加算するのと同じです。検索の**SELECT**統計メソッドフィールドのみが、**Selectors**関数の `max`メソッドと`min`メソッドに変更されます。

### 温度と湿度の全体平均値、データ数パネル

Dashboardの**Add panel**ボタンをクリックして温度と湿度の全体平均値、データ数パネルを追加します。操作手順は上記の2つの手順と大体同じです。`count`メソッドと `mean`メソッドを使用して指定したフィールドを操作し、**GROUPBY**フィールドをキャンセルして検索を完了します。 **Visualization**は、構成でチャートタイプを**Gauge**を選択します。

ダッシュボードを保存し、各データパネルのサイズと位置を調整し、最後にきれいなデータダッシュボードを取得します。最終報告が完了すると、記事の冒頭に示した効果が示されます。



## 総括する

これまでに、EMQ X + InfluxDB + GrafanaIoTデータ視覚化プラットフォームの構築が完了しました。この記事を通じて、読者は、EMQ Xの豊富な拡張機能を使用して、データ視覚化ソリューションでInfluxDB + Grafanaに基づく視覚化システムを迅速かつ柔軟に開発し、大規模なデータストレージ、計算分析、および表示を実現できることを理解できます。 Grafanaの他の機能を詳細に調査および習得した後、ユーザーはより完全なデータの視覚化をカスタマイズし、アラームシステムを監視することもできます。
