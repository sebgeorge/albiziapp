# Getting started

## Setup your dev environment

* Install node \([https://nodejs.org/en/download/](https://nodejs.org/en/download/)\)
* Install vue/@cli and pm2

```
$ npm i -g vue/@cli
$ npm i -g pm2
```

{% hint style="info" %}
 You may have to sudo.
{% endhint %}

* Install mongo \([https://docs.mongodb.com/manual/installation/\#mongodb-community-edition-installation-tutorials](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials)\)

Test if all is OK

{% code title="$ sudo service mongod start" %}
```bash
mongo>
```
{% endcode %}

```bash
$ vue-ui
//triggers a browser tool
```

## Get the last version of Albiziapp front end

```bash
$ git clone https://github.com/gick/albiziapp.git
$ cd albiziapp
$ npm install
$ npm run serve
```

If all goes well you should be directed to a page like this :

![](../../.gitbook/assets/image%20%2812%29.png)





## Get the last version of Albiziapp back-end

```bash
$ git clone https://github.com/REVERIES-project/reveries-osm-data.git
$ cd reveries-osm-data
$ npm install
```

## Get Vue DevTools

Vue DevTools is an extension for **Chromium/Chrome** and **Firefox** \(tested in [Firefox 71](https://www.mozilla.org/en-US/firefox/developer/?utm_campaign=deved_inactive_css&utm_medium=referral&utm_source=developer.mozilla.org)\).

 **It is very very very useful**. I can't state how useful it is, but really, please use it!

* Chrome/Chromium [Vue DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* Firefox [Vue DevTools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
* Extension [Github page](https://github.com/vuejs/vue-devtools) \(for the might\)

## Get and configure a text editor

Choosing a text editor is often harder than choosing a life partner, so I propose to chose for you.

[Visual Studio Code ](https://code.visualstudio.com/)is an excellent free text editor. Works on any platform, free and open source, and last but not least : a lot of extension to make Vue coding a pleasure. 

Extension for an happy coding :

* [Vetur](https://vuejs.github.io/vetur) \(autocomplete Vue files, documentation on hover, formating...\)
* [Auto-close-tags](https://marketplace.visualstudio.com/items?itemName=bradgashler.htmltagwrap) \(less keystrokes, more happiness\)
* [Git lens](https://gitlens.amod.io/)  
  * "GitLens simply helps you **better understand code**. Quickly glimpse into whom, why, and when a line or code block was changed. Jump back through history to **gain further insights"**
* [CSS in HTML supports ](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css)\(even less keystrokes\)









