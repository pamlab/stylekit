fe-stylekit
===========

Frontend Stylekit base on PostCSS.

![image](https://raw.githubusercontent.com/pamlab/fe-stylekit/images/img_01.png)


## Install

`$ npm install -g @pamlab/stylekit`


## Usage

`$ stylekit`

|Name|Type|Default|Description|
|:---|:--:|:-----:|:----------|
|`-i, --input`|`{String}`|`src/css`|Input Directory|
|`-o, --output`|`{String}`|`css`|Output Directory|
|`-t, --target`|`pc or sp`|`all`|Target Device|


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
| [color() function](https://drafts.csswg.org/css-color/#modifying-colors) | [postcss-color-function](https://github.com/postcss/postcss-color-function) |


## Structure

```bash
.
├── src
│   └── css
│       └── xxx.css  # Input styles
└── css
    └── xxx.css       # Output styles
```

Enjoy Coding!!
