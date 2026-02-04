<script>
    import { goto } from '$app/navigation';

    let nimi = $state("");
    let ainesosatStr = $state("");
    let ohje = $state("");

    async function tallenna() {
        const uusi = {
            nimi,
            ainesosat: ainesosatStr.split(",").map(a => a.trim()),
            ohje
        };

        const res = await fetch('http://localhost:5000/api/recipes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(uusi)
        });

        if (res.ok) {
            goto('/');
        }
    }
</script>

<form onsubmit={tallenna}>
    <input bind:value={nimi} placeholder="Nimi" required />
    <input bind:value={ainesosatStr} placeholder="Ainesosat (pilkulla erotettuna)" required />
    <textarea bind:value={ohje} placeholder="Ohje"></textarea>
    <button type="submit">Tallenna MongoDB:hen</button>
</form>