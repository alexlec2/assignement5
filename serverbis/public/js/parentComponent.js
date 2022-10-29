new Vue({
    component: {
    },
    el: '#parentComponent',
    data() {
        return {
            needToUpdate: '',
        }
    },
    mounted() {
        axios.get('http://localhost:3001/data')
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
                this.error = true
            })
            .finally(() => {
                this.loading = false
            })
    }
});