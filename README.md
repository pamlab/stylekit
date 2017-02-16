fe-stylekit
===========

Frontend Stylekit base on PostCSS.

![image](https://raw.githubusercontent.com/pamlab/fe-stylekit/images/img_01.png)

## Fearute

src/cssの中の.cssを色々やってcssフォルダへコンパイルし排出します。

| Spec | Plugin |
|:---|:---|
| Automatic Vendor Prefixes | [autoprefixer](https://github.com/postcss/autoprefixer) |
| [CSS Variables](https://www.w3.org/TR/css-variables/) | [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties) |
| [CSS @apply Rule](http://tabatkins.github.io/specs/css-apply-rule/) | [postcss-custom-properties](https://github.com/pascalduez/postcss-apply)  | 
| [CSS Nesting](http://tabatkins.github.io/specs/css-nesting/) | [postcss-nesting](https://github.com/jonathantneal/postcss-nesting) |
| [Custom Media Queries](https://www.w3.org/TR/2016/WD-mediaqueries-4-20160126/#custom-mq) | [postcss-custom-media](https://github.com/postcss/postcss-custom-media) |
| [Pseudo-class :any-link](https://drafts.csswg.org/selectors/#any-link-pseudo) | [postcss-pseudo-class-any-link](https://github.com/jonathantneal/postcss-pseudo-class-any-link) |


## Structure

```bash
.
├── postcss.json      # PostCSS tasks
├── package.json      # Set npm script
├── src
│   └── css
│       └── xxx.css  # Input styles
└── css
    └── xxx.css       # Output styles
```


## Usage

### SetUp

1. [ダウンロード](https://github.com/pamlab/fe-stylekit/releases)したファイルをプロジェクトルートへ配置
2. install.bat を実行。モジュールのインストールが完了するのを待つ

> install.bat の実行は初回のみでOKです。

### Start

1. `Shift + 右クリック` でコンテキストメニューを開き、「コマンドプロンプトをここで開く」を選択
2. `npm start` を入力し、src/cssフォルダ内のcssファイルの監視を開始
3. src/cssフォルダ内のcssファイルを編集し、保存後正しくcssフォルダへコンパイルされていることを確認


Enjoy Coding!!