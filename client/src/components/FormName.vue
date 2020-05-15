<template lang="">
    <div class="text-center inputName">
        <div v-if="!opponentName || !playerIsReady">
            <form @submit.prevent="joinGame">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Please insert your name" required v-model="$store.state.playerName">
                <div class="input-group-append">
                    <button class="btn btn-secondary" type="submit" id="button-addon2">Play</button>
                </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: ['opponentName', 'playerIsReady', 'joinGame'],
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