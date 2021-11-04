<template>
  <div id="app">

    <!-- Sidebar -->
    <div id="sidebar">
      <div class="sidebar-top">
        <img src="./assets/logo.svg" alt="Ideasoft">
        <button><i class="icon-menu"></i></button>
      </div>
      <ul class="year-filters">
        <li><a href="#" @click.prevent="setYear('2021')">2021 Filmleri</a></li>
        <li><a href="#" @click.prevent="setYear('2020')">2020 Filmleri</a></li>
        <li><a href="#" @click.prevent="setYear('2019')">2019 Filmleri</a></li>
        <li><a href="#" @click.prevent="setYear('2018')">2018 Filmleri</a></li>
        <li><a href="#" @click.prevent="setYear('2017')">2017 Filmleri</a></li>
        <li><a href="#" @click.prevent="setYear('2016')">2016 Filmleri</a></li>
      </ul>
    </div>
    <!--#Sidebar -->

    <!-- Main -->
    <div id="main">
      <div class="top-navbar"></div>
      <div class="main-content">
        <div class="breadcrumb">
          <a href="#">
            <i class="icon-arrow-left"></i> <span>Anasayfa</span>
          </a>
        </div>

        <h1>IMDB Filmleri {{ loading ? 'Yükleniyor' : '' }}</h1>

        <!-- Search Card -->
        <div class="card">
          
          <div class="card-header">
            <div class="categories">
              <a href="#">Tümü</a>
            </div>
            <div class="actions">
              <a href="#" @click.prevent="search"><i class="icon-refresh"></i></a>
            </div>
          </div>
          
          <div class="card-body">

            <!-- Search Input -->
            <div class="search-input">
              <div class="label">Arama Yap</div>
              <div class="icon"><i class="icon-search"></i></div>
              <input type="text" v-model="keyword" v-debounce:300ms="search">
            </div>
            <!--#Search Input -->

            <!-- Search Filters -->
            <div class="filters">
              <div class="filter" v-if="keyword && keyword.length">
                Arama : {{ keyword }}
                <div class="remove" @click="removeFilter('keyword')">
                  <i class="icon-close"></i>
                </div>
              </div>
              <div class="filter" v-if="year">
                Yıl : {{ year }}
                <div class="remove" @click="removeFilter('year')">
                  <i class="icon-close"></i>
                </div>
              </div>
            </div>
            <!--#Search Filters -->

            <!-- Table Info -->
            <div class="table-info">
              <span>{{ selectedRows.length }} adet seçili</span>

              <pagination v-model="currentPage" :total="totalRows" :per-page="perPage" @change="search" />
            </div>
            <!--#Table Info -->

            <!-- Results -->
            <table class="results-table">
              <thead>
                <th style="width: 20px;">
                  <td><checkbox v-model="allSelected"></checkbox></td>
                </th>
                <th>
                  <td><i class="icon-image"></i></td>
                </th>
                <th>
                  <td>ID</td>
                </th>
                <th>
                  <td>Adı</td>
                </th>
                <th>
                  <td>Yılı</td>
                </th>
              </thead>
              <tbody>
                <tr v-for="(movie, key) in movies" :key="key">
                  <td><checkbox v-model="movie.selected" @change="checkAllSelected" /></td>
                  <td><img :src="movie.Poster" height="42"></td>
                  <td>{{ movie.imdbID }}</td>
                  <td><a href="#" @click.prevent="openMovieDetail(movie)">{{ movie.Title }}</a></td>
                  <td>{{ movie.Year }}</td>
                </tr>
              </tbody>
            </table>
            <!--#Results -->

            <!-- Pagination -->
            <div class="table-info">
              <span>{{ selectedRows.length }} adet seçili</span>

              <pagination v-model="currentPage" :total="totalRows" :per-page="perPage" @change="search" />
            </div>
            <!--#Pagination -->
          </div>

        </div>
        <!--#Search Card -->

      </div>
    </div>
    <!--#Main -->

    <transition name="fade">
      <movie-modal v-if="showMovieModal" :movie="detailedMovie" @close="showMovieModal = false" />
    </transition>

  </div>
</template>

<script>
import MovieModal from './components/MovieModal';
import axios from 'axios';
export default {
  name: "App",
  components: { MovieModal },
  data() {
    return {
      keyword: '',
      year: null,
      currentPage: 1,
      perPage: 10,
      totalRows: 1,
      allSelected: false,
      movies: [],
      loading: false,
      detailedMovie: {},
      showMovieModal: false,
    }
  },
  computed: {
    selectedRows() {
      return this.movies.filter(i => i.selected);
    }
  },
  methods: {
    openMovieDetail(movie) {
      this.detailedMovie = movie;
      this.showMovieModal = true;
    },
    checkAllSelected() {
      if( this.selectedRows.length && this.selectedRows.length === this.movies.length ) {
        this.allSelected = true;
      }
    },
    setYear(y) {
      this.year = y;
      this.search();
    },
    removeFilter(type) {
      if( type === 'keyword' ) {
        this.keyword = '';
      } else if ( type === 'year' ) {
        this.year = null;
      } else {
        console.log('hatali giris');
      }
      this.search();
    },
    search() {
      if( !this.keyword || this.keyword.length < 3 ) {
        this.movies = [];
        this.totalRows = 1;
        return true;
      }

      this.loading = true;
      this.movies = [];
      const params = this.prepareParameters();
      axios.get('http://www.omdbapi.com', {
        params,
      }).then(data => data.data).then(response => {
        if( response.Response === 'False' ) {
          alert('Hiç sonuç bulunamadı!');
          this.movies = [];
          this.totalRows = 1;
          this.loading = false;
          return true;
        }

        this.movies = response.Search;
        this.totalRows = response.totalResults;
        this.loading = false;
      });
    },
    prepareParameters() {
      const params = {
        apikey: '42f0a277',
        page: this.currentPage,
      };

      if( this.year ) {
        params.y = this.year;
      }

      if( this.keyword && this.keyword.length ) {
        params.s = this.keyword;
      }

      return params;
    }
  },
  watch: {
    allSelected() {
      const newValue = JSON.parse(JSON.stringify(this.allSelected));
      this.movies = this.movies.map(item => {
        item.selected = newValue;
        return item;
      });
    }
  }
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
