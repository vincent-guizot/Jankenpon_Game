<template>
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
            <p>You: {{ $store.state.hand }}</p>
            <p v-if="$store.state.opponentHand">
                Opponent: {{ $store.state.opponentHand }}
            </p>
            <p v-if="!$store.state.opponentHand">
                Please wait your opponent
            </p>
            <div v-if="$store.state.hand && $store.state.opponentHand">
                <b>
                    <p v-if="scoring() === 'draw'">Draw</p>
                    <p v-if="scoring() === 'win'">You Win</p>
                    <p v-if="scoring() === 'lose'">You Lose</p>
                </b>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="resetHand">Close</button>
        </div>
        </div>
    </div>
    </div>
    <!-- End Modal -->
</template>

<script>
export default {
    methods: {
        resetHand() {
            this.$store.state.hand = '';
            this.$store.state.opponentHand = '';
        },
        scoring() {
            const state = this.$store.state;
            const win = 
            (state.opponentHand === 'scissors' && state.hand === 'rock') ||
            (state.opponentHand === 'rock' && state.hand === 'paper') ||
            (state.opponentHand === 'paper' && state.hand === 'scissors');

            const lose =
            (state.hand === 'scissors' && state.opponentHand === 'rock') ||
            (state.hand === 'rock' && state.opponentHand === 'paper') ||
            (state.hand === 'paper' && state.opponentHand === 'scissors');

            if (state.opponentHand === state.hand) {
                return 'draw';
            } else if (win) {
                return 'win';
            } else if (lose) {
                return 'lose';
            }
        }
    }
}
</script>