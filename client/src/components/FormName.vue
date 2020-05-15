<template lang="">
    <div class="text-center inputName">

        <div>
            <h1 class="title my-5">JANKENPON</h1>
            <p>A Japanese Local game, simple Paper, Rock, Scissors game</p>
        </div>

        <div v-if="!opponentName || !playerIsReady">
            <form @submit.prevent="joinGame">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Please insert your name" required v-model="playerName">
                <div class="input-group-append">
                    <button class="btn btn-secondary" type="submit" id="button-addon2">Play</button>
                </div>
                </div>
            </form>
        </div>

        <p v-if="playerIsReady && !opponentName">Please wait... Waiting another player to join</p>

        <div v-if="opponentName && playerName && playerIsReady">
            <p>{{ playerName }} vs {{ opponentName }}</p>
            <form @submit.prevent="submitHand">
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="exampleRadios1" value="rock" v-model="hand" name="hand" required>
                    <label class="form-check-label" for="exampleRadios1">
                        Rock
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="exampleRadios2" value="paper" v-model="hand" name="hand" required>
                    <label class="form-check-label" for="exampleRadios2">
                        Paper
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="exampleRadios3" value="scissors" v-model="hand" name="hand" required>
                    <label class="form-check-label" for="exampleRadios3">
                        Scissors
                    </label>
                </div>

                <div class="form-check">
                    <button class="btn btn-primary" type="submit" data-toggle="modal" data-target="#exampleModal">GO, JANKENPON !</button>
                </div>
            </form>
        </div>

        <!-- Start Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Result</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>You: {{ hand }}</p>
                <p v-if="opponentHand">Opponent: {{ opponentHand }}</p>
                <p v-if="!opponentHand">Please wait your opponent</p>
                <div v-if="hand && opponentHand">
                    <b>
                        <p v-if="opponentHand === hand">Draw</p>
                        <p v-if="(opponentHand === 'scissors' && hand === 'rock') || (opponentHand === 'rock' && hand === 'paper') || (opponentHand === 'paper' && hand === 'scissors')">You Win</p>
                        <p v-if="(hand === 'scissors' && opponentHand === 'rock') || (hand === 'rock' && opponentHand === 'paper') || (hand === 'paper' && opponentHand === 'scissors')">You Lose</p>
                    </b>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
        <!-- End Modal -->

    </div>
</template>

<script>
import io from 'socket.io-client'
const servers = 'http://localhost:3000'
const socket = io(servers)

export default {
    data() {
        return {
            opponentName: '',
            playerName: '',
            playerIsReady: false,
            hand: '',
            opponentHand: ''
        }
    },
    methods: {
        joinGame() {
            this.playerIsReady = true
            socket.emit('aPlayerJoined', this.playerName)
            if (!this.opponentName) {
                this.isWaitingForAnotherPlayer = true
            } else {
                this.isWaitingForAnotherPlayer = false
                this.isReadyToJankenpon = true
            }
        },
        submitHand() {
            socket.emit('handSubmitted', this.hand)
        }
    },
    created() {
        socket.on('sendJoinedPlayer', (player) => {
            this.opponentName = player
        }),
        socket.on('sendOpponentHand', (hand) => {
            this.opponentHand = hand
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