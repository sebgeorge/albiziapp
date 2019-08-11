<template>
  <v-ons-page>
    <custom-toolbar backLabel="Retour"></custom-toolbar>
    <ons-card v-if="releve">
      <div class="title" v-if="!fromOSM">{{ $t('record') }}</div>
      <div class="title" v-if="fromOSM">{{ $t('importedFromOSM') }}</div>
      <div class="content">
        <ons-list>
          <ons-list-header>{{ $t('information') }}</ons-list-header>
          <ons-list-item v-show="releve.authorName">{{ $t('recordAuthor') }} : {{releve.authorName}}</ons-list-item>
          <ons-list-item v-show="releve.species">{{ $t('specie') }} : {{releve.species}}</ons-list-item>
          <ons-list-item v-show="releve.genus">{{ $t('genus') }} : {{releve.genus}}</ons-list-item>
          <ons-list-item v-show="releve.commonGenus">Genre vernac. : {{releve.commonGenus}}</ons-list-item>         
          <ons-list-item v-show="releve.common">{{ $t('common') }} : {{releve.common}}</ons-list-item>
          <ons-list-item v-show="releve.height">{{ $t('heigth') }} : {{releve.height}}</ons-list-item>
          <ons-list-item v-show="releve.crown">{{ $t('crownDiameter') }} : {{releve.crown}}</ons-list-item>
          <ons-list-item v-show="releve.confidence">{{ $t('confidenceDegree') }} : {{releve.confidence}}</ons-list-item>
          <ons-list-item v-show="releve.noTree.length>0">{{ $t('usersReporting') }} : {{releve.noTree.length}}</ons-list-item>
      <v-ons-list-item>
        <div class="center">
          <v-ons-button
            modifier="large"
            @click="viewItem"
            v-if="releve.telaBotanicaTaxon.length>0"
            style="margin: 6px 0"
          >Fiche espèce</v-ons-button>
        </div>
      </v-ons-list-item>

          <ons-list-item
            v-show="releve.validation.length-1"
          >{{ $t('nbValidation') }} : {{releve.validation.length-1}}</ons-list-item>
          <ons-list-item
            v-show="releve.modifierName"
          >{{ $t('lastModif') }} : {{releve.modifierName}}</ons-list-item>
        </ons-list>
        <img v-if="releve.hasImage" :src="'/api/image/'+ releve._id + '?' + new Date().getTime()" style="width: 100%">

        <section style="margin: 16px">
          <p class="center">
            {{ $t('modifyConfirm1') }}
            <b>{{ $t('modifyConfirm2') }}</b> {{ $t('modifyConfirm3') }}
            <b>{{ $t('modifyConfirm4') }}</b>
          </p>
          <v-ons-button @click="modify" :disabled="noTreeValue" style="margin: 6px">{{ $t('modifyButton') }}</v-ons-button>
          <v-ons-button :disabled="validated || noTreeValue" @click="validate" style="margin: 6px">{{ $t('confirmButton') }}</v-ons-button>
          <v-ons-button v-if="allowImport && !fromOSM && osmUpdates" @click="uploadToOSM" style="margin: 6px">{{ $t('sendOSM') }}</v-ons-button>

          <v-ons-button v-if="visualize" @click="visualizeReleve" style="margin: 6px">Voir</v-ons-button>
        </section>
        <section style="margin: 16px">
          <p class="center">
            {{ $t('noTree1') }}
            <b>{{ $t('noTree2') }}</b>
          </p>
          <v-ons-switch
            v-model="noTreeValue"
            :disabled="allowNoTree"
            style="margin: 6px 0"
          ></v-ons-switch>
        </section>
        <section v-if="!fromOSM" style="margin: 16px">
          <p class="center">{{ $t('deleteDesc') }}</p>
          <v-ons-button @click="removeObs" :disabled="(!allowRemove)" style="margin: 6px">{{ $t('deleteButton') }}</v-ons-button>
        </section>
        <section v-if="fromOSM && osmUpdates" style="margin: 16px">
          <p class="center">{{ $t('returnToOSM') }}</p>
          <v-ons-button @click="uploadAndRemove" style="margin: 6px">{{ $t('returnButton') }}</v-ons-button>
        </section>

        <section v-if="releve.prev.length>0" style="margin: 16px">
          <v-ons-list>
            <v-ons-list-item expandable>
              {{ $t('history') }}
              <div class="expandable-content">
                <ons-list-header>{{ $t('recordHistory') }}</ons-list-header>

                <ons-list v-for="(oldreleve,index) in releve.prev" :key="index">
                  <v-ons-list-title>{{ $t('version') }} {{index}}</v-ons-list-title>
                  <ons-list-item
                    v-show="oldreleve.authorName"
                  >{{ $t('recordAuthor') }} : {{oldreleve.authorName}}</ons-list-item>
                  <ons-list-item v-show="oldreleve.specie">{{ $t('specie') }} : {{oldreleve.specie}}</ons-list-item>
                  <ons-list-item v-show="oldreleve.genus">{{ $t('genus') }} : {{oldreleve.genus}}</ons-list-item>
                  <ons-list-item v-show="oldreleve.common">{{ $t('common') }} : {{oldreleve.common}}</ons-list-item>

                  <ons-list-item
                    v-show="oldreleve.validation.length-1"
                  >{{ $t('nbValidation') }} : {{oldreleve.validation.length-1}}</ons-list-item>
                  <ons-list-item
                    v-show="oldreleve.modifierName"
                  >{{ $t('modificationBy') }} : {{oldreleve.modifierName}}</ons-list-item>
                  <v-ons-list-item v-if="oldreleve.hasImage"> 
                    <img :src="'/api/image/' + oldreleve._id + '/hist/' +index" style="width: 100%">
                  </v-ons-list-item>
                </ons-list>
              </div>
            </v-ons-list-item>
          </v-ons-list>
        </section>
      </div>
    </ons-card>
  </v-ons-page>
</template>
<style>
.card--material__content{
  color:black;
}
</style>

<script>
import SimplePage from "./SimplePage.vue";
import uploadObservationToOSM from "../js/osmPost"
import osmUpdate from "../js/osmUpdate"
import FloreItem from "./FloreItem.vue";

// TODO cacher supprimer relevé si l'utilisateur ne peut pas le supprimer
export default {
  data() {
    return {
      id: "",
      showHistory: false,
      visualize: false,
      toastVisible: false
    };
  },
  computed: {
    osmUpdates(){
      return this.$store.state.commonData.osmUpdates
    },
    releve() {
      return this.$store.state.releve.releves.find(rel => rel._id == this.id);
    },

    isGod(){
      return this.$store.state.user.isGod
    },
    noTreeValue: {
      get() {
        let el = this.releve.noTree.filter(val => val.osmId == this.userID);
        return el.length ? true : false;
      },
      set(newval) {
        if (newval) {
          this.$store.dispatch("releve/setNoTree", this.releve);
        } else {
          this.$store.dispatch("releve/unsetNoTree", this.releve);
        }
      }
    },
    userID() {
      return this.$store.state.user.id;
    },
    validated() {
      let val = this.releve.validation.find(val => val.id == this.userID);
      return val ? true : false;
    },
    fromOSM(){
      return this.releve.source=="OSM"
    }
    ,
    allowNoTree() {
      if(this.releve.source=="OSM"){
        return false
      }
      return (
        this.releve.osmId == this.userID ||
        this.releve.modifierId == this.userID || this.validated
      );
    },
    allowRemove() {
      if(this.isGod){
        return true
      }
      return this.releve.osmId == this.userID && this.releve.prev.length == 0;
    },
    allowImport(){
      return this.releve.osmId==this.userID
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

    uploadToOSM(){
      uploadObservationToOSM(this.releve)
      this.$store.commit("navigator/pop");
      this.$store.dispatch("releve/remove", this.releve);
    },
    uploadAndRemove(){
      osmUpdate(this.releve)
      this.$store.dispatch("releve/remove", this.releve);
      this.$store.commit("navigator/pop");
    },

    visualizeReleve() {
      this.$store.commit("navigator/pop");
      this.$store.commit("tabbar/set", 0);
      this.$root.$emit("changeCenter", this.releve.location.coordinates);
    },
    validate() {
      this.$store.dispatch("releve/validateObservation", this.releve);
      this.$toasted.show(this.$t('validationConfirmation'), {
        fullWidth: true,
        position: "bottom-center",
        duration: 2000
      }); // Shows from 0s to 2s
    },
    removeObs() {
      this.$store.dispatch("releve/remove", this.releve);
      this.$store.commit("navigator/pop");
      this.$toasted.show(this.$t('deletionConfirmation'), {
        fullWidth: true,
        position: "bottom-center",
        duration: 2000
      }); // Shows from 0s to 2s
    },
    modify() {
      this.$store.commit("navigator/push", {
        extends: SimplePage,
        data: function() {
          return {
            releve: _.clone(this.releve),
            modify: true,
            toolbarInfo: {
              backLabel: "Home",
              title: "key"
            }
          };
        }.bind(this)
      });
    }
  }
};
</script>