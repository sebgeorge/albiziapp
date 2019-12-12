# Pages and interaction components

## Pages in Albiziapp 

Since Albiziapp aims to mimic mobile look and feels, it is structured using the "page pattern" proposed by the [OnsenUI Framwork](https://onsen.io/v2/api/vue/).

Think of a page as **a specific screen of a mobile app**. Pages are practical for **performing fast, focused interactions**. They usually have only one purpose, and they take all the screen. 

![A page for entering record](../../.gitbook/assets/image%20%289%29.png)

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

### Location of pages component in the source hierarchy

In order to keep the project easy to maintain, all pages component are located in the same folder, which is unsurprisingly named pages.

![The pages folder](../../.gitbook/assets/image%20%285%29.png)



## Interaction components

Pages are **containers** that needs to be populated with **interaction components** to allow any interaction. 

Typical example of interaction component are [checkbox](https://onsen.io/v2/api/vue/v-ons-checkbox.html) or [switch](https://onsen.io/v2/api/vue/v-ons-switch.html). These components are **reusable and generic** in contrast with **pages** that are specific to a given task. 

### Hierarchical dependencies between pages and interaction components

Pages are in a parent-children relation with interaction components. The page control the states of its interaction component, and manage update when this state change. 

Three types of subcomponents can be distinguished :

* Native [OnsenUI components](https://onsen.io/v2/api/vue/)
* Custom components \(specific to Albiziapp\)
* Components from external libraries \(such as [Leaflet](https://leafletjs.com/)\)

#### Native OnsenUI Components

Native OnsenUI components are the set of components provided by OnsenUI for VueJS. **These component are documented and reliable**. **However** the set of component is quite limited some components aren't visually appealing \(ie v-ons-list\).  **Hence the needs for Custom and External components.**

#### Custom components 

Custom components are [VueJs components](https://vuejs.org/v2/guide/components.html) constructed specifically for Albiziapp through a `.vue`file type. 

///TODO

 

