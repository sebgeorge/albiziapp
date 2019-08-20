export default {
        strict: true,
        namespaced: true,
        state: {
          identification: false,
          verification: false,
          osmUpdates:false,
          showOSM:false,
          confidenceValues: [
            'Non renseignée',
            'Peu confiant',
            'Confiant'
  
            /*'unspecified',
            'notVeryConfident',
            'confident'*/
          ]
        },
        mutations: {
          setVerificationMode(state, mode) {
            state.verification = mode
          },
          showOSM(state,mode){
            state.showOSM=mode
          },
          setOsmUpdates(state, mode) {
            state.osmUpdates = mode
          },
  
          setIdentificationMode(state, mode) {
            state.identification = mode
          }
        }
      }
  