<template lang="">
    <div class="text-center inputName">
        <div>
            <h1 class="title my-5">JANKENPON</h1>
            <p>A Japanese Local game, simple Paper, Rock, Scissors game</p>
        </div>
        <form @submit.prevent='addName'>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Enter your username" aria-describedby="button-addon2" v-model='pName'>
            <div class="input-group-append">
                <button class="btn btn-secondary" type="submit" id="button-addon2">Lets Play</button>
            </div>
            </div>
        </form>
        <ul v-for="(p , index) in players" :key="index">
            <li>{{p.name}}</li>
        </ul>
    </div>
</template>

<script>
import io from 'socket.io-client'
const servers = 'http://localhost:3000'
const socket = io(servers)

export default {
    data(){
        return {
            players:[],
            pName: ''
        }
    },
    methods: {
        addName(){
            let temp = {
                name: this.pName
            }
            this.players.push(temp)
            socket.emit('name', temp)
            console.log(temp)
            this.pName= ''
        }
    },
    created(){
        socket.on('name-clien', data=>{
            let temp = {
                name : data.name
            }
            this.players.push(temp)
            console.log(this.players)
        })
    }
}
</script>

<style lang="scss">
    .inputName{
        margin-top: 100px;
    }
    .title {
        font-size: 80px;
    }
</style>