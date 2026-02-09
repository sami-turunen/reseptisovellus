<script>
    import favicon from '$lib/assets/favicon.svg';

    // Otetaan vastaan 'children' propsina Svelte 5:n tapaan
    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>Reseptisivusto</title>
</svelte:head>

<main>
    {@render children()}
</main>