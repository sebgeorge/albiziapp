# Front-end structure

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

