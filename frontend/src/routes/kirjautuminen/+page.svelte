<script>
    let tunnus = $state("");
    let salasana = $state("");

    function kirjaudu() {
        console.log("Kirjautuminen:", tunnus);
        // Tähän tulisi backend-kutsu
    }
</script>

<h2>Kirjaudu sisään</h2>
<div class="login-form">
    <input type="text" bind:value={tunnus} placeholder="Käyttäjätunnus" />
    <input type="password" bind:value={salasana} placeholder="Salasana" />
    <button onclick={kirjaudu}>Kirjaudu</button>
</div>

<style>
    .login-form { display: flex; flex-direction: column; gap: 1rem; max-width: 300px; }
    input { padding: 0.5rem; }
</style>