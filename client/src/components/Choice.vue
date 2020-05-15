<template>
    <div v-if="opponentName && $store.state.playerName && playerIsReady">
        <p>{{ $store.state.playerName }} vs {{ opponentName }}</p>
        <form @submit.prevent="submitHand">
            <div class="form-check">
                <input class="form-check-input" type="radio" id="exampleRadios1" value="rock" v-model="$store.state.hand" name="hand" required>
                <label class="form-check-label" for="exampleRadios1">
                    Rock
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" id="exampleRadios2" value="paper" v-model="$store.state.hand" name="hand" required>
                <label class="form-check-label" for="exampleRadios2">
                    Paper
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" id="exampleRadios3" value="scissors" v-model="$store.state.hand" name="hand" required>
                <label class="form-check-label" for="exampleRadios3">
                    Scissors
                </label>
            </div>

            <div class="form-check">
                <input class="btn btn-primary" type="submit" data-toggle="modal" data-target="#exampleModal" value="GO, JANKENPON !">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: ['opponentName', 'playerIsReady', 'submitHand'],
}
</script>