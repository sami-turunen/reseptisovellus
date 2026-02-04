// src/lib/recipes.svelte.js
// Luodaan reaktiivinen taulukko, joka jaetaan sivujen kesken
export const recipeStore = $state({
  lista: [
    {
      id: 1,
      nimi: "Pasta Carbonara",
      ainesosat: ["pasta", "kananmuna", "pekoni"],
      ohje: "Keitä pasta ja sekoita ainekset.",
    },
    {
      id: 2,
      nimi: "Omenapiirakka",
      ainesosat: ["omena", "jauho", "sokeri"],
      ohje: "Paista uunissa 200 asteessa.",
    },
  ],
});
