export default {
        strict: true,
        namespaced: true,
        state :{
          treeList:[]
        },
        mutations:{
          setFlore(state,treeList){
            state.treeList=treeList
          }
        },
        actions:{
          getFlore({commit}){
            axios.get('/api/listTrees')
            .then((response)=>{
              commit('setFlore',response.data)
            })
          }
        }
}
  