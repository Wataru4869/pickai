export type ServiceUseCase = {
  situation: string;
  prepare: string;
  aiRole: string;
  result: string;
  humanCheck: string;
};

// Editorial examples for evaluating a service with a small, real task.
// These are not performance claims or guarantees. Current capabilities remain
// sourced from data/service-facts and are displayed separately on each page.
export const serviceUseCases: Record<string, ServiceUseCase[]> = {
  chatgpt: [
    { situation: "会議資料を短く整理する", prepare: "元資料、読み手、文字数", aiRole: "要点を抜き出し、構成と下書きを作る", result: "要約と説明文のたたき台", humanCheck: "数字・固有名詞・引用を原文と照合" },
    { situation: "画像を含む内容を説明する", prepare: "画像、知りたい点、用途", aiRole: "画像と質問を踏まえて論点を整理する", result: "説明と追加確認項目", humanCheck: "読み取り間違いと利用権を確認" },
    { situation: "調査の入口を作る", prepare: "テーマ、対象期間、除外条件", aiRole: "Web検索を使い、候補と論点をまとめる", result: "参照先付きの調査メモ", humanCheck: "出典の日付と本文を開いて確認" },
  ],
  claude: [
    { situation: "長い資料から判断メモを作る", prepare: "資料、判断したい論点、形式", aiRole: "論点を分け、根拠と結論候補を整理する", result: "要約・比較軸・判断メモ", humanCheck: "重要な引用と結論を原文照合" },
    { situation: "文章を読みやすく編集する", prepare: "原稿、読者、残す表現", aiRole: "構成を整え、修正理由と案を出す", result: "改稿案と変更点", humanCheck: "意味やニュアンスが変わっていないか" },
    { situation: "小さな成果物を組み立てる", prepare: "要件、素材、完成条件", aiRole: "コードやArtifactsで形にする", result: "確認できる試作品", humanCheck: "動作・権利・公開範囲を確認" },
  ],
  gemini: [
    { situation: "複数形式の資料を整理する", prepare: "文章、画像、ファイル、質問", aiRole: "内容を横断して論点をまとめる", result: "要約と確認項目", humanCheck: "元資料との一致と共有範囲を確認" },
    { situation: "メッセージの草案を作る", prepare: "目的、相手、伝える事実", aiRole: "文面の構成と複数案を作る", result: "送信前のメッセージ案", humanCheck: "宛先・機密情報・事実を確認" },
    { situation: "画像案と調査メモをまとめる", prepare: "テーマ、用途、避けたい表現", aiRole: "画像案と関連情報を整理する", result: "比較用の案と参照先", humanCheck: "出典、人物、商標、利用条件を確認" },
  ],
  grok: [
    { situation: "公開情報の反応を調べる", prepare: "テーマ、期間、確認したい意見", aiRole: "Webや公開X投稿から論点を集める", result: "反応の分類と参照候補", humanCheck: "投稿日時・文脈・一次情報を確認" },
    { situation: "最近の話題を説明文にする", prepare: "対象テーマ、読者、必要な根拠", aiRole: "情報を整理して下書きを作る", result: "説明文と未確認点", humanCheck: "速報と確定情報を分けて確認" },
    { situation: "複数の見方を並べる", prepare: "問い、対象範囲、比較軸", aiRole: "賛否や論点を分類する", result: "比較用の論点表", humanCheck: "偏りと出典の信頼性を確認" },
  ],
  perplexity: [
    { situation: "出典から調査を始める", prepare: "質問、期間、対象地域", aiRole: "回答と参照元の候補をまとめる", result: "出典付きの調査メモ", humanCheck: "リンク先に主張の根拠があるか" },
    { situation: "製品条件を比較する", prepare: "製品名、料金・機能などの確認項目", aiRole: "公式ページ候補と差分を整理する", result: "確認先と未確認項目の一覧", humanCheck: "公式料金・規約を直接確認" },
    { situation: "短いブリーフを作る", prepare: "テーマ、対象者、締切", aiRole: "重要事項と追加調査を分ける", result: "要点と次の調査項目", humanCheck: "日付・引用・解釈を確認" },
  ],
  cursor: [
    { situation: "既存コードの不具合を直す", prepare: "再現手順、対象リポジトリ、完了条件", aiRole: "関連箇所を探し、差分とテストを作る", result: "修正案と検証結果", humanCheck: "差分・権限・回帰影響をレビュー" },
    { situation: "複数ファイルの変更を計画する", prepare: "要件、非対象、受入条件", aiRole: "作業を分解し、実装順を整理する", result: "変更計画と対象ファイル", humanCheck: "不要な範囲拡大がないか" },
    { situation: "コードレビューを補助する", prepare: "差分、設計意図、テスト結果", aiRole: "リスクと確認点を列挙する", result: "優先度付きの指摘", humanCheck: "指摘の再現性と妥当性を確認" },
  ],
  "github-copilot": [
    { situation: "IDEで小さな実装を進める", prepare: "対象ファイル、要件、例", aiRole: "補完とチャットで変更案を出す", result: "レビュー前のコード差分", humanCheck: "ライセンス・安全性・テストを確認" },
    { situation: "Pull Requestを確認する", prepare: "PR差分、目的、確認基準", aiRole: "変更点と潜在的な問題を整理する", result: "レビュー候補", humanCheck: "誤検知と重要度を判断" },
    { situation: "CLI作業の手順を確認する", prepare: "目的、環境、禁止操作", aiRole: "コマンド候補と手順を示す", result: "実行前の手順案", humanCheck: "対象・権限・破壊性を確認" },
  ],
  windsurf: [
    { situation: "IDEで機能を修正する", prepare: "要件、コード、テスト条件", aiRole: "関連箇所を読み、変更を進める", result: "コード差分と確認事項", humanCheck: "実行権限と回帰影響を確認" },
    { situation: "複数作業を並べて管理する", prepare: "タスク、優先順位、依存関係", aiRole: "作業を分けて進行状況を整理する", result: "Kanban上の作業単位", humanCheck: "重複変更と完了条件を確認" },
    { situation: "旧環境からの移行を検討する", prepare: "現行プラン、利用機能、保存物", aiRole: "移行時の確認項目を洗い出す", result: "移行チェックリスト", humanCheck: "契約・名称・データ引継ぎを公式確認" },
  ],
  "adobe-firefly": [
    { situation: "広告用の画像案を比較する", prepare: "用途、比率、ブランド条件、素材", aiRole: "複数の構図や表現を生成する", result: "比較用の画像案", humanCheck: "商標・人物・生成物の利用条件を確認" },
    { situation: "ベクター素材を試作する", prepare: "用途、形、色、納品形式", aiRole: "編集前提の素材案を作る", result: "デザイン工程へ渡す素材候補", humanCheck: "形状・色・書き出し品質を確認" },
    { situation: "短い映像・音声素材を作る", prepare: "台本、尺、掲載先、権利条件", aiRole: "生成モデルで素材案を作る", result: "編集前の候補素材", humanCheck: "クレジット消費と利用許諾を確認" },
  ],
  "canva-ai": [
    { situation: "SNS画像をテンプレートから作る", prepare: "投稿文、サイズ、ブランド素材", aiRole: "素材生成とレイアウト案を作る", result: "編集可能な投稿画像案", humanCheck: "文字切れ・権利・予約先を確認" },
    { situation: "説明資料のたたき台を作る", prepare: "目的、読者、元資料、枚数", aiRole: "構成とスライド案を組む", result: "編集可能な資料案", humanCheck: "数字・出典・ブランド表現を確認" },
    { situation: "複数サイズへ展開する", prepare: "元デザイン、掲載媒体、必要サイズ", aiRole: "レイアウト候補を各サイズへ調整する", result: "媒体別の候補デザイン", humanCheck: "重要要素の欠落と可読性を確認" },
  ],
  "leonardo-ai": [
    { situation: "商品の世界観を画像で探る", prepare: "用途、構図、色、避けたい表現", aiRole: "異なる方向性の画像案を作る", result: "方向性を比べる候補", humanCheck: "類似表現・権利・公開範囲を確認" },
    { situation: "生成画像を部分修正する", prepare: "元画像、直す箇所、残す要素", aiRole: "Realtime Canvas等で修正案を作る", result: "修正前後の候補", humanCheck: "意図しない変化と解像度を確認" },
    { situation: "作風の一貫性を試す", prepare: "許諾済み素材、用途、評価基準", aiRole: "モデルや設定を変えて候補を作る", result: "一貫性を比較できる画像群", humanCheck: "学習素材の権利と条件を確認" },
  ],
  midjourney: [
    { situation: "企画のビジュアル方向を決める", prepare: "テーマ、比率、雰囲気、禁止要素", aiRole: "複数のコンセプト画像を生成する", result: "方向性を選ぶための候補", humanCheck: "権利・公開設定・利用目的を確認" },
    { situation: "構図や作風を詰める", prepare: "選んだ案、残す要素、変更点", aiRole: "バリエーションと編集を重ねる", result: "比較できる改良案", humanCheck: "人物・文字・細部を確認" },
    { situation: "好みに合う出力を検証する", prepare: "評価用の同一プロンプトと基準", aiRole: "設定をそろえて候補を生成する", result: "選択傾向を比べる素材", humanCheck: "設定差と再現条件を記録" },
  ],
  ideogram: [
    { situation: "文字を含む画像案を作る", prepare: "入れる文言、比率、用途、雰囲気", aiRole: "文字とビジュアルを組み合わせる", result: "比較用の画像案", humanCheck: "表記・可読性・商標を確認" },
    { situation: "参照画像から別案を作る", prepare: "利用許諾済み画像、変更点、残す要素", aiRole: "Reference機能で方向違いを作る", result: "参照元と比較できる候補", humanCheck: "権利と意図しない類似を確認" },
    { situation: "一部だけ直して仕上げる", prepare: "元画像、修正範囲、完成条件", aiRole: "Edit機能で部分修正する", result: "修正版の候補", humanCheck: "文字・輪郭・クレジット消費を確認" },
  ],
  runway: [
    { situation: "静止画から短い映像を試す", prepare: "許諾済み画像、動き、尺、比率", aiRole: "画像をもとに動画案を生成する", result: "編集前の短い映像", humanCheck: "人物・素材の権利と破綻を確認" },
    { situation: "同じ場面の演出を比べる", prepare: "場面、カメラ、動き、評価基準", aiRole: "条件を変えて複数案を作る", result: "演出比較用のクリップ", humanCheck: "条件差と消費クレジットを記録" },
    { situation: "制作素材をまとめて扱う", prepare: "元素材、用途、出力条件", aiRole: "生成モデルと保存領域で候補を整理する", result: "編集工程へ渡す素材群", humanCheck: "保存容量・書き出し・API料金を確認" },
  ],
  pika: [
    { situation: "文章から短い動画案を作る", prepare: "場面、動き、尺、比率", aiRole: "text-to-videoで候補を生成する", result: "比較用の短い映像", humanCheck: "破綻・権利・クレジットを確認" },
    { situation: "画像に動きを付ける", prepare: "許諾済み画像、動かす箇所、避けたい変化", aiRole: "image-to-videoで動きの案を作る", result: "元画像からの動画候補", humanCheck: "人物と細部の変化を確認" },
    { situation: "映像内の要素を変える", prepare: "元映像、追加・交換する要素", aiRole: "追加・差し替え機能で案を作る", result: "変更前後の比較映像", humanCheck: "境界・意味の変化・利用条件を確認" },
  ],
  heygen: [
    { situation: "説明動画を撮影せず試作する", prepare: "台本、対象者、尺、掲載先", aiRole: "アバターと音声で動画案を作る", result: "説明動画のたたき台", humanCheck: "内容・人物表現・書き出し条件を確認" },
    { situation: "既存動画を別言語へ展開する", prepare: "権利を持つ動画、対象言語、固有名詞", aiRole: "翻訳と音声同期の候補を作る", result: "確認用の翻訳動画", humanCheck: "訳・口の動き・文化的表現を確認" },
    { situation: "声やアバターの利用を検討する", prepare: "本人同意、用途、公開範囲", aiRole: "許可された素材から試作品を作る", result: "運用可否を判断する動画", humanCheck: "本人確認・同意・プラン条件を確認" },
  ],
  synthesia: [
    { situation: "社内研修を動画にする", prepare: "研修原稿、対象者、確認担当", aiRole: "テンプレートとアバターで構成する", result: "研修動画のたたき台", humanCheck: "社内情報・正確性・公開範囲を確認" },
    { situation: "手順書を短い説明動画にする", prepare: "手順、画面素材、注意事項", aiRole: "台本と場面を組み立てる", result: "手順説明の動画案", humanCheck: "操作手順と画面の最新性を確認" },
    { situation: "多言語版を試作する", prepare: "原稿、対象言語、用語集", aiRole: "翻訳・吹き替え候補を作る", result: "言語別の確認用動画", humanCheck: "訳・発音・地域表現を確認" },
  ],
  elevenlabs: [
    { situation: "記事のナレーションを作る", prepare: "台本、読み方、利用許諾", aiRole: "音声を生成し、発音を調整する", result: "確認用ナレーション", humanCheck: "固有名詞・声の権利・公開条件を確認" },
    { situation: "音声を文字に起こす", prepare: "権利を持つ音声、話者、用途", aiRole: "発話を文字へ変換する", result: "編集前の文字起こし", humanCheck: "聞き間違いと個人情報を確認" },
    { situation: "動画を吹き替える", prepare: "権利を持つ動画、対象言語、用語集", aiRole: "翻訳と吹き替え音声を作る", result: "確認用の多言語音声", humanCheck: "同意・訳・同期・商用条件を確認" },
  ],
  manus: [
    { situation: "複数工程の調査をまとめる", prepare: "目的、対象、出典条件、禁止操作", aiRole: "計画し、調査と成果物作成を進める", result: "調査メモと成果物", humanCheck: "出典・外部操作・費用を確認" },
    { situation: "資料から成果物を作る", prepare: "資料、完成形式、品質条件", aiRole: "サンドボックス内で作業を分解する", result: "確認可能なファイル", humanCheck: "内容・ファイル・共有範囲を確認" },
    { situation: "定型作業の自動化候補を探す", prepare: "現行手順、例外、承認境界", aiRole: "工程を整理して試行する", result: "自動化可能範囲と記録", humanCheck: "例外処理と停止方法を確認" },
  ],
  "openai-agents-api": [
    { situation: "長時間の処理を製品へ組み込む", prepare: "要件、sandbox、停止・承認条件", aiRole: "セッションとツールの流れを実行する", result: "開発用の実行結果", humanCheck: "token・tool費用と外部操作を確認" },
    { situation: "ツールを使うエージェントを試す", prepare: "API設計、許可ツール、評価データ", aiRole: "必要なツールを選んで処理する", result: "検証ログと成果物", humanCheck: "権限・入力データ・失敗時動作を確認" },
    { situation: "作業をサブエージェントへ分ける", prepare: "役割、共有情報、完了条件", aiRole: "タスクを分割して統合する", result: "統合された処理結果", humanCheck: "重複・漏れ・費用上限を確認" },
  ],
  deepseek: [
    { situation: "画像理解をAPIで試す", prepare: "権利を持つ画像、質問、正解例", aiRole: "画像と質問から応答を返す", result: "評価用のAPI出力", humanCheck: "誤認・データ送信先・契約条件を確認" },
    { situation: "対話APIの適合性を比べる", prepare: "同一の質問、期待形式、評価基準", aiRole: "条件をそろえて応答を生成する", result: "比較可能な出力", humanCheck: "API版・アプリ版・モデル名を区別" },
    { situation: "既存処理からの移行を検討する", prepare: "現行API、必要機能、地域条件", aiRole: "互換性の確認項目を整理する", result: "移行前チェックリスト", humanCheck: "日本向け契約・保存・料金を確認" },
  ],
  qwen: [
    { situation: "長い資料をAPIで扱う", prepare: "資料、質問、期待する根拠形式", aiRole: "長い入力から回答候補を作る", result: "評価用の要約と回答", humanCheck: "抜け・引用・API snapshotを確認" },
    { situation: "画像を含む入力を検証する", prepare: "画像、質問、正解例", aiRole: "画像と文章をまとめて処理する", result: "比較可能な応答", humanCheck: "画像の権利と読み取り誤りを確認" },
    { situation: "ツール連携を試作する", prepare: "許可ツール、入出力、停止条件", aiRole: "必要なツールを選び結果を返す", result: "検証ログと出力", humanCheck: "権限・副作用・費用を確認" },
  ],
  kimi: [
    { situation: "長い資料から論点を抽出する", prepare: "資料、質問、必要な引用", aiRole: "長い文脈を読み、論点を整理する", result: "要約と確認箇所", humanCheck: "引用位置と抜けを原文照合" },
    { situation: "画像を含む会話APIを試す", prepare: "画像、質問、評価用の正解", aiRole: "複数形式の入力へ応答する", result: "評価用のAPI出力", humanCheck: "読み取り・データ取扱いを確認" },
    { situation: "エージェント試作へ組み込む", prepare: "役割、ツール、完了・停止条件", aiRole: "会話とツール利用を進める", result: "試作の実行結果", humanCheck: "権限・費用・一般アプリとの差を確認" },
  ],
  genspark: [
    { situation: "企画書のたたき台を作る", prepare: "目的、相手、元資料、枚数", aiRole: "構成とスライド案を生成する", result: "編集できる資料案", humanCheck: "数字・出典・論理の流れを確認" },
    { situation: "既存資料をスライドへ整理する", prepare: "文書、残す情報、デザイン条件", aiRole: "章立てと各ページへ再構成する", result: "確認用プレゼン", humanCheck: "要点の欠落と引用を確認" },
    { situation: "生成後の構成を直す", prepare: "資料案、変更理由、対象者", aiRole: "順序・文章・レイアウトを編集する", result: "修正版の資料", humanCheck: "意図とブランド表現を確認" },
  ],
  writesonic: [
    { situation: "AI検索での言及を観測する", prepare: "ブランド、質問群、対象地域・期間", aiRole: "複数AI上の表示を追跡する", result: "言及・引用の観測結果", humanCheck: "対象範囲と指標定義を確認" },
    { situation: "競合との差を探す", prepare: "比較対象、質問群、判断軸", aiRole: "回答内の扱いを整理する", result: "差分と改善候補", humanCheck: "順位・言及・引用を混同しない" },
    { situation: "コンテンツ不足を特定する", prepare: "対象ページ、質問、観測期間", aiRole: "参照状況から不足テーマを整理する", result: "更新候補の一覧", humanCheck: "検索需要と因果関係を別に確認" },
  ],
};
