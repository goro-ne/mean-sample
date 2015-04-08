# Install MEAN for Mac

---

### MEAN環境の構築



#### Homebrew/npmの環境構築

1. Homebrewのバージョン確認

```
$ brew -v
Homebrew 0.9.5
```

2. Homebrewがインストールされていない場合

http://applefriend.blog.jp/archives/1013473847.html

3. Homebrew/npmの動作確認
（特にYosemiteにアップグレードした方）

```
$ cd $(brew --repository)
$ git status
エラーが出ているファイルは
$ git checkout master [ファイルパス]

$ git pull -q origin refs/heads/master:refs/remotes/origin/master
$ brew doctor
Your system is ready to brew.
$ brew update
Already up-to-date.
```

4. treeのインストール

```
brew install tree
```

5. node.jsのインストール

```
$ brew uninstall node.js
$ brew install node.js
$ brew link --overwrite --dry-run node
/usr/local/bin/node
/usr/local/lib/dtrace/node.d
$ node -v
v0.10.31
$ npm -v
2.7.1
```

6. npmパッケージのパーミッション変更
(とても重要)

```
$ echo $USER
g-hayakawa
$ sudo chown -R $USER /Users/$USER/.npm
$ sudo chown -R $USER /usr/local/lib/node_modules
```

#### Yeoman/Gulp/Bowerのインストール

```
$ npm install -g bower
$ npm install -g yo

   :
[Yeoman Doctor] Everything looks alright!
(Yeomanのインストールに成功した場合はグリーンの文字で表示される)
   :
```

#### Grunt-cliのインストール

```
$ npm install -g grunt-cli
```



### GitHubにアカウント、レポジトリ作成

初回はGitHubにレポジトリ作成する
例）
https://github.com/hayao56/mean-sample.git


### 作業ディレクトリの作成

```
$ mkdir -p ~/repos && cd $_
```

Gitクローンでソースを取得

```
$ git clone https://github.com/hayao56/mean-sample.git
```

```
$ mkdir -p ~/repos/mean-sample && cd $_
```


初回のみ Yeoman-generatorでプロビショニングを実行する

```
$ npm install generator-angular-fullstack
```

```
$ yo angular-fullstack sample

     _-----_
    |       |    .--------------------------.
    |--(o)--|    |    Welcome to Yeoman,    |
   `---------´   |   ladies and gentlemen!  |
    ( _´U`_ )    '--------------------------'
    /___A___\
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `

 ? Existing .yo-rc configuration found, would you like to use it? (Y/n) Y
 既存ソースが存在する場合は Y でスキップする

以下、すべてのコンフリクトについて、既存ファイルを上書きしない

 conflict Gruntfile.js
? Overwrite Gruntfile.js? (Ynaxdh) n

conflict bower.json
? Overwrite bower.json? (Ynaxdh) n

conflict package.json
? Overwrite package.json? (Ynaxdh) n

conflict client/app/app.js
? Overwrite client/app/app.js? (Ynaxdh) n

conflict client/app/main/main.html
? Overwrite client/app/main/main.html? (Ynaxdh) n

conflict client/app/main/main.js
? Overwrite client/app/main/main.js? (Ynaxdh) n

conflict client/app/main/main.controller.js
? Overwrite client/app/main/main.controller.js? (Ynaxdh) n

conflict client/app/main/main.controller.spec.js
? Overwrite client/app/main/main.controller.spec.js? (Ynaxdh) n

conflict client/components/modal/modal.service.js
? Overwrite client/components/modal/modal.service.js? (Ynaxdh) n

conflict client/components/navbar/navbar.html
? Overwrite client/components/navbar/navbar.html? (Ynaxdh) n

conflict client/components/navbar/navbar.controller.js
? Overwrite client/components/navbar/navbar.controller.js? (Ynaxdh) n

conflict client/components/socket/socket.service.js
? Overwrite client/components/socket/socket.service.js? (Ynaxdh) n

conflict client/favicon.ico
? Overwrite client/favicon.ico? (Ynaxdh) n

conflict client/index.html
? Overwrite client/index.html? (Ynaxdh) n

conflict server/config/environment/index.js
? Overwrite server/config/environment/index.js? (Ynaxdh) n

conflict server/config/seed.js
? Overwrite server/config/seed.js? (Ynaxdh) n
```




#### MongoDBのインストール

```
brew install mongodb

    :
To have launchd start mongodb at login:
    ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents
Then to load mongodb now:
    launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
Or, if you don't want/need launchctl, you can just run:
    mongod --config /usr/local/etc/mongod.conf
    :
```


### MongoDBサーバ起動


DBディレクトリ作成
```
$ mkdir -p ./data/db
```

Gitの設定追加
```
$ touch ./data/db/.gitkeep
echo "data/db/_tmp" >> .gitignore
echo "data/db/journal" >> .gitignore
echo "data/db/local*" >> .gitignore
echo "data/db/mongod*" >> .gitignore
echo "data/db/storage*" >> .gitignore
```

起動コマンド
```
$ mongod --bind_ip 127.0.0.1 --logappend --dbpath ./data/db > /dev/null &
```



起動確認
```
$ ps aux|grep mongo
g-hayakawa      18247   0.1  0.6  2717460  51524   ??  S     5:16PM   0:04.48 /usr/local/opt/mongodb/bin/mongod --config /usr/local/etc/mongod.conf
g-hayakawa      21252   0.0  0.0  2432772    640 s000  S+    5:48PM   0:00.00 grep mongo
```


```
mongo
MongoDB shell version: 3.0.1
connecting to: test
Server has startup warnings:
2015-03-24T17:16:09.305+0900 I CONTROL  [initandlisten]
2015-03-24T17:16:09.305+0900 I CONTROL  [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
> show dbs
local  0.078GB

> exit

```




### Gruntタスク実行

```
$ grunt
Running "newer:jshint" (newer) task

Running "newer:jshint:server" (newer) task

Running "jshint:server" (jshint) task

✔ No problems


Running "newer-postrun:jshint:server:1:/Users/g-hayakawa/repos/mean-sample/node_modules/grunt-newer/.cache" (newer-postrun) task

Running "newer:jshint:serverTest" (newer) task

Running "jshint:serverTest" (jshint) task

✔ No problems


Running "newer-postrun:jshint:serverTest:2:/Users/g-hayakawa/repos/mean-sample/node_modules/grunt-newer/.cache" (newer-postrun) task

Running "newer:jshint:all" (newer) task

Running "jshint:all" (jshint) task

✔ No problems


Running "newer-postrun:jshint:all:3:/Users/g-hayakawa/repos/mean-sample/node_modules/grunt-newer/.cache" (newer-postrun) task

Running "newer:jshint:test" (newer) task

Running "jshint:test" (jshint) task

✔ No problems


Running "newer-postrun:jshint:test:4:/Users/g-hayakawa/repos/mean-sample/node_modules/grunt-newer/.cache" (newer-postrun) task

Running "test" task

Running "test:server" (test) task

Running "env:all" (env) task

Running "env:test" (env) task

Running "mochaTest:src" (mochaTest) task


Express server listening on 9000, in test mode
  GET /api/things
GET /api/things 200 17ms - 2b
    ✓ should respond with JSON array


  1 passing (39ms)


Running "test:client" (test) task

Running "clean:server" (clean) task

Running "env:all" (env) task

Running "concurrent:test" (concurrent) task

Running "injector:scripts" (injector) task
Missing option `template`, using `dest` as template instead
Injecting js files (5 files)

Running "injector:css" (injector) task
Missing option `template`, using `dest` as template instead
Injecting css files (3 files)

Running "autoprefixer:dist" (autoprefixer) task

Running "karma:unit" (karma) task
INFO [karma]: Karma v0.12.31 server started at http://localhost:8080/
INFO [launcher]: Starting browser PhantomJS
WARN [watcher]: Pattern "/Users/g-hayakawa/repos/mean-sample/client/bower_components/angular-route/angular-route.js" does not match any file.
WARN [watcher]: Pattern "/Users/g-hayakawa/repos/mean-sample/client/app/app.coffee" does not match any file.
WARN [watcher]: Pattern "/Users/g-hayakawa/repos/mean-sample/client/app/**/*.coffee" does not match any file.
WARN [watcher]: Pattern "/Users/g-hayakawa/repos/mean-sample/client/components/**/*.coffee" does not match any file.
WARN [watcher]: Pattern "/Users/g-hayakawa/repos/mean-sample/client/app/**/*.jade" does not match any file.
WARN [watcher]: Pattern "/Users/g-hayakawa/repos/mean-sample/client/components/**/*.jade" does not match any file.
INFO [PhantomJS 1.9.8 (Mac OS X)]: Connected on socket VilbeArYbMSMiNa5VVc1 with id 94672548
PhantomJS 1.9.8 (Mac OS X): Executed 1 of 1 SUCCESS (0.02 secs / 0.05 secs)

Running "clean:dist" (clean) task

Running "concurrent:dist" (concurrent) task

    Running "svgmin:dist" (svgmin) task
    Total saved: 0 B

    Done, without errors.


    Execution Time (2015-03-24 10:30:47 UTC)
    loading tasks  761ms  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 47%
    svgmin:dist    847ms  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 53%
    Total 1.6s

    Running "imagemin:dist" (imagemin) task
    ✔ client/assets/images/yeoman.png (saved 3.73 kB - 30%)
    Minified 1 image (saved 3.73 kB)

    Done, without errors.


    Execution Time (2015-03-24 10:30:47 UTC)
    loading tasks   2.8s  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 92%
    imagemin:dist  252ms  ▇▇▇▇ 8%
    Total 3.1s

Running "injector:scripts" (injector) task
Missing option `template`, using `dest` as template instead
Injecting js files (5 files)
>> Nothing changed

Running "injector:css" (injector) task
Missing option `template`, using `dest` as template instead
Injecting css files (3 files)
>> Nothing changed

Running "wiredep:target" (wiredep) task

Running "useminPrepare:html" (useminPrepare) task
Going through client/index.html to update the config
Looking for build script HTML comment blocks

Configuration is now:

  concat:
  { generated:
   { files:
      [ { dest: '.tmp/concat/app/vendor.css',
          src:
           [ 'client/bower_components/bootstrap/dist/css/bootstrap.css',
             'client/bower_components/font-awesome/css/font-awesome.css' ] },
        { dest: '.tmp/concat/app/app.css',
          src:
           [ '{.tmp,client}/app/app.css',
             '{.tmp,client}/app/app.css',
             '{.tmp,client}/app/main/main.css',
             '{.tmp,client}/components/modal/modal.css' ] },
        { dest: '.tmp/concat/app/vendor.js',
          src:
           [ '{client,node_modules}/bower_components/jquery/dist/jquery.js',
             '{client,node_modules}/bower_components/angular/angular.js',
             '{client,node_modules}/bower_components/angular-resource/angular-resource.js',
             '{client,node_modules}/bower_components/angular-cookies/angular-cookies.js',
             '{client,node_modules}/bower_components/angular-sanitize/angular-sanitize.js',
             '{client,node_modules}/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
             '{client,node_modules}/bower_components/lodash/dist/lodash.compat.js',
             '{client,node_modules}/bower_components/angular-socket-io/socket.js',
             '{client,node_modules}/bower_components/angular-ui-router/release/angular-ui-router.js',
             '{client,node_modules}/socket.io-client/socket.io.js' ] },
        { dest: '.tmp/concat/app/app.js',
          src:
           [ '{.tmp,client}/app/app.js',
             '{.tmp,client}/app/main/main.controller.js',
             '{.tmp,client}/app/main/main.js',
             '{.tmp,client}/components/modal/modal.service.js',
             '{.tmp,client}/components/navbar/navbar.controller.js',
             '{.tmp,client}/components/socket/socket.service.js' ] } ] } }

  uglify:
  { generated:
   { files:
      [ { dest: 'dist/public/app/vendor.js',
          src: [ '.tmp/concat/app/vendor.js' ] },
        { dest: 'dist/public/app/app.js',
          src: [ '.tmp/concat/app/app.js' ] } ] } }

  cssmin:
  { generated:
   { files:
      [ { dest: 'dist/public/app/vendor.css',
          src: [ '.tmp/concat/app/vendor.css' ] },
        { dest: 'dist/public/app/app.css',
          src: [ '.tmp/concat/app/app.css' ] } ] } }

Running "autoprefixer:dist" (autoprefixer) task

Running "ngtemplates:main" (ngtemplates) task
File .tmp/templates.js created.
Added .tmp/templates.js to <!-- build:js app/app.js -->

Running "ngtemplates:tmp" (ngtemplates) task
>> No templates found
File .tmp/tmp-templates.js created.
Added .tmp/tmp-templates.js to <!-- build:js app/app.js -->

Running "concat:generated" (concat) task
File .tmp/concat/app/vendor.css created.
File .tmp/concat/app/app.css created.
File .tmp/concat/app/vendor.js created.
File .tmp/concat/app/app.js created.

Running "ngAnnotate:dist" (ngAnnotate) task
>> 2 files successfully generated.

Running "copy:dist" (copy) task
Created 62 directories, copied 355 files

Running "cdnify:dist" (cdnify) task
Going through dist/public/index.html to update script refs
✔ bower_components/jquery/dist/jquery.js changed to //ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
✔ bower_components/angular/angular.js changed to //ajax.googleapis.com/ajax/libs/angularjs/1.4.0-beta.2/angular.min.js
✔ bower_components/angular-cookies/angular-cookies.js changed to //ajax.googleapis.com/ajax/libs/angularjs/1.4.0-beta.2/angular-cookies.min.js
✔ bower_components/angular-resource/angular-resource.js changed to //ajax.googleapis.com/ajax/libs/angularjs/1.4.0-beta.2/angular-resource.min.js
✔ bower_components/angular-sanitize/angular-sanitize.js changed to //ajax.googleapis.com/ajax/libs/angularjs/1.4.0-beta.2/angular-sanitize.min.js

Running "cssmin:generated" (cssmin) task
File dist/public/app/vendor.css created: 149.97 kB → 122.93 kB
File dist/public/app/app.css created: 2.34 kB → 1.93 kB

Running "uglify:generated" (uglify) task
File dist/public/app/vendor.js created: 2.02 MB → 432.83 kB
File dist/public/app/app.js created: 8.85 kB → 4.69 kB

Running "rev:dist" (rev) task
dist/public/app/app.js >> 2a7b82d7.app.js
dist/public/app/vendor.js >> 853abd93.vendor.js
dist/public/app/app.css >> 8fcadfa2.app.css
dist/public/app/vendor.css >> 56d0d3f6.vendor.css
dist/public/assets/images/yeoman.png >> d535427a.yeoman.png

Running "usemin:html" (usemin) task

Processing as HTML - dist/public/index.html
Update the HTML to reference our concat/min/revved script files
<script src="app/vendor.js" changed to <script src="app/853abd93.vendor.js"
<script src="app/app.js" changed to <script src="app/2a7b82d7.app.js"
Update the HTML with the new css filenames
<link rel="stylesheet" href="app/vendor.css" changed to <link rel="stylesheet" href="app/56d0d3f6.vendor.css"
<link rel="stylesheet" href="app/app.css" changed to <link rel="stylesheet" href="app/8fcadfa2.app.css"
Update the HTML with the new img filenames
Update the HTML with data-main tags
Update the HTML with data-* tags
Update the HTML with background imgs, case there is some inline style
Update the HTML with anchors images
Update the HTML with reference in input

Running "usemin:css" (usemin) task

Processing as CSS - dist/public/app/56d0d3f6.vendor.css
Update the CSS to reference our revved images

Processing as CSS - dist/public/app/8fcadfa2.app.css
Update the CSS to reference our revved images

Running "usemin:js" (usemin) task

Processing as JS - dist/public/app/2a7b82d7.app.js
Update the JS to reference our revved images
assets/images/yeoman.png changed to assets/images/d535427a.yeoman.png

Processing as JS - dist/public/app/853abd93.vendor.js
Update the JS to reference our revved images

Done, without errors.


Execution Time (2015-03-24 10:30:16 UTC)
mochaTest:src       4.3s  ▇▇▇▇▇ 7%
injector:css        1.3s  ▇▇ 2%
autoprefixer:dist   1.7s  ▇▇ 3%
karma:unit         22.6s  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 37%
concurrent:dist     3.4s  ▇▇▇▇ 6%
wiredep:target      2.7s  ▇▇▇ 4%
ngAnnotate:dist     1.2s  ▇▇ 2%
copy:dist           5.8s  ▇▇▇▇▇▇▇ 10%
cdnify:dist         9.5s  ▇▇▇▇▇▇▇▇▇▇▇ 16%
cssmin:generated   666ms  ▇ 1%
uglify:generated    5.6s  ▇▇▇▇▇▇▇ 9%
Total 1m 1s
```





### Expressサーバ起動

```
$ grunt serve
Running "serve" task

Running "clean:server" (clean) task
Cleaning .tmp...OK

Running "env:all" (env) task

Running "concurrent:server" (concurrent) task

Running "injector:scripts" (injector) task
Missing option `template`, using `dest` as template instead
Injecting js files (5 files)
>> Nothing changed

Running "injector:css" (injector) task
Missing option `template`, using `dest` as template instead
Injecting css files (3 files)
>> Nothing changed

Running "wiredep:target" (wiredep) task

Running "autoprefixer:dist" (autoprefixer) task

Running "express:dev" (express) task
Starting background Express server
debugger listening on port 5858
Express server listening on 9000, in development mode

Running "wait" task
>> Waiting for server reload...
Done waiting!

Running "open:server" (open) task

Running "watch" task
Waiting...
[undefined:undefined] CONNECTED
GET /api/things 200 8ms

```

自動でデフォルトブラウザが起動します
http://localhost:9000/




### アプリ編集

Finderの検索窓で「repos」で検索、
mean-sampleフォルダをSublime-text3または、Atomにドラッグアンドドロップして編集

srcディレクトリを編集します



以上です。





------------------------------------------------------------------------------
以降は初回プロビショニング時のログ
```
$ yo angular-fullstack sampleapp

     _-----_
    |       |    .--------------------------.
    |--(o)--|    |    Welcome to Yeoman,    |
   `---------´   |   ladies and gentlemen!  |
    ( _´U`_ )    '--------------------------'
    /___A___\
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `
 Out of the box I create an AngularJS app with an Express server.

 # Client

? What would you like to write scripts with? (Use arrow keys)
❯ JavaScript
   CoffeeScript
? What would you like to write markup with? (Use arrow keys)
❯ HTML
  Jade
? What would you like to write stylesheets with?
❯ CSS
  Sass
  Stylus
  Less
? What Angular router would you like to use? (Use arrow keys)
  ngRoute
❯ uiRouter
? Would you like to include Bootstrap? (Y/n) Yes
? Would you like to include UI Bootstrap? Yes

# Server

? Would you like to use mongoDB with Mongoose for data modeling? (Y/n) Yes
? Would you scaffold out an authentication boilerplate? No
? Would you like to use socket.io? (Y/n) Yes
You're using the fantastic NgComponent generator.

Initializing yo-rc.json configuration.

   create .bowerrc
   create .buildignore
   create .editorconfig
   create .gitattributes
   create .travis.yml
   create Gruntfile.js
   create .gitignore
   create bower.json
   create package.json
   create client/.htaccess
   create client/.jshintrc
   create client/app/app.css
   create client/app/app.js
   create client/app/main/main.css
   create client/app/main/main.html
   create client/app/main/main.js
   create client/app/main/main.controller.js
   create client/app/main/main.controller.spec.js
   create client/assets/images/yeoman.png
   create client/components/modal/modal.css
   create client/components/modal/modal.html
   create client/components/modal/modal.service.js
   create client/components/navbar/navbar.html
   create client/components/navbar/navbar.controller.js
   create client/components/socket/socket.mock.js
   create client/components/socket/socket.service.js
   create client/favicon.ico
   create client/index.html
   create client/robots.txt
   create e2e/main/main.po.js
   create e2e/main/main.spec.js
   create karma.conf.js
   create protractor.conf.js
   create server/.jshintrc
   create server/.jshintrc-spec
   create server/api/thing/index.js
   create server/api/thing/thing.controller.js
   create server/api/thing/thing.model.js
   create server/api/thing/thing.socket.js
   create server/api/thing/thing.spec.js
   create server/app.js
   create server/components/errors/index.js
   create server/config/local.env.js
   create server/config/local.env.sample.js
   create server/config/environment/development.js
   create server/config/environment/index.js
   create server/config/environment/production.js
   create server/config/environment/test.js
   create server/config/express.js
   create server/config/seed.js
   create server/config/socketio.js
   create server/routes.js
   create server/views/404.html


I'm all done. Running bower install & npm install for you to install the required dependencies. If this fails, try running the command yourself.


bower cached        git://github.com/bestiejs/json3.git#3.3.2
bower validate      3.3.2 against git://github.com/bestiejs/json3.git#~3.3.1
bower cached        git://github.com/angular/bower-angular.git#1.3.15
bower validate      1.3.15 against git://github.com/angular/bower-angular.git#>=1.2.*
bower cached        git://github.com/es-shims/es5-shim.git#3.0.2
bower validate      3.0.2 against git://github.com/es-shims/es5-shim.git#~3.0.1
bower cached        git://github.com/angular/bower-angular-resource.git#1.3.15
bower validate      1.3.15 against git://github.com/angular/bower-angular-resource.git#>=1.2.*
bower cached        git://github.com/FortAwesome/Font-Awesome.git#4.3.0
bower validate      4.3.0 against git://github.com/FortAwesome/Font-Awesome.git#>=4.1.0
bower cached        git://github.com/lodash/lodash.git#2.4.1
bower validate      2.4.1 against git://github.com/lodash/lodash.git#~2.4.1
bower cached        git://github.com/angular-ui/bootstrap-bower.git#0.11.2
bower validate      0.11.2 against git://github.com/angular-ui/bootstrap-bower.git#~0.11.0
bower cached        git://github.com/angular/bower-angular-cookies.git#1.3.15
bower validate      1.3.15 against git://github.com/angular/bower-angular-cookies.git#>=1.2.*
bower cached        git://github.com/btford/angular-socket-io.git#0.6.1
bower validate      0.6.1 against git://github.com/btford/angular-socket-io.git#~0.6.0
bower cached        git://github.com/angular/bower-angular-sanitize.git#1.3.15
bower validate      1.3.15 against git://github.com/angular/bower-angular-sanitize.git#>=1.2.*
bower cached        git://github.com/jquery/jquery.git#1.11.2
bower validate      1.11.2 against git://github.com/jquery/jquery.git#~1.11.0
bower cached        git://github.com/twbs/bootstrap.git#3.1.1
bower validate      3.1.1 against git://github.com/twbs/bootstrap.git#~3.1.1
bower cached        git://github.com/angular/bower-angular-scenario.git#1.3.15
bower validate      1.3.15 against git://github.com/angular/bower-angular-scenario.git#>=1.2.*
bower cached        git://github.com/angular/bower-angular-mocks.git#1.3.15
bower validate      1.3.15 against git://github.com/angular/bower-angular-mocks.git#>=1.2.*
bower cached        git://github.com/angular-ui/ui-router.git#0.2.13
bower validate      0.2.13 against git://github.com/angular-ui/ui-router.git#~0.2.10
bower install       json3#3.3.2
bower install       es5-shim#3.0.2
bower install       font-awesome#4.3.0
bower install       angular#1.3.15
bower install       angular-socket-io#0.6.1
bower install       angular-bootstrap#0.11.2
bower install       lodash#2.4.1
bower install       angular-resource#1.3.15
bower install       angular-cookies#1.3.15
bower install       jquery#1.11.2
bower install       angular-scenario#1.3.15
bower install       angular-sanitize#1.3.15
bower install       angular-ui-router#0.2.13
bower install       bootstrap#3.1.1
bower install       angular-mocks#1.3.15


json3#3.3.2 client/bower_components/json3

es5-shim#3.0.2 client/bower_components/es5-shim

font-awesome#4.3.0 client/bower_components/font-awesome

angular#1.3.15 client/bower_components/angular

angular-socket-io#0.6.1 client/bower_components/angular-socket-io
└── angular#1.3.15

angular-bootstrap#0.11.2 client/bower_components/angular-bootstrap
└── angular#1.3.15

lodash#2.4.1 client/bower_components/lodash

angular-resource#1.3.15 client/bower_components/angular-resource
└── angular#1.3.15

angular-cookies#1.3.15 client/bower_components/angular-cookies
└── angular#1.3.15

jquery#1.11.2 client/bower_components/jquery

angular-scenario#1.3.15 client/bower_components/angular-scenario
└── angular#1.3.15

angular-sanitize#1.3.15 client/bower_components/angular-sanitize
└── angular#1.3.15

angular-ui-router#0.2.13 client/bower_components/angular-ui-router
└── angular#1.3.15

bootstrap#3.1.1 client/bower_components/bootstrap
└── jquery#1.11.2

angular-mocks#1.3.15 client/bower_components/angular-mocks
└── angular#1.3.15

> ws@0.5.0 install /Users/g-hayakawa/repos/mean-sample/node_modules/socket.io/node_modules/engine.io/node_modules/ws
> (node-gyp rebuild 2> builderror.log) || (exit 0)

  CXX(target) Release/obj.target/bufferutil/src/bufferutil.o
  SOLINK_MODULE(target) Release/bufferutil.node
  SOLINK_MODULE(target) Release/bufferutil.node: Finished
  CXX(target) Release/obj.target/validation/src/validation.o
  SOLINK_MODULE(target) Release/validation.node
  SOLINK_MODULE(target) Release/validation.node: Finished

> fsevents@0.3.5 install /Users/g-hayakawa/repos/mean-sample/node_modules/karma/node_modules/chokidar/node_modules/fsevents
> node-gyp rebuild

  SOLINK_MODULE(target) Release/.node
  SOLINK_MODULE(target) Release/.node: Finished
  CXX(target) Release/obj.target/fse/fsevents.o
  SOLINK_MODULE(target) Release/fse.node
  SOLINK_MODULE(target) Release/fse.node: Finished

> phantomjs@1.9.16 install /Users/g-hayakawa/repos/mean-sample/node_modules/karma-phantomjs-launcher/node_modules/phantomjs
> node install.js

Download already available at /var/folders/_p/9k8sddgn3n5fz0vnw8chnyg00000gw/T/phantomjs/phantomjs-1.9.8-macosx.zip
Extracting zip contents
Removing /Users/g-hayakawa/repos/mean-sample/node_modules/karma-phantomjs-launcher/node_modules/phantomjs/lib/phantom
Copying extracted folder /var/folders/_p/9k8sddgn3n5fz0vnw8chnyg00000gw/T/phantomjs/phantomjs-1.9.8-macosx.zip-extract-1427192160733/phantomjs-1.9.8-macosx -> /Users/g-hayakawa/repos/mean-sample/node_modules/karma-phantomjs-launcher/node_modules/phantomjs/lib/phantom
Writing location.js file
Done. Phantomjs binary available at /Users/g-hayakawa/repos/mean-sample/node_modules/karma-phantomjs-launcher/node_modules/phantomjs/lib/phantom/bin/phantomjs

> gifsicle@0.1.7 postinstall /Users/g-hayakawa/repos/mean-sample/node_modules/grunt-contrib-imagemin/node_modules/imagemin/node_modules/imagemin-gifsicle/node_modules/gifsicle
> node index.js

✔ pre-build test passed successfully!

> jpegtran-bin@0.2.8 postinstall /Users/g-hayakawa/repos/mean-sample/node_modules/grunt-contrib-imagemin/node_modules/imagemin/node_modules/imagemin-jpegtran/node_modules/jpegtran-bin
> node index.js


> pngquant-bin@0.3.5 postinstall /Users/g-hayakawa/repos/mean-sample/node_modules/grunt-contrib-imagemin/node_modules/imagemin/node_modules/imagemin-pngquant/node_modules/pngquant-bin
> node index.js

✔ pre-build test passed successfully!

> optipng-bin@0.3.11 postinstall /Users/g-hayakawa/repos/mean-sample/node_modules/grunt-contrib-imagemin/node_modules/imagemin/node_modules/imagemin-optipng/node_modules/optipng-bin
> node index.js

✔ pre-build test passed successfully!

> ws@0.4.31 install /Users/g-hayakawa/repos/mean-sample/node_modules/socket.io-client/node_modules/engine.io-client/node_modules/ws
> (node-gyp rebuild 2> builderror.log) || (exit 0)

  CXX(target) Release/obj.target/bufferutil/src/bufferutil.o
  SOLINK_MODULE(target) Release/bufferutil.node
  SOLINK_MODULE(target) Release/bufferutil.node: Finished
  CXX(target) Release/obj.target/validation/src/validation.o
  SOLINK_MODULE(target) Release/validation.node
  SOLINK_MODULE(target) Release/validation.node: Finished

> kerberos@0.0.9 install /Users/g-hayakawa/repos/mean-sample/node_modules/connect-mongo/node_modules/mongodb/node_modules/kerberos
> (node-gyp rebuild 2> builderror.log) || (exit 0)

  CXX(target) Release/obj.target/kerberos/lib/kerberos.o
  CXX(target) Release/obj.target/kerberos/lib/worker.o
  CC(target) Release/obj.target/kerberos/lib/kerberosgss.o
  CC(target) Release/obj.target/kerberos/lib/base64.o
  CXX(target) Release/obj.target/kerberos/lib/kerberos_context.o
  SOLINK_MODULE(target) Release/kerberos.node
  SOLINK_MODULE(target) Release/kerberos.node: Finished

> bson@0.2.21 install /Users/g-hayakawa/repos/mean-sample/node_modules/connect-mongo/node_modules/mongodb/node_modules/bson
> (node-gyp rebuild 2> builderror.log) || (exit 0)

  CXX(target) Release/obj.target/bson/ext/bson.o
  SOLINK_MODULE(target) Release/bson.node
  SOLINK_MODULE(target) Release/bson.node: Finished

> kerberos@0.0.9 install /Users/g-hayakawa/repos/mean-sample/node_modules/mongoose/node_modules/mongodb/node_modules/kerberos
> (node-gyp rebuild 2> builderror.log) || (exit 0)

  CXX(target) Release/obj.target/kerberos/lib/kerberos.o
  CXX(target) Release/obj.target/kerberos/lib/worker.o
  CC(target) Release/obj.target/kerberos/lib/kerberosgss.o
  CC(target) Release/obj.target/kerberos/lib/base64.o
  CXX(target) Release/obj.target/kerberos/lib/kerberos_context.o
  SOLINK_MODULE(target) Release/kerberos.node
  SOLINK_MODULE(target) Release/kerberos.node: Finished

> bson@0.2.21 install /Users/g-hayakawa/repos/mean-sample/node_modules/mongoose/node_modules/mongodb/node_modules/bson
> (node-gyp rebuild 2> builderror.log) || (exit 0)

  CXX(target) Release/obj.target/bson/ext/bson.o
  SOLINK_MODULE(target) Release/bson.node
  SOLINK_MODULE(target) Release/bson.node: Finished

> ws@0.4.32 install /Users/g-hayakawa/repos/mean-sample/node_modules/karma/node_modules/socket.io/node_modules/socket.io-client/node_modules/ws
> (node-gyp rebuild 2> builderror.log) || (exit 0)

  CXX(target) Release/obj.target/bufferutil/src/bufferutil.o
  SOLINK_MODULE(target) Release/bufferutil.node
  SOLINK_MODULE(target) Release/bufferutil.node: Finished
  CXX(target) Release/obj.target/validation/src/validation.o
  SOLINK_MODULE(target) Release/validation.node
  SOLINK_MODULE(target) Release/validation.node: Finished

> ws@0.4.32 install /Users/g-hayakawa/repos/mean-sample/node_modules/grunt-node-inspector/node_modules/node-inspector/node_modules/ws
> (node-gyp rebuild 2> builderror.log) || (exit 0)

  CXX(target) Release/obj.target/bufferutil/src/bufferutil.o
  SOLINK_MODULE(target) Release/bufferutil.node
  SOLINK_MODULE(target) Release/bufferutil.node: Finished
  CXX(target) Release/obj.target/validation/src/validation.o
  SOLINK_MODULE(target) Release/validation.node
  SOLINK_MODULE(target) Release/validation.node: Finished

> v8-profiler@5.2.4 install /Users/g-hayakawa/repos/mean-sample/node_modules/grunt-node-inspector/node_modules/node-inspector/node_modules/v8-profiler
> node-pre-gyp install --fallback-to-build

[v8-profiler] Success: "/Users/g-hayakawa/repos/mean-sample/node_modules/grunt-node-inspector/node_modules/node-inspector/node_modules/v8-profiler/build/profiler/v5.2.4/node-v11-darwin-x64/profiler.node" is installed via remote

> v8-debug@0.4.2 install /Users/g-hayakawa/repos/mean-sample/node_modules/grunt-node-inspector/node_modules/node-inspector/node_modules/v8-debug
> node-pre-gyp install --fallback-to-build

[v8-debug] Success: "/Users/g-hayakawa/repos/mean-sample/node_modules/grunt-node-inspector/node_modules/node-inspector/node_modules/v8-debug/build/debug/v0.4.2/node-v11-darwin-x64/debug.node" is installed via remote
karma-firefox-launcher@0.1.4 node_modules/karma-firefox-launcher

karma-script-launcher@0.1.0 node_modules/karma-script-launcher

karma-chrome-launcher@0.1.7 node_modules/karma-chrome-launcher

karma-requirejs@0.2.2 node_modules/karma-requirejs

jit-grunt@0.5.0 node_modules/jit-grunt

karma-html2js-preprocessor@0.1.0 node_modules/karma-html2js-preprocessor

karma-ng-html2js-preprocessor@0.1.2 node_modules/karma-ng-html2js-preprocessor

grunt-contrib-copy@0.5.0 node_modules/grunt-contrib-copy

errorhandler@1.0.2 node_modules/errorhandler

connect-livereload@0.4.1 node_modules/connect-livereload

composable-middleware@0.3.0 node_modules/composable-middleware

grunt-rev@0.1.0 node_modules/grunt-rev

open@0.0.5 node_modules/open

grunt-karma@0.8.3 node_modules/grunt-karma

grunt-open@0.2.3 node_modules/grunt-open

method-override@1.0.2 node_modules/method-override
└── methods@1.0.0

serve-favicon@2.0.1 node_modules/serve-favicon
└── fresh@0.2.2

morgan@1.0.1 node_modules/morgan
└── bytes@0.3.0

karma-jasmine@0.1.5 node_modules/karma-jasmine

cookie-parser@1.0.1 node_modules/cookie-parser
├── cookie-signature@1.0.3
└── cookie@0.1.0

grunt-express-server@0.4.19 node_modules/grunt-express-server

express-session@1.0.4 node_modules/express-session
├── uid2@0.0.3
├── utils-merge@1.0.0
├── cookie@0.1.2
├── debug@0.8.1
├── cookie-signature@1.0.3
└── buffer-crc32@0.2.1

jshint-stylish@0.1.5 node_modules/jshint-stylish
├── text-table@0.2.0
└── chalk@0.4.0 (has-color@0.1.7, ansi-styles@1.0.0, strip-ansi@0.1.1)

grunt-contrib-concat@0.4.0 node_modules/grunt-contrib-concat
└── chalk@0.4.0 (has-color@0.1.7, ansi-styles@1.0.0, strip-ansi@0.1.1)

grunt-contrib-htmlmin@0.2.0 node_modules/grunt-contrib-htmlmin
├── each-async@0.1.3
├── pretty-bytes@0.1.2
├── chalk@0.4.0 (has-color@0.1.7, ansi-styles@1.0.0, strip-ansi@0.1.1)
└── html-minifier@0.5.6

grunt-env@0.4.4 node_modules/grunt-env
└── ini@1.3.3

time-grunt@0.3.2 node_modules/time-grunt
├── date-time@0.1.1
├── pretty-ms@0.1.0
├── chalk@0.4.0 (has-color@0.1.7, ansi-styles@1.0.0, strip-ansi@0.1.1)
├── text-table@0.2.0
└── hooker@0.2.3

grunt-concurrent@0.5.0 node_modules/grunt-concurrent
├── pad-stdio@0.1.1 (lpad@0.2.1)
└── async@0.2.10

grunt-contrib-clean@0.5.0 node_modules/grunt-contrib-clean
└── rimraf@2.2.8

compression@1.0.11 node_modules/compression
├── on-headers@1.0.0
├── bytes@1.0.0
├── vary@1.0.0
├── compressible@1.1.1
├── debug@1.0.4 (ms@0.6.2)
└── accepts@1.0.7 (negotiator@0.4.7, mime-types@1.0.2)

ejs@0.8.8 node_modules/ejs

grunt-build-control@0.1.3 node_modules/grunt-build-control
└── shelljs@0.2.6

grunt-newer@0.7.0 node_modules/grunt-newer
├── rimraf@2.2.6
└── async@0.2.10

socketio-jwt@2.3.5 node_modules/socketio-jwt
├── xtend@2.1.2 (object-keys@0.4.0)
└── jsonwebtoken@1.1.2 (jws@0.2.6)

should@3.3.2 node_modules/should

express@4.0.0 node_modules/express
├── methods@0.1.0
├── parseurl@1.0.1
├── utils-merge@1.0.0
├── merge-descriptors@0.0.2
├── escape-html@1.0.1
├── debug@0.8.1
├── cookie-signature@1.0.3
├── range-parser@1.0.0
├── fresh@0.2.2
├── qs@0.6.6
├── buffer-crc32@0.2.1
├── cookie@0.1.0
├── path-to-regexp@0.1.2
├── type-is@1.0.0 (mime@1.2.11)
├── send@0.2.0 (mime@1.2.11)
├── accepts@1.0.0 (mime@1.2.11, negotiator@0.3.0)
└── serve-static@1.0.1 (send@0.1.4)

body-parser@1.5.2 node_modules/body-parser
├── qs@0.6.6
├── media-typer@0.2.0
├── bytes@1.0.0
├── raw-body@1.3.0
├── depd@0.4.4
├── type-is@1.3.2 (mime-types@1.0.2)
└── iconv-lite@0.4.4

grunt-contrib-cssmin@0.9.0 node_modules/grunt-contrib-cssmin
├── chalk@0.4.0 (has-color@0.1.7, ansi-styles@1.0.0, strip-ansi@0.1.1)
├── clean-css@2.1.8 (commander@2.1.0)
└── maxmin@0.1.0 (pretty-bytes@0.1.2, gzip-size@0.1.1)

karma-coffee-preprocessor@0.2.1 node_modules/karma-coffee-preprocessor
└── coffee-script@1.7.1 (mkdirp@0.3.5)

supertest@0.11.0 node_modules/supertest
├── methods@0.1.0
└── superagent@0.17.0 (methods@0.0.1, extend@1.2.1, cookiejar@1.3.0, qs@0.6.5, debug@0.7.4, emitter-component@1.0.0, reduce-component@1.0.1, mime@1.2.5, formidable@1.0.14)

grunt-usemin@2.1.1 node_modules/grunt-usemin
├── debug@0.7.4
└── lodash@1.0.1

grunt-contrib-watch@0.6.1 node_modules/grunt-contrib-watch
├── async@0.2.10
├── tiny-lr-fork@0.0.5 (debug@0.7.4, faye-websocket@0.4.4, noptify@0.0.3, qs@0.5.6)
└── gaze@0.5.1 (globule@0.1.0)

karma-ng-scenario@0.1.0 node_modules/karma-ng-scenario

grunt-contrib-uglify@0.4.1 node_modules/grunt-contrib-uglify
├── chalk@0.4.0 (has-color@0.1.7, ansi-styles@1.0.0, strip-ansi@0.1.1)
├── maxmin@0.1.0 (pretty-bytes@0.1.2, gzip-size@0.1.1)
└── uglify-js@2.4.17 (uglify-to-browserify@1.0.2, async@0.2.10, yargs@1.3.3, source-map@0.1.34)

lodash@2.4.1 node_modules/lodash

grunt-mocha-test@0.10.2 node_modules/grunt-mocha-test
├── hooker@0.2.3
├── fs-extra@0.8.1 (jsonfile@1.1.1, rimraf@2.2.8, ncp@0.4.2, mkdirp@0.3.5)
└── mocha@1.18.2 (diff@1.0.7, growl@1.7.0, commander@2.0.0, mkdirp@0.3.5, debug@2.1.3, glob@3.2.3, jade@0.26.3)

requirejs@2.1.16 node_modules/requirejs

grunt-angular-templates@0.5.7 node_modules/grunt-angular-templates
└── html-minifier@0.6.9 (relateurl@0.2.6, change-case@2.1.6, clean-css@2.2.23, cli@0.6.5, uglify-js@2.4.17)

grunt-dom-munger@3.4.0 node_modules/grunt-dom-munger
└── cheerio@0.12.4 (entities@0.5.0, underscore@1.4.4, htmlparser2@3.1.4, cheerio-select@0.0.3)

karma-phantomjs-launcher@0.1.4 node_modules/karma-phantomjs-launcher
└── phantomjs@1.9.16 (which@1.0.9, progress@1.1.8, kew@0.4.0, request-progress@0.3.1, adm-zip@0.4.4, npmconf@2.1.1, fs-extra@0.16.5, request@2.42.0)

grunt@0.4.5 node_modules/grunt
├── which@1.0.9
├── dateformat@1.0.2-1.2.3
├── eventemitter2@0.4.14
├── getobject@0.1.0
├── rimraf@2.2.8
├── colors@0.6.2
├── async@0.1.22
├── grunt-legacy-util@0.2.0
├── hooker@0.2.3
├── nopt@1.0.10 (abbrev@1.0.5)
├── exit@0.1.2
├── minimatch@0.2.14 (sigmund@1.0.0, lru-cache@2.5.0)
├── glob@3.1.21 (inherits@1.0.0, graceful-fs@1.2.3)
├── lodash@0.9.2
├── coffee-script@1.3.3
├── underscore.string@2.2.1
├── iconv-lite@0.2.11
├── findup-sync@0.1.3 (glob@3.2.11, lodash@2.4.1)
├── grunt-legacy-log@0.1.1 (underscore.string@2.3.3, lodash@2.4.1)
└── js-yaml@2.0.5 (argparse@0.1.16, esprima@1.0.4)

grunt-asset-injector@0.1.0 node_modules/grunt-asset-injector
└── wiredep@0.4.2 (chalk@0.1.1, lodash@1.3.1)

grunt-ng-annotate@0.2.3 node_modules/grunt-ng-annotate
└── ng-annotate@0.9.11 (tryor@0.1.2, alter@0.2.0, simple-fmt@0.1.0, simple-is@0.2.0, stringset@0.2.1, stringmap@0.2.2, stable@0.1.5, convert-source-map@0.4.1, ordered-ast-traverse@0.1.1, optimist@0.6.1, source-map@0.1.43, esprima@1.2.5)

grunt-svgmin@0.4.0 node_modules/grunt-svgmin
├── each-async@0.1.3
├── pretty-bytes@0.1.2
├── chalk@0.4.0 (has-color@0.1.7, ansi-styles@1.0.0, strip-ansi@0.1.1)
└── svgo@0.4.5 (colors@0.6.2, whet.extend@0.9.9, coa@0.4.1, sax@0.6.1, js-yaml@2.1.3)

socket.io@1.3.5 node_modules/socket.io
├── debug@2.1.0 (ms@0.6.2)
├── has-binary-data@0.1.3 (isarray@0.0.1)
├── socket.io-adapter@0.3.1 (object-keys@1.0.1, debug@1.0.2, socket.io-parser@2.2.2)
├── engine.io@1.5.1 (base64id@0.1.0, debug@1.0.3, engine.io-parser@1.2.1, ws@0.5.0)
└── socket.io-parser@2.2.4 (isarray@0.0.1, debug@0.7.4, component-emitter@1.1.2, benchmark@1.0.0, json3@3.2.6)

karma-ng-jade2js-preprocessor@0.1.5 node_modules/karma-ng-jade2js-preprocessor
└── jade@1.3.1 (character-parser@1.2.0, commander@2.1.0, mkdirp@0.3.5, with@3.0.1, constantinople@2.0.1, transformers@2.1.0, monocle@1.1.51)

karma-jade-preprocessor@0.0.11 node_modules/karma-jade-preprocessor
└── jade@0.33.0 (character-parser@1.0.2, mkdirp@0.3.5, commander@1.2.0, constantinople@1.0.2, with@1.1.1, monocle@0.1.48, transformers@2.0.1)

grunt-wiredep@1.8.0 node_modules/grunt-wiredep
└── wiredep@1.8.6 (propprop@0.3.0, minimist@1.1.1, chalk@0.5.1, through2@0.6.3, glob@4.5.3, bower-config@0.5.2)

grunt-contrib-jshint@0.10.0 node_modules/grunt-contrib-jshint
├── hooker@0.2.3
└── jshint@2.5.11 (strip-json-comments@1.0.2, underscore@1.6.0, exit@0.1.2, console-browserify@1.1.0, minimatch@1.0.0, shelljs@0.3.0, cli@0.6.5, htmlparser2@3.8.2)

grunt-nodemon@0.2.1 node_modules/grunt-nodemon
└── nodemon@1.0.20 (minimatch@0.2.14, ps-tree@0.0.3, update-notifier@0.1.10)

grunt-autoprefixer@0.7.6 node_modules/grunt-autoprefixer
├── diff@1.0.8
├── chalk@0.4.0 (has-color@0.1.7, ansi-styles@1.0.0, strip-ansi@0.1.1)
└── autoprefixer@1.3.1 (fs-extra@0.9.1, postcss@0.3.5, caniuse-db@1.0.30000101)

grunt-contrib-imagemin@0.7.2 node_modules/grunt-contrib-imagemin
├── pretty-bytes@0.1.2
├── chalk@0.4.0 (has-color@0.1.7, ansi-styles@1.0.0, strip-ansi@0.1.1)
├── async@0.7.0
└── imagemin@0.4.9 (stat-mode@0.2.0, ware@0.3.0, image-type@0.1.4, nopt@3.0.1, tempfile@0.1.3, fs-extra@0.10.0, rimraf@2.3.2, imagemin-gifsicle@0.1.1, imagemin-jpegtran@0.1.0, imagemin-svgo@0.1.1, imagemin-pngquant@0.1.3, imagemin-optipng@0.1.0)

grunt-google-cdn@0.4.3 node_modules/grunt-google-cdn
├── chalk@0.5.1 (ansi-styles@1.1.0, escape-string-regexp@1.0.3, supports-color@0.2.0, strip-ansi@0.3.0, has-ansi@0.1.0)
├── google-cdn@0.7.0 (regexp-quote@0.0.0, google-cdn-data@0.1.17, debug@1.0.4, async@0.9.0, semver@2.3.2, cdnjs-cdn-data@0.1.1)
└── bower@1.3.12 (is-root@1.0.0, junk@1.0.1, stringify-object@1.0.1, which@1.0.9, abbrev@1.0.5, chmodr@0.1.0, osenv@0.1.0, archy@0.0.2, opn@1.0.1, rimraf@2.2.8, lru-cache@2.5.0, bower-logger@0.2.2, bower-endpoint-parser@0.2.2, graceful-fs@3.0.6, lockfile@1.0.0, nopt@3.0.1, retry@0.6.0, tmp@0.0.23, request-progress@0.3.0, q@1.0.1, chalk@0.5.0, shell-quote@1.4.3, bower-json@0.4.0, semver@2.3.2, p-throttler@0.1.0, fstream@1.0.4, promptly@0.2.0, mkdirp@0.5.0, bower-config@0.5.2, fstream-ignore@1.0.2, tar-fs@0.5.2, decompress-zip@0.0.8, request@2.42.0, glob@4.0.6, bower-registry-client@0.2.4, cardinal@0.4.0, mout@0.9.1, update-notifier@0.2.0, handlebars@2.0.0, inquirer@0.7.1, insight@0.4.3)

socket.io-client@1.3.5 node_modules/socket.io-client
├── to-array@0.1.3
├── indexof@0.0.1
├── component-bind@1.0.0
├── debug@0.7.4
├── backo2@1.0.2
├── object-component@0.0.3
├── component-emitter@1.1.2
├── has-binary@0.1.6 (isarray@0.0.1)
├── parseuri@0.0.2 (better-assert@1.0.2)
├── socket.io-parser@2.2.4 (isarray@0.0.1, benchmark@1.0.0, json3@3.2.6)
└── engine.io-client@1.5.1 (component-inherit@0.0.3, debug@1.0.4, xmlhttprequest@1.5.0, parseuri@0.0.4, parseqs@0.0.2, parsejson@0.0.1, engine.io-parser@1.2.1, has-cors@1.0.3, ws@0.4.31)

grunt-protractor-runner@1.2.1 node_modules/grunt-protractor-runner
├── split@0.3.3 (through@2.3.6)
├── through2@0.5.1 (xtend@3.0.0, readable-stream@1.0.33)
└── protractor@1.8.0 (jasminewd@1.1.0, jasminewd2@0.0.2, html-entities@1.1.2, saucelabs@0.1.1, q@1.0.0, minijasminenode@1.1.1, optimist@0.6.1, adm-zip@0.4.4, glob@3.2.11, accessibility-developer-tools@2.6.0, source-map-support@0.2.10, request@2.36.0, jasmine@2.1.1, selenium-webdriver@2.44.0)

connect-mongo@0.4.2 node_modules/connect-mongo
└── mongodb@1.4.35 (readable-stream@1.0.33, kerberos@0.0.9, bson@0.2.21)

mongoose@3.8.25 node_modules/mongoose
├── regexp-clone@0.0.1
├── muri@0.3.1
├── sliced@0.0.5
├── hooks@0.2.1
├── mpath@0.1.1
├── mpromise@0.4.3
├── ms@0.1.0
├── mquery@0.8.0 (debug@0.7.4)
└── mongodb@1.4.32 (readable-stream@1.0.33, kerberos@0.0.9, bson@0.2.21)

karma@0.12.31 node_modules/karma
├── di@0.0.1
├── graceful-fs@2.0.3
├── rimraf@2.2.8
├── colors@0.6.2
├── mime@1.2.11
├── q@0.9.7
├── minimatch@0.2.14 (sigmund@1.0.0, lru-cache@2.5.0)
├── optimist@0.6.1 (wordwrap@0.0.2, minimist@0.0.10)
├── glob@3.2.11 (inherits@2.0.1, minimatch@0.3.0)
├── source-map@0.1.43 (amdefine@0.1.0)
├── chokidar@0.12.6 (async-each@0.1.6, readdirp@1.3.0, fsevents@0.3.5)
├── log4js@0.6.22 (semver@1.1.4, async@0.2.10, readable-stream@1.0.33)
├── http-proxy@0.10.4 (pkginfo@0.3.0, utile@0.2.1)
├── connect@2.26.6 (cookie@0.1.2, fresh@0.2.4, pause@0.0.1, cookie-signature@1.0.5, response-time@2.0.1, vhost@3.0.0, on-headers@1.0.0, basic-auth-connect@1.0.0, bytes@1.0.0, media-typer@0.3.0, parseurl@1.3.0, depd@0.4.5, connect-timeout@1.3.0, cookie-parser@1.3.4, finalhandler@0.2.0, method-override@2.2.0, qs@2.2.4, debug@2.0.0, morgan@1.3.2, serve-favicon@2.1.7, csurf@1.6.6, type-is@1.5.7, serve-static@1.6.5, express-session@1.8.2, multiparty@3.3.2, errorhandler@1.2.4, compression@1.1.2, body-parser@1.8.4, serve-index@1.2.1)
├── useragent@2.0.10 (lru-cache@2.2.4)
└── socket.io@0.9.16 (base64id@0.1.0, policyfile@0.0.4, redis@0.7.3, socket.io-client@0.9.16)

grunt-node-inspector@0.1.6 node_modules/grunt-node-inspector
└── node-inspector@0.9.2 (which@1.0.9, async@0.9.0, debug@1.0.4, semver@3.0.1, rc@0.5.5, yargs@1.3.3, strong-data-uri@0.1.1, serve-favicon@2.2.0, glob@4.5.3, express@4.12.3, biased-opener@0.2.3, ws@0.4.32, v8-profiler@5.2.4, v8-debug@0.4.2)
```


### Gitにコミット

(レポジトリのコミッターじゃない方は不要)

```
$ echo '.DS_Store' >> .gitignore

$ git status
git add .bowerrc
git add .buildignore
git add .editorconfig
git add .gitattributes
git add .gitignore
git add .travis.yml
git add .yo-rc.json
git add Gruntfile.js
git add bower.json
git add client/
git add e2e/
git add karma.conf.js
git add package.json
git add protractor.conf.js
git add server/

git commit -m "first commit"
git push
```
