<script setup>
import { ref, computed } from "vue";
import pokemon from "@/components/pokemonItem.vue";
import pokemonDetail from "@/components/pokemonDetail.vue";
import { fetchAPI } from "@/utils";

let pokemons = [];
const offset = ref(0);
const number_of_render = 12;
const filteredPokemons = ref([]);
const renderPokemons = computed(() =>
  filteredPokemons.value.slice(0, offset.value + number_of_render)
);
async function fetchPokemons() {
  const data = await fetchAPI("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898");
  pokemons = data.results;
  filteredPokemons.value = pokemons;
}
fetchPokemons();

function handleLoadMore() {
  offset.value += number_of_render;
}
function handleSearch(event) {
  filteredPokemons.value = pokemons.filter((pokemon) => {
    return pokemon.name.includes(event.target.value);
  });
  offset.value = 0;
}
</script>
<template>
  <div class="container">
    <pokemonDetail v-if="selectedPokemon" />
    <template v-else>
      <div class="header">
        <p class="heading">Pokemon API</p>
        <input
          class="search"
          type="text"
          placeholder="Enter your keyword here..."
          @input="handleSearch"
        />
      </div>
      <div class="app">
        <pokemon v-for="pokemon in renderPokemons" :key="pokemon.name" :url="pokemon.url" />
      </div>
      <button
        v-show="filteredPokemons.length > number_of_render"
        class="button"
        @click="handleLoadMore"
      >
        Load More
      </button>
    </template>
  </div>
</template>
<style>
body {
  background-color: #fff;
}
.container {
  max-width: 1200px;
  margin-inline: auto;
  font-family: Arial, Helvetica, sans-serif;
  margin-block: 50px;
  font-size: 15px;
  color: #2c3e50;
}
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.heading {
  margin-bottom: 50px;
  font-size: 37.5px;
  font-weight: 400;
}
.search {
  display: flex;
  justify-content: center;
  max-width: 500px;
  width: 100%;
  margin: 0 15px 50px;
  padding: 20px;
  border-radius: 30px;
  outline: 1px solid #00000036;
  box-shadow: #64646f33 0 7px 29px;
  font-size: 16px;
  border: none;
  transition: all 0.2s ease;
}
.app {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
.button {
  display: block;
  margin-inline: auto;
  font-size: 16px;
  color: #fff;
  margin-top: 50px;
  cursor: pointer;
  padding: 20px 25px;
  border-radius: 10px;
  background-color: #ff4d4f;
  border: none;
}
</style>
