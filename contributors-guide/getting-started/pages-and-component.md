# Pages and sub-component

## Pages in Albiziapp 

Since Albiziapp aims to mimic mobile look and feels, it is structured using the "page pattern" proposed by the [OnsenUI Framwork](https://onsen.io/v2/api/vue/).

Think of a page as **a specific screen of a mobile app**. Pages are practical for **performing fast, focused interactions**. They usually have only one purpose, and they take all the screen. 

![A page for entering record](../../.gitbook/assets/image%20%288%29.png)

{% hint style="info" %}
It's a best practice to keep pages focused on only one task
{% endhint %}

###  The v-ons-page component

Pages being VueJS components, they have a formal definition. The page component documentation can be found here : [v-ons-page](https://onsen.io/v2/api/vue/v-ons-page.html).    

A minimal example of a v-ons-page is :

```javascript
<template>
  <v-ons-page>
    <p style="text-align: center">
      "Hello world of pages"
    </p>
  </v-ons-page>
</template>

```

### Sub-components

Interface components such as [checkbox](https://onsen.io/v2/api/vue/v-ons-checkbox.html), [switch](https://onsen.io/v2/api/vue/v-ons-switch.html)... are **always declared inside a page component.** Three types of subcomponents can be distinguished :

* Native [OnsenUI components](https://onsen.io/v2/api/vue/)
* Custom components \(specific to Albiziapp\)
* Components from external libraries \(such as [Leaflet](https://leafletjs.com/)\)

#### Native OnsenUI Components

Native OnsenUI components are the set of components provided by OnsenUI for VueJS. **These component are documented and reliable**. **However** the set of component is quite limited some components aren't visually appealing \(ie v-ons-list\).  Hence the needs for Custom and External components.

#### Custom components 

Custom components 



 

