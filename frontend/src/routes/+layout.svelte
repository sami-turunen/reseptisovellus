<script>
    import favicon from '$lib/assets/favicon.svg';

    // Otetaan vastaan 'children' propsina Svelte 5:n tapaan
    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>Reseptisivusto</title>
</svelte:head>

<header>
    <h1>Reseptien jakosovellus</h1>
    <nav>
        <ul>
            <li><a href="/">Etusivu</a></li>
            <li><a href="/lisaa-resepti">Lisää resepti</a></li>
            <li><a href="/kirjautuminen">Kirjautuminen</a></li>
        </ul>
    </nav>
</header>

<main>
    {@render children()}
</main>

<style>
    header {
        background-color: #333;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
    }

    ul {
        display: flex;
        list-style: none;
        gap: 1.5rem;
        margin: 0;
        padding: 0;
    }

    a {
        color: white;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    main {
        padding: 2rem;
        max-width: 1000px;
        margin: 0 auto;
    }
</style>