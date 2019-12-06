# Getting started

## Setup your dev environment

* Install node \([https://nodejs.org/en/download/](https://nodejs.org/en/download/)\)
* Install vue/@cli

```
$ npm i -g vue/@cli
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
$ npm run dev
```

If all goes well you should be directed to a page like this :

![](../.gitbook/assets/image%20%286%29.png)



