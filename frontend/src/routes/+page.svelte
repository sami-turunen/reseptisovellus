<script>
    import { onMount } from 'svelte';

    let reseptit = $state([]);
    let hakusana = $state("");

    // Haetaan tiedot tietokannasta
    async function haeReseptit() {
        const res = await fetch('http://localhost:5000/api/recipes');
        reseptit = await res.json();
    }

    onMount(haeReseptit);

    let naytettavat = $derived(
        reseptit.filter(r => 
            r.ainesosat.some(a => a.toLowerCase().includes(hakusana.toLowerCase())) || 
            hakusana === ""
        )
    );

    async function poista(id) {
        if (confirm("Haluatko varmasti poistaa reseptin?")) {
            await fetch(`http://localhost:5000/api/recipes/${id}`, { method: 'DELETE' });
            haeReseptit(); // Päivitä lista
        }
    }
</script>

<h1>Tietokannan reseptit</h1>
<input type="text" bind:value={hakusana} placeholder="Hae ainesosalla..." />

<div class="grid">
    {#each naytettavat as r (r._id)}
        <div class="card">
            <h3>{r.nimi}</h3>
            <p><strong>Ainesosat:</strong> {r.ainesosat.join(", ")}</p>
            <button onclick={() => poista(r._id)}>Poista</button>
        </div>
    {/each}
</div>

<style>
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
    .card { border: 1px solid #ddd; padding: 1rem; border-radius: 8px; }
</style>