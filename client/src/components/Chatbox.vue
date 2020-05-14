<template>
    <div>
        <div class="card text-center">
            <div class="card-header">
            Chat App
            </div>
            <div class="card-body">
                <ul v-for="(message,index) in messages" :key="index" class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div :class="{'float-right' : message.name === 'self'}" >
                            <p class="form-text">{{message.name}}</p>
                            <p>{{message.content}}</p>
                        </div>

                    </li>
                </ul>
            </div>
            <div class="card-footer text-muted">
                <form @submit.prevent="sendMsg">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Input your msg .." v-model='inputMessage'/>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-info btn-block">SEND MESSAGE</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client'
const servers = 'http://localhost:3000'
const socket = io(servers)

export default {
    data(){
        return {
            messages : [],
            inputMessage : ''
        }
    },
    methods: {
        sendMsg(){
            let objMsg = {
                content : this.inputMessage,
                name : 'self'
            }
            this.messages.push(objMsg)
            socket.emit('chat', objMsg)
            this.inputMessage = ''
        }
    },
    created(){
        socket.on('chat-clien', data=>{
            let objMsg = {
                content : data.content,
                name : 'other'
            }
            this.messages.push(objMsg)
            console.log(this.messages)
        
}
</script>

<style lang="scss">
    
</style>