<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchAPI } from "@/utils";

const router = useRouter();
const props = defineProps(["url"]);

const pokemon = ref({});

fetchAPI(props.url).then((data) => {
  pokemon.value = data;
});
async function fetchPokemon() {
  pokemon.value = await fetchAPI(props.url);
}
function viewPokemonDetail() {
  sessionStorage.setItem("selectdPokemon", JSON.stringify(pokemon.value.name));
  router.push("/" + pokemon.value.name);
}
onMounted(fetchPokemon);
</script>
<template>
  <div class="item" @click="viewPokemonDetail">
    <div class="item__id">#{{ pokemon.id }}</div>
    <div
      class="item__image"
      :style="`background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png');`"
    ></div>
    <div class="item__name">{{ pokemon.name }}</div>
    <div class="type">
      <span
        v-for="type in pokemon.types"
        :key="type.type.name"
        class="type__name"
        :class="type.type.name"
      >
        {{ type.type.name }}
      </span>
    </div>
  </div>
</template>
<style>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15%;
  padding: 10px 5px;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: #0000001a 0 4px 12px;
  text-transform: capitalize;
  transition: 0.3s;
}
.item:hover {
  box-shadow: #39393f33 0 7px 29px;
  transition: 0.3s;
}
.item__image {
  background-size: cover;
  background-position: center;
  width: 175px;
  height: 175px;
}
.item__name {
  text-align: center;

  box-shadow: none;
  font-weight: 700;
  font-size: 17px;
}
.type {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  margin-top: 5px;
}
.type > * {
  text-transform: capitalize;
  /* width: 100%; */
  margin-bottom: 5px;
  padding: 7px;
  border-radius: 7px;
  color: #2c2c2c;
  font-size: 12px;
  font-weight: bold;
}

@media only screen and (min-width: 10px) {
  .item {
    width: 40%;
  }
}

@media only screen and (min-width: 768px) {
  .item {
    width: 30%;
  }
}

@media only screen and (min-width: 960px) {
  .item {
    width: 20%;
  }
}

@media only screen and (min-width: 1200px) {
  .item {
    width: 15%;
  }
}

.normal {
  background-color: #a8a77a;
}

.fighting {
  background-color: #c22e28;
}

.flying {
  background-color: #a98ff3;
}

.poison {
  background-color: #a33ea1;
}

.ground {
  background-color: #e2bf65;
}

.rock {
  background-color: #b6a136;
}

.bug {
  background-color: #a6b91a;
}

.ghost {
  background-color: #735797;
}

.steel {
  background-color: #b7b7ce;
}

.fire {
  background-color: #ff421c;
}

.water {
  background-color: #6390f0;
}

.grass {
  background-color: #78cd54;
}

.electric {
  background-color: #f7d02c;
}

.psychic {
  background-color: #f95587;
}

.ice {
  background-color: #96d9d6;
}

.dragon {
  background-color: #6f35fc;
}

.dark {
  background-color: #705746;
}

.fairy {
  background-color: #d685ad;
}

.unknow {
  background-color: #68a090;
}

.shadow {
  background-color: #735797;
}
</style>
