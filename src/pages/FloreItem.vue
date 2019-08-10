<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Retour</v-ons-back-button>
      </div>
      <div class="center">{{tree.species}}</div>
    </v-ons-toolbar>

    <v-ons-card>
      <div class="content">

        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="0"
          img-width="0"
          img-height="0"
          controls
          fade
          indicators
          background="#ababab"
          style="text-shadow: 1px 1px 2px #333;"
        >
          <!-- Text slides with image -->

          <!-- Slides with custom text -->
          <!-- Slides with image only -->
          <b-carousel-slide v-for='image in images' img-height="300px" :img-src='image'>
          </b-carousel-slide>

        </b-carousel>

        <h1 v-show="descriptionHTML" class="title"  v-b-toggle.description>Description</h1>
        <b-collapse id="description"><div v-html="descriptionHTML"></div></b-collapse>
        <h1 class="title" v-show="usageHTML" v-b-toggle.usage>Usage</h1>
        <b-collapse v-if="usageHTML" id="usage"><div v-html="usageHTML"></div></b-collapse>
        <h1 class="title" v-if="habitatHTML" v-b-toggle.habitat>Habitat</h1>
        <b-collapse id="habitat" v-if="habitatHTML"><div v-html="habitatHTML"></div></b-collapse>

      </div>
    </v-ons-card>
  </v-ons-page>
</template>
<style>
    .carousel-item img {
        width:400px!important;
        margin:auto;
    }
    h1.title{
        background-color:lightgrey!important;
        padding: 3px!important;
        border-radius: 5px;
        margin-bottom: -5px!important;
    }
</style>

<script>
export default {
  data() {
    return {
      slide: 0,
      telaBotanicaTaxon: "",
      habitatHTML: "",
      descriptionHTML: "",
      usageHTML: "",
      images: []
    };
  },
  computed: {
    tree() {
      return this.$store.state.floreData.treeList.filter(
        v => v.telaBotanicaTaxon == this.telaBotanicaTaxon
      )[0];
    }
  },
  mounted() {
    axios.get("/api/info/" + this.telaBotanicaTaxon).then(
      function(res) {
        console.log(res);
        let response = res.data[0];
        this.habitatHTML = response.habitat;
        this.descriptionHTML = response.description;
        this.usageHTML = response.usage;
        this.images = response.images;
      }.bind(this)
    );
  }
};
</script>

