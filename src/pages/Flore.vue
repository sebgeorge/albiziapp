<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Retour</v-ons-back-button>
      </div>
      <div class="center">Flore Tela Botanica</div>
    </v-ons-toolbar>
    <v-ons-list>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input placeholder="Rechercher" float v-model="search"></v-ons-input>
        </div>
      </v-ons-list-item>
    </v-ons-list>
    <div>
      <v-ons-list v-for="(treeSet,i) in filteredTreeByGenus" v-bind:key="i">
        <v-ons-list-item
          class="list-header list-header--material"
          style="display:flex;background-color:lightGrey"
        >
          <div class="right">{{treeSet.genus}}</div>
          <div class="left">{{treeSet.common_genus}}</div>
        </v-ons-list-item>
        <v-ons-list-item @click='viewItem(tree.telaBotanicaTaxon)' v-for="tree in treeSet.species">
          <div class="left">{{tree.common}}</div>
          <div class="center"></div>
          <div class="right">{{tree.species}}</div>
        </v-ons-list-item>
      </v-ons-list>
    </div>
  </v-ons-page>
</template>
<script>
import FloreItem from './FloreItem.vue'
export default {
  data() {
    return { search: "", treeSet: this.treeByGenus };
  },
  computed: {
    treeList() {
      return this.$store.state.floreData.treeList;
    },
    getUniqueGenus() {
      return [...new Set(this.treeList.map(v => v.common_genus).sort())];
    },
    treeByGenus() {
      return this.getUniqueGenus.map(v => {
        let res = {};
        res.common_genus = v;
        res.species = this.treeList.filter(val => val.common_genus == v);
        res.genus = res.species[0].genus;
        return res;
      });
    },
    filteredTreeByGenus() {
      return this.treeByGenus.map(v => {
        let tree=_.cloneDeep(v)
        
        let search = this.normalize(this.search);
        tree.species=this.filterSpecies(search,tree)
        return tree;
      }).filter(v=>v.species.length);
    }
  },
  methods: {
    viewItem(telaBotanicaTaxon){
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
    filterSpecies(search,tree) {
    console.log(tree)
      let res = [];
      for(let i=0;i<tree.species.length;i++){
      let cond1=this.normalize(tree.species[i].species).includes(search);
      let cond2=this.normalize(tree.species[i].common).includes(search);
      if(cond1 || cond2){
          res.push({telaBotanicaTaxon:tree.species[i].telaBotanicaTaxon,species:tree.species[i].species,common:tree.species[i].common})
      }
      }
      return res;
    },
    normalize(string) {
      return string
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }
  }
};
</script>
