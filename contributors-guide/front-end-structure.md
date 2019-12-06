# Top level : Navigation components

### Navigation patterns

Albiziapp follows the pattern of OnsenUI Framework \([https://onsen.io/v2/api/vue/](https://onsen.io/v2/api/vue/)\). 

{% hint style="info" %}
Pages are either root \(in navbar\), or stacked \(on top of a root page, or a stacked page\)
{% endhint %}

![A root page \(Map\)](../.gitbook/assets/image%20%283%29.png)

![A stacked page \(from root page\)](../.gitbook/assets/image.png)

{% hint style="info" %}
All stacked page have a back button \(blue arrow\)
{% endhint %}

### Navigation components

These navigation pattern are based on two top-level components.  

```javascript
src/AppTabBar.vue
src/AppNavigator.vue
```

The former describe the state of the root. The later manages the push/pop operations associated with the stack pattern.

#### The tab bar \(simplified\)

```javascript
    <v-ons-tabbar
      position="auto"
      :tabs="tabs"
    ></v-ons-tabbar>
    
computed: {
    tabs() {
      var tab = 
      [
        {
          label: this.$t('map'),
          icon: "ion-map",
          active: false,
          page: Map,
          theme: red
        },
        {
          label: this.$t('mission'),
          icon: "ion-home",
          page: Home,
          theme: red
        },       
        {
          label: this.$t('records'),
          icon: "ion-edit",
          page: Releve,
          theme: purple,
        },
        {
          label: "Folia",
          icon: "ion-search",
          page: Folia,

          theme: purple
        }
      ]
      return tab
    },


```

The v-ons-tabbar component has a **tabs property,** set to **val** below. 

```javascript
    <v-ons-tabbar
      position="auto"
      :tabs="val"
    ></v-ons-tabbar>

```



In VueJS, a property starting with a **colon** is **bound reactively** to the local context. Here the **tabs property** take the **tabs** value. This value is the return of the tabs\(\) function.

{% hint style="info" %}
Change labels or icon in tabs\(\) declaration.

Remove an element of the tabs array, what happens?
{% endhint %}

#### The navigator component

The navigator component is in charge of the stack of sub-pages. Whenever the user enter a subpage \(ex. consult a record\), or a sub-sub-page \(ex. modify a record\) ; the navigator updates the stack pages accordingly.

```javascript
AppNavigator.vue

<template>
  <v-ons-navigator swipeable swipe-target-width="50px"
    :page-stack="$store.state.navigator.stack"
    :pop-page="storePop"
    :options="{animation:'slide-ios'}"
    :class="{ 'border-radius': borderRadius }"
  ></v-ons-navigator>
</template>

```

Let's consider this piece of code. We notice 2 main property associated to v-ons-navigator :

* page-stack : **preceded by a comma,** its value is **bound** to the current state of the stack \(an array\)
* pop-page : **preceded by a comma,** its value is **bound** to a function \(storePop\), this function simply remove the last element of the stack





