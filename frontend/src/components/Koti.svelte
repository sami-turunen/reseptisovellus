<script>
    let {reseptit} = $state([{nimi: "Resepti 1"}, {nimi: "Resepti 2"}]);
    console.log($state.snapshot(reseptit));
</script>

<main>
    <h1>Reseptit</h1>
    <ul>
        {#each reseptit as resepti}
            <li>{resepti.nimi}</li>
        {/each}
    </ul>
</main>