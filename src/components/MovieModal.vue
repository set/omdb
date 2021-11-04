<template>
  <div class="modal">
    <div class="modal-content movie-detail-modal">
      <div class="close">
        <a href="#" @click.prevent="$emit('close')"><i class="icon-close"></i></a>
      </div>
      <img :src="movie.Poster" :alt="movie.Title">
      <div class="text-area">
        <h2>{{ movie.Title }}</h2>
        <span class="category">Drama</span>
        
        <div class="additional-info">
          <p><b>Yönetmen :</b> Frank Darabont</p>
          <p><b>Oyuncular :</b> Tim Robbins, Morgan Freeman, Bob Gunton</p>
          <p><b>Puan :</b> 9.3</p>
        </div>

        <div class="summary">
          <p>
            <b>Özet</b> <br>
            Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['movie'],
}
</script>