<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Retour</v-ons-back-button>
      </div>
    </v-ons-toolbar>

    <v-ons-list>
      <v-ons-list-header class="head" v-if="!modify">{{ $t('newRecord') }}</v-ons-list-header>
      <v-ons-list-header class="head" v-if="modify">{{ $t('modifyRecord') }}</v-ons-list-header>
      <v-ons-list-title
        style="margin-top: 10px;
    font-size: 15px;
    font-weight: bolder;"
      >{{ $t('identification') }}</v-ons-list-title>
      <v-ons-list-item>
        <div class="center">
          <v-ons-button
            modifier="large"
            @click="viewItem"
            v-if="releve.specie.length>0"
            style="margin: 6px 0"
          >Fiche espèce</v-ons-button>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="left">
          <v-ons-icon icon="ion-leaf" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">
          <label class="tag">{{ $t('specie') }}</label>
          <v-select
            class="selector"
            v-model="releve"
            ref="species"
            :options="speciesList"
            label="specie"
            v-on:input="setTaxon"
            :placeholder="placeholder.specieName"
            style="width: -webkit-fill-available;"
          ></v-select>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="left">
          <v-ons-icon icon="ion-leaf" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">
          <label class="tag">{{ $t('commonGenus') }}</label>
          <v-select
            class="selector"
            v-model="releve.commonGenus"
            ref="genus"
            v-on:input="setGenus"
            :disabled="releve.specie.length>0"
            :options="commonGenus"
            :placeholder="placeholder.genusName"
            style="width: -webkit-fill-available;"
          ></v-select>
        </div>
      </v-ons-list-item>

      <v-ons-list-item>
        <div class="left">
          <v-ons-icon icon="ion-leaf" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">
          <label class="tag">{{ $t('genus') }}</label>
          <v-select
            class="selector"
            v-model="releve.genus"
            :disabled="releve.specie.length>0"
            ref="genus"
            v-on:input="setGenus"
            :options="genusList"
            :placeholder="placeholder.genusName"
            style="width: -webkit-fill-available;"
          ></v-select>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="left">
          <v-ons-icon icon="ion-leaf" class="list-item__icon"></v-ons-icon>
        </div>
        <label class="tag">{{ $t('common') }}</label>
        <v-select
          class="selector"
          v-model="releve"
          v-on:input="setTaxon"
          :filterBy="filterBy"
          label="common"
          ref="common"
          style="width: -webkit-fill-available;"
          :placeholder="placeholder.commonName"
          :options="commonList"
        ></v-select>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="left">
          <v-ons-icon icon="ion-leaf" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">
          <label class="tag">{{ $t('confidence') }}</label>
          <v-ons-select :disabled="noTree" class="selector" v-model="releve.confidence">
            <option
              v-for="(confidence,index) in confidenceValues"
              :value="confidence"
              v-bind:key="index+'confidence'"
            >{{ confidence }}</option>
          </v-ons-select>
        </div>
      </v-ons-list-item>

      <v-ons-list-item v-if="validate">
        <div class="left">
          <v-ons-icon icon="ion-leaf" class="list-item__icon"></v-ons-icon>
          {{ $t('noTree') }}
        </div>
        <div class="center" style="margin-left:15px;">
          <v-ons-switch @change="releve.noTree=noTree" v-model="noTree"></v-ons-switch>
        </div>
      </v-ons-list-item>

      <v-ons-list-item>
        <picture-input
          ref="pictureInput"
          @change="onChange"
          width="400"
          :crop="false"
          :removable="true"
          height="400"
          margin="16"
          :disabled="noTree"
          accept="image/*"
          capture="camera"
          size="10"
          buttonClass="btn"
          :customStrings="customStrings"
        ></picture-input>
      </v-ons-list-item>
    </v-ons-list>
    <section style="margin: 16px">
      <v-ons-button
        v-if="!modify && osmUpdates"
        @click="uploadToOSM"
        style="margin: 6px"
      >{{ $t('sendOSM') }}</v-ons-button>
      <v-ons-button @click="complete" style="margin: 6px">{{ $t('save') }}</v-ons-button>
      <v-ons-button modifier="outline" @click="cancel" style="margin: 6px">{{ $t('cancel') }}</v-ons-button>
    </section>
  </v-ons-page>
</template>
<style>
#app .autocomplete__results {
  position: relative !important;
}
.vs__dropdown-menu {
  z-index: 10005 !important;
}
.selector {
  width: 70% !important;
  margin-left: auto;
}
.tag {
  padding-top: 9px;
  font-weight: bold;
}
.head {
  font-size: 36px;
}
</style>
<script>
//Lors de la modif d'un champ puis retour arrière sans valider, la page est mise à jour
// Mettre des labels espèces
import PictureInput from "vue-picture-input";
import Identification from "./Identification.vue";
import imageCompression from "browser-image-compression";
import uploadObservationToOSM from "../js/osmPost";
import osmUpdate from "../js/osmUpdate";
import FloreItem from "./FloreItem.vue";

export default {
  watch:{
    _id(newId,old){
      console.log(old)
      if(old){
        this.releve._id=old
      }
    }
  },
  data() {
    return {
      releve: {
        specie: "",
        genus: "",
        commonGenus: "",
        _id:"",
        common: "",
        telaBotanicaTaxon: "",
        confidence: "Non renseignée" //this.$t('unspecified')
      },
      noTree: false,
      image:null,
      selectedHeight: 0,
      selectedConfidence: "Non renseignée", //this.$t('unspecified')
      selectedCrown: 0,
      modify: false,
      validate: false,
      placeholder: {
        specieName: this.$t("specieName"),
        genusName: this.$t("genusName"),
        commonName: this.$t("commonName")
      },
      customStrings: {
        drag: "Prendre photo",
        change: this.$t("change"),
        remove: this.$t("remove"),
        tap: this.$t("tap")
      }
    };
  },
  components: {
    PictureInput
  },
  computed: {
    _id(){
      return this.releve._id
    },
    osmUpdates() {
      return this.$store.state.commonData.osmUpdates;
    },
    treeList() {
      return this.$store.state.floreData.treeList;
    },
    speciesList() {
      return [
        ...new Set(
          this.treeList
            .map(v => {
              return {
                commonGenus: v.common_genus,
                common: v.common,
                genus: v.genus,
                specie: v.species,
                telaBotanicaTaxon: v.telaBotanicaTaxon
              };
            })
            .sort()
        )
      ];
    },
    commonList() {
      return [
        ...new Set(
          this.treeList
            .map(v => {
              return {
                commonGenus: v.common_genus,
                common: v.common,
                genus: v.genus,
                specie: v.species,
                telaBotanicaTaxon: v.telaBotanicaTaxon
              };
            })
            .sort(function(a,b){
              return a.common.toString().localeCompare(b.common.toString())
              })
        )
      ];
    },

    genusList() {
      return [...new Set(this.treeList.map(v => v.genus).sort())];
    },
    commonGenus() {
      return [...new Set(this.treeList.map(v => v.common_genus))].sort(
        function(a,b)
        {
          return a.toString().localeCompare(b.toString())
        });
    },

    confidenceValues() {
      return this.$store.state.commonData.confidenceValues;

      /*var confidenceValues = []
      for (let confidenceValue of this.$store.state.commonData.confidenceValues) {
        confidenceValues.push(this.$t(confidenceValue))
      }
      return confidenceValues*/
    },
    completed() {
      if (this.genus.length) {
        return true;
      }
      if (this.specieIndex) {
        return true;
      }
    }
  },
  methods: {
    viewItem() {
      this.$store.commit("navigator/push", {
        extends: FloreItem,
        data: function() {
          return {
            telaBotanicaTaxon: this.releve.telaBotanicaTaxon,
            toolbarInfo: {
              backLabel: "Home",
              title: "key"
            }
          };
        }.bind(this)
      });
    },
	  filterBy(option, label, search) {
      let x=this.normalize(label) || ""
		  return x.indexOf(this.normalize(search)) > -1;
	  },
    normalize(string) {
      return string
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    },

    setTaxon(e) {
      if (!e) {
        this.releve = {
          specie: "",
          genus: "",
          commonGenus: "",
          common: "",
          telaBotanicaTaxon: "",
          confidence: "Non renseignée" //this.$t('unspecified')
        };
        //this.releve.common=''
        return;
      }
      let tree = this.treeList.filter(v => v.telaBotanicaTaxon == e.telaBotanicaTaxon)[0];
      this.releve = {
        confidence: "Non renseignée",
        commonGenus: tree.common_genus,
        genus: tree.genus,
        specie: tree.species,
        common: tree.common,
        telaBotanicaTaxon: tree.telaBotanicaTaxon
      };
    },
    setGenus(e) {
      if (!e) {
        this.releve = {
          specie: "",
          genus: "",
          commonGenus: "",
          common: "",
          telaBotanicaTaxon: "",
          confidence: "Non renseignée" //this.$t('unspecified')
        };
        return;
      }
      let tree = this.treeList.filter(
        v => v.genus == e || v.common_genus == e
      )[0];
      this.releve.genus = tree.genus;
      this.releve.commonGenus = tree.common_genus;
    },
    uploadToOSM() {
      this.releve.location = { coordinates: this.coordinates };
      uploadObservationToOSM(this.releve);
      this.$store.commit("navigator/pop");
    },

    noResult(e) {
      console.log(e);
    },
    onChange() {
      var that = this;
      //this.image = this.$refs.pictureInput.image;
      // console.log(this.image.length)
      var imageFile = this.$refs.pictureInput.file;
      console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
      console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      var maxSizeMB = 1;
      var maxWidthOrHeight = 600; // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight
      imageCompression(imageFile, {
        maxSizeMB: maxSizeMB,
        maxWidthOrHeight: maxWidthOrHeight
      }) // maxSizeMB, maxWidthOrHeight are optional
        .then(
          function(compressedFile) {
            console.log(
              "compressedFile instanceof Blob",
              compressedFile instanceof Blob
            ); // true
            console.log(
              `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
            ); // smaller than maxSizeMB
            imageCompression.getDataUrlFromFile(compressedFile).then(
              function(compressedDataURI) {
                this.image = compressedDataURI;
              }.bind(this)
            );
            //return uploadToServer(compressedFile); // write your own logic
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error.message);
        });
    },
    complete() {
      let releve = this.releve;
      this.releve.image=this.image
      if (!this.modify) {
        this.releve.coordinates = this.coordinates;
        this.$store.dispatch("releve/setObservation", releve);
        this.$store.commit("navigator/pop");
      } else {
        this.$store.dispatch("releve/modifyObservation", releve);
        this.$store.commit("navigator/pop");
      }
    },
    cancel() {
      this.$store.commit("navigator/pop");
    }
  }
};
</script>
<style>
.inputDiv {
  color: red;
}
</style>