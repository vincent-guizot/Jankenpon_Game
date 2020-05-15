<template lang="">
    <div class="text-center inputName">

        <div>
            <h1 class="title my-5">JANKENPON</h1>
            <p>A Japanese Local game, simple Paper, Rock, Scissors game</p>
        </div>

        <FormName
            :opponentName="opponentName"
            :playerIsReady="playerIsReady"
            :joinGame="joinGame"
        />

        <p v-if="playerIsReady && !opponentName">Please wait... Waiting another player to join</p>

        <Choice
            :opponentName="opponentName"
            :playerIsReady="playerIsReady"
            :submitHand="checkHand"
        />

        <ModalScore/>

    </div>
</template>

<script>
import io from 'socket.io-client'
import FormName from '../components/FormName'
import Choice from '../components/Choice'
import ModalScore from '../components/ModalScore'

const servers = 'http://localhost:3000'
const socket = io(servers)

export default {
    data() {
        return {
            opponentName: '',
            playerIsReady: false,
        }
    },
    methods: {
        joinGame() {
            this.playerIsReady = true
            socket.emit('aPlayerJoined', this.$store.state.playerName)
            if (!this.opponentName) {
                this.isWaitingForAnotherPlayer = true
            } else {
                this.isWaitingForAnotherPlayer = false
                this.isReadyToJankenpon = true
            }
        },
        submitHand() {
            socket.emit('handSubmitted', this.$store.state.hand)
        },
        checkHand() {
            if (this.$store.state.hand) {
                this.submitHand();
                console.log(this.$store.state.hand)
            } else {
                alert('kosong bos')
            }
        }
    },
    created() {
        socket.on('sendJoinedPlayer', (player) => {
            this.opponentName = player
        }),
        socket.on('sendOpponentHand', (hand) => {
            this.$store.state.opponentHand = hand
        })
    },
    components: {
        FormName,
        Choice,
        ModalScore
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