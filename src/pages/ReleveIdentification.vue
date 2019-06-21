<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>{{ $t('back') }}</v-ons-back-button>
      </div>
    </v-ons-toolbar>
    <v-ons-card>
      <div class="title">{{ $t('identificationExercise') }}</div>
      <div class="content">
        {{ $t('exerciseDescription1') }}
        <b> {{ $t('exerciseDescription2') }} </b>
        {{ $t('exerciseDescription3') }}
      </div>
    </v-ons-card>
    <v-ons-list>
      <v-ons-list-header>{{ $t('identifyTree') }}</v-ons-list-header>
      <v-ons-list-item>
        <div class="left">
          <v-ons-icon icon="ion-leaf" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">
          <v-select
            v-model="releve.identificationValue.specie"
            ref="species"
            :reduce="option=>option.espece"

            :options="specieVerSource"
            label="espece"
            :placeholder=placeholder.specieName
            style="width: -webkit-fill-available;"
          ></v-select>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="left">
          <v-ons-icon icon="ion-leaf" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">
          <v-select
            v-model="releve.identificationValue.genus"
            ref="genus"
            :reduce="option=>option.name"
            :options="genusList"
            label="name"
            :placeholder=placeholder.genusName
            style="width: -webkit-fill-available;"
          ></v-select>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="left">
          <v-ons-icon icon="ion-leaf" class="list-item__icon"></v-ons-icon>
        </div>

        <v-select
          v-model="releve.identificationValue.common"
          :reduce="option=>option.vernaculaire"
          label="vernaculaire"
          ref="common"
          style="width: -webkit-fill-available;"
          :placeholder=placeholder.commonName
          :options="commonList"
        ></v-select>
      </v-ons-list-item>

      <v-ons-list-item v-if="!releve.identificationValue.success">
        <picture-input
          ref="pictureInput"
          @change="onChange"
          width="600"
          :crop="false"
          :removable="true"
          height="600"
          margin="16"
          accept="image/*"
          capture="camera"
          size="10"
          buttonClass="btn"
          :customStrings=customStrings
        ></picture-input>
      </v-ons-list-item>
      <v-ons-list-item v-if="releve.identificationValue.success && releve">
        <img
          v-show="releve.identificationValue.image"
          :src="releve.identificationValue.image"
          style="width: 100%"
        >
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list v-show="releve.identificationValue.success">
      <v-ons-list-item>
        <div class="center">{{ $t('expertSpecie') }} : {{releve.specie}}</div>
        <div v-if="releve.specie && releve.specie==releve.identificationValue.specie" class="right">{{ $t('bravo') }}</div>
        <div v-else class="right">{{ $t('missed') }}</div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="center">{{ $t('expertGenus') }} : {{releve.genus}}</div>
        <div v-if="releve.genus && releve.genus==releve.identificationValue.genus" class="right">{{ $t('bravo') }}</div>
        <div v-else class="right">{{ $t('missed') }}</div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="center">{{ $t('expertCommon') }} : {{releve.common}}</div>
        <div v-if="releve.common && releve.common==releve.identificationValue.common" class="right">{{ $t('bravo') }}</div>
        <div v-else class="right">{{ $t('missed') }}</div>
      </v-ons-list-item>
    </v-ons-list>
    <section style="margin: 16px">
      <v-ons-button
        @click="complete"
        :disabled="releve.identificationValue.success || !hasImage"
        style="margin: 6px"
      >{{ $t('validate') }}</v-ons-button>
      <v-ons-button modifier="outline" @click="cancel" style="margin: 6px">{{ $t('back') }}</v-ons-button>
    </section>
      <section style="margin: 16px" v-if="isGod">
          <p class="center">{{ $t('deleteIdentification') }}</p>
          <v-ons-button @click="removeObs"  style="margin: 6px">{{ $t('delete') }}</v-ons-button>
        </section>
  </v-ons-page>
</template>
<style>
#app .autocomplete__results {
  position: relative !important;
}
.vs__dropdown-menu {
  z-index: 10005;
}
</style>
<script>
import PictureInput from "vue-picture-input";
import imageCompression from "browser-image-compression";
import Identification from "./Identification.vue";
import genusList from "../js/genus.js";
import speciesList from "../js/species_ver_old.js"
import commonList from "../js/species_ver.js";
export default {
  data() {
    return {
      releve: {},
      genusList: genusList,
      specieVerSource: speciesList,
      commonList:commonList,
      placeholder: {
        specieName: this.$t('specieName'),
        genusName: this.$t('genusName'),
        commonName: this.$t('commonName')
      },
      customStrings:{ 
        drag: 'Prendre photo',
        change: this.$t('change'),
        remove: this.$t('remove'),
        tap: this.$t('tap')
      }
    };
  },
  components: {
    PictureInput
  },
  computed: {
    hasImage() {
      if (this.releve.identificationValue.image) {
        return true;
      }
      return false
    },
    isGod(){
      return this.$store.state.user.isGod
    }
  },
  methods: {
    removeObs() {
      this.$store.dispatch("releve/remove", this.releve);
      this.$store.commit("navigator/pop");
      this.$toasted.show(this.$t('deletionConfirmation'), {
        fullWidth: true,
        position: "bottom-center",
        duration: 2000
      }); // Shows from 0s to 2s
    },

    onChange() {
      var that = this;
      //this.image = this.$refs.pictureInput.image;
      // console.log(this.image.length)
      var imageFile = this.$refs.pictureInput.file;
      var maxSizeMB = 0.1;
      var maxWidthOrHeight = 600; // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight
      imageCompression(imageFile, {maxSizeMB:maxSizeMB, maxWidthOrHeight:maxWidthOrHeight}) // maxSizeMB, maxWidthOrHeight are optional
        .then(
          function(compressedFile) {
            imageCompression.getDataUrlFromFile(compressedFile).then(
              function(compressedDataURI) {
                this.$set(this.releve.identificationValue,'image', compressedDataURI);
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
      this.$store.dispatch("releve/identification", this.releve);
      this.releve.identificationValue.success = true;
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