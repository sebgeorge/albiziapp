# Getting started

### Setup your dev environment

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

### Get the last version of Albiziapp front end

```bash
$ git clone https://github.com/gick/albiziapp.git
$ cd albiziapp
$ npm install
$ npm run serve
```

If all goes well you should be directed to a page like this :

![](../../.gitbook/assets/image%20%289%29.png)





### Get the last version of Albiziapp back-end

```bash
$ git clone https://github.com/REVERIES-project/reveries-osm-data.git
$ cd reveries-osm-data
$ npm install
```

### Get Vue DevTools

Vue DevTools is an extension for Chromium/Chrome. **It is very very very useful**. If you don't like Chromium, code your own browser that accepts Vue DevTools

[https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

 

