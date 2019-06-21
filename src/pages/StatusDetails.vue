<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>Retour</v-ons-back-button>
            </div>
        </v-ons-toolbar>
    	<v-ons-card>
            <div class="title">{{ $t('acquireStatus') }}</div>
            <div class="content">{{ $t('statusDescription') }}
            </div>
        </v-ons-card>
        <v-ons-list style="max-height:200px; overflow: auto">
    		<v-ons-list-item v-for="item in status">
    			<v-ons-row>
    				<v-ons-col>
    					{{ item.name }}
    				</v-ons-col>
    				<v-ons-col style="text-align: right">
    				</v-ons-col>
    			</v-ons-row>  
    		</v-ons-list-item>
    	</v-ons-list>
        </v-ons-page>
</template>
<script>
export default {
    computed:{
        status(){
            return [... this.$store.state.user.status].reverse()
        }
    }
}
</script>
