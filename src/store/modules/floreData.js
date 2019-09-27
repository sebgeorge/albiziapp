export default {
        strict: true,
        namespaced: true,
        state :{
          treeList:[],
          floreProperties:[]
        },
        mutations:{
          setFlore(state,treeList){
            state.treeList=treeList
          },
          setProperty(state,properties){
            state.floreProperties=properties
          },

        },
        actions:{
          getFloreProperties({commit}){
            axios.get('/api/floreProps')
            .then((response)=>{commit('setProperty',response.data)})
          },
          getFlore({commit}){
            axios.get('/api/listTrees')
            .then((response)=>{
              commit('setFlore',response.data)
            })
          }
        }
}
  