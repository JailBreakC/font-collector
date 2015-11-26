# font-collector 集字

[![npm version](https://badge.fury.io/js/font-collector.svg)](http://badge.fury.io/js/font-collector)

字体库分割工具, 自动解析html、js等文件中的中文，按需压缩生成web所用格式字体文件

# 安装

    npm install font-collector -g

# 功能

- 支持从html、js等任何文本文件中提取中文字符 支持utf-8、gbk编码

- 自动切分压缩(ttf格式)字体文件，导出到指定目录

- 支持导出四种浏览器主流字体 (ttf, eot, woff, svg)

# 使用

## 命令行：

    font-collector -h

        Usage: font-collector [options] <file or dir ...>

    Options:

        -h, --help               output usage information
        -V, --version            output the version number

        // 含中文文件的文件路径或者文件夹
        -s, --source <path or file>      character file path or dir

        // ttf字体文件路径
        -f, --font <path>        origin font file path

        // 输出字体的文件路径
        -o, --output <filepath>  filepath to output font files

### 示例命令：

    $ font-collector -f test/lib/handfont.ttf -s test/index.html -o test/fonts/handfont

### 生成结果如下

```
font-collector/
└── test/
    ├── fonts/
    │   ├── handfont.eot
    │   ├── handfont.svg
    │   ├── handfont.ttf
    │   ├── handfont.woff
    ├── lib/
    │   └── handfont.ttf 
    └──index.html

```

## 配置文件：

`推荐` 可以使用配置文件的方式保存配置，方便构建。配置文件默认名称为 `font.config.json` 放在工程根目录。

执行 `font-collector` 命令会自动读取当前目录下的配置文件。配置文件格式如下：

    
    {
        "source": {
            "path": ["pattern", "another/pattern"],
            "ignore": ["ignore/pattern", "another/ignore/pattern"]
        },

        "font": "origin/font/path",

        "output": "output/fonts/path"
    }

source.path : 含中文字符文件目录，字符串或者数组，支持路径通配符;

source.ignore : （可选) 不想被匹配的文件目录，字符串或者数组，支持路径通配符;

font: 字体源文件路径;

output: 输出字体文件路径; ps: 需指定文件名并且不带后缀;
例：fonts/myfont; 会生成 fonts/myfont.eot | svg | ttf | woff四种字体

### 示例配置文件:

搜索app文件夹下所有文件

    {
        "source": {
            "path": "app/**/*",
        },

        "font": "./lib/handfont.ttf",

        "output": "./fonts/handfont"
    }

搜索当前目录所有文件，不包括fonts文件夹中文件，不包括lib文件夹中.tff文件

    {
        "source": {
            "path": "**/*",
            "ignore": ["fonts/*", "lib/*.ttf"]
        },

        "font": "./lib/handfont.ttf",

        "output": "./fonts/handfont"
    }



## 字体兼容性

| 格式      | IE   | Firefox | Chrome | Safari | Opera | iOS Safari | Android Browser | Chrome for Android | 
| ------- | ---- | ------- | ------ | ------ | ----- | ---------- | --------------- | ------------------ | 
| `.eot`  | 6    | --      | --     | --     | --    | --         | --              | --                 | 
| `.woff` | 9    | 3.6     | 5      | 5.1    | 11.1  | 5.1        | 4.4             | 36                 | 
| `.ttf`  | --   | 3.5     | 4      | 3.1    | 10.1  | 4.3        | 2.2             | 36                 | 
| `.svg`  | --   | --      | 4      | 3.2    | 9.6   | 3.2        | 3               | 36                 | 

##  thanks

> <https://github.com/purplebamboo/font-carrier> 提供字体底层操作支持