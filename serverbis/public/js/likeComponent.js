new Vue({
    el: '#likeComponent',
    data() {
        return {
            selectedColor: 0,
            records: '',
            loading: true,
            error: false,
        }
    },
    mounted() {
        axios.get('http://localhost:3001/showData')
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


    },
    methods:{
        addCountLikes(){
            axios.post('http://localhost:3001/addLikes', {
                id_data: this.selectedColor,
                type: "likes"
            })
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

            this.records[this.selectedColor].countLikes += 1
        },
        addCountDislikes(){
            axios.post('http://localhost:3001/addLikes', {
                id_data: this.selectedColor,
                type: "dislikes"
            })
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

            this.records[this.selectedColor].countDislikes += 1
        },
        updateVariant(index) {
            this.selectedColor = index
        }
    }
});