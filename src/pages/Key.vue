<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Retour</v-ons-back-button>
      </div>
      <div class="center">Clef d'identification</div>
    </v-ons-toolbar>
    <v-ons-list>
      <v-ons-list-item v-for="prop in floreProps">
        <div class="left">{{prop.prop.frSubtitle}}</div>
        <div class="center">
          <v-select
            @input="setProperty($event,prop)"
            :options="prop.values"
            class="selector"
            label="normalizedForm"
            :placeholder="prop.prop.frTitle"
          ></v-select>
        </div>
      </v-ons-list-item>
    <v-ons-list>
      <v-ons-list-item @click="viewItem(tree.telaBotanicaTaxon)" v-for="tree in filteredTreeList">
        <div class="left">{{tree.common}}</div>
        <div class="center"></div>
        <div class="right">{{tree.species}}</div>
      </v-ons-list-item>
    </v-ons-list>

    </v-ons-list>
  </v-ons-page>
</template>
<style>
.selector {
  width: 200px !important;
  margin-left: auto;
  margin-right: 30px;
}
</style>

<script>
import FloreItem from "./FloreItem.vue";

import { mapState } from "vuex";

export default {
  data() {
    return {
      selectedProps: new Set(),
      selectedArray: []
    };
  },
  computed: {
    ...mapState({
      floreProps: state => state.floreData.floreProperties
    }),
    treeList() {
      return this.$store.state.floreData.treeList;
    },

    filteredTreeList() {
      return this.treeList.filter(v => {
        for (let floreProp of this.selectedArray) {
          if (!v.floreProperties.includes(floreProp._id)) {
            return false;
          }
        }
        return true;
      });
    }
  },
  methods: {
    viewItem(telaBotanicaTaxon) {
      this.$store.commit("navigator/push", {
        extends: FloreItem,
        data: function() {
          return {
            telaBotanicaTaxon: telaBotanicaTaxon,
            toolbarInfo: {
              backLabel: "Home",
              title: "key"
            }
          };
        }.bind(this)
      });
    },

    setProperty(event, source) {
      for (let v of source.values) {
        this.selectedProps.forEach(
          function(el) {
            if (v._id == el._id) {
              this.selectedProps.delete(el);
            }
          }.bind(this)
        );
      }
      if (event) {
        this.selectedProps.add(event);
      }
      this.selectedArray = [...this.selectedProps];
    }
  }
};
</script>

