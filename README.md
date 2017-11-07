# Desktop Wiki

Desktop Wiki is an [Electron](https://github.com/electron/electron) application very similar to Wikipedia. Instead of storing data on a server somewhere, it is all stored locally in a JSON file.

## Features

### Current

* Articles with Wikipedia-like syntax formatting
* Categories to organize articles

### Planned

* Info boxes, embedded images (w/ captions)
* Expanded article features including sub-articles
* Lists and tables eventually
* Ability to add modules to customize application
* Rich text editor

## Syntax

### Basic Formatting

The formatting syntax is very similar to Wikipedia's syntax with some changes. Instead of `<s>` and `<u>` for strikethrough and underlining it is `~~` and `__` respectively.

Input | Output
--- | ---
`''Italics''` | _Italics_
`'''Bold'''` | __Bold__
`'''''Italics Bold'''''` | ___Italics Bold___
`~~Strike~~` | ~~Strike~~
`__Underline__` | Underline

Headers can also be achieved by using `==`, `===`, `====` around the header name. So `==Header 2==` would be a subsection of the article and also have a rule under it. Header sizes 3 and 4 are merely bolded and larger. Header 1 is reserved for the article title and isn't processed at all. 5 and 6 are unused as of now and will also not be processed.

### Links

Link types are divided into two different types: internal and external. Internal links only link to articles within the application itself. These are only used for other articles in the wiki. External links can be used to link to actual websites outside of the program. Internal links can be renamed by using the `|` character. External links only require a space after the website URL.

Input | Output
--- | ---
`[Internal Link]` | [Internal Link](https://github.com/jakh1310/dwiki)
`[Internal Link \| Link]` | [Link](https://github.com/jakh1310/dwiki)
`[[https://google.com]]` | https://google.com
`[[https://google.com External Link]]` | [External Link](https://google.com)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
