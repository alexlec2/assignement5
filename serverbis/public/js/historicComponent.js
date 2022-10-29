new Vue({
    el: '#historicComponent',
    data() {
        return {
            records: '',
            loading: true,
            error: false
        }
    },
    mounted() {
        axios.get('http://localhost:3001/showTableLikes')
            .then(response => {
                this.records = response.data
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