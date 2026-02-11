<script>
  import { onMount } from 'svelte';

  let recipes = [];
  let newRecipe = { title: '', ingredients: '', instructions: '' };
  let loading = true;
  let editingRecipe = null;
  let modalVisible = false;

  const API_URL = 'http://localhost:5000/api/recipes';

  async function fetchRecipes() {
    try {
      const response = await fetch(API_URL);
      recipes = await response.json();
    } catch (error) {
      console.error("Virhe ladattaessa reseptejä:", error);
    } finally {
      loading = false;
    }
  }

  async function addRecipe() {
    if (!newRecipe.title) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe)
      });
      
      const savedRecipe = await response.json();
      recipes = [...recipes, savedRecipe];
      newRecipe = { title: '', ingredients: '' }; // Tyhjennetään lomake
    } catch (error) {
      console.error("Tallennus epäonnistui:", error);
    }
  }

  async function deleteRecipe(id) {
    console.log(recipes);
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        })
        recipes = recipes.filter(recipe => recipe._id !== id);
    } catch (error) {
        console.error("Reseptin poisto epäonnistui:", error);
    }
  }


  function openEditModal(recipe) {
    editingRecipe = {...recipe};
    modalVisible = true;
  }

  async function saveUpdate() {
    try {
        const response = await fetch(`${API_URL}/${editingRecipe._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingRecipe)
        })
        if (response.ok) {
            const updatedData = await response.json();
            recipes = recipes.map(recipe => recipe._id === editingRecipe._id ? updatedData : recipe);
            closeModal();
        }
    }
    catch (error) {
        console.error("Reseptin muokkaus epäonnistui:", error);
    }
  }

  function closeModal() {
    modalVisible = false;
    editingRecipe = null;
  }

  onMount(fetchRecipes);
</script>

<main>
  <header>
    <h1>Reseptit 🍳</h1>
  </header>

  <section class="recipe-form">
    <h2>Lisää uusi resepti</h2>
    <input bind:value={newRecipe.title} placeholder="Reseptin nimi" />
    <textarea bind:value={newRecipe.ingredients} placeholder="Ainesosat..."></textarea>
    <textarea bind:value={newRecipe.instructions} placeholder="Ohje..."></textarea>
    <button on:click={addRecipe} disabled={!newRecipe.title}>Tallenna resepti</button>
  </section>

  <hr />

  <!-- Reseptin muokkaus ikkuna -->
   {#if modalVisible && editingRecipe}
  <div class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" on:click={closeModal}>&times;</button>
      <h2>Muokkaa reseptiä</h2>
      
      <input bind:value={editingRecipe.title} />
      <textarea bind:value={editingRecipe.ingredients}></textarea>
      <textarea bind:value={editingRecipe.instructions}></textarea>
      
      <div class="modal-actions">
        <button class="save-btn" on:click={saveUpdate}>Tallenna muutokset</button>
        <button class="cancel-btn" on:click={closeModal}>Peruuta</button>
      </div>
    </div>
  </div>
{/if}

  {#if loading}
    <p>Haetaan herkkuja...</p>
  {:else}
    <div class="recipe-grid">
      {#each recipes as recipe}
        <article class="recipe-card">
          <h3>{recipe.title}</h3>
          <p>Ainesosat: {recipe.ingredients || "Ei ainesosia"}</p>
          <p>Ohje: {recipe.instructions || 'Ei ohjeita listattu.'}</p>
          <button class="delete-btn" on:click={() => deleteRecipe(recipe._id)}>Poista resepti</button>
          <button on:click={() => openEditModal(recipe)}>Muokkaa resepti</button>
        </article>
      {:else}
        <p>Ei reseptejä.</p>
      {/each}
    </div>
  {/if}
</main>

<style>
  :global(body) {
    background-color: #f4f1ea;
    color: #333;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }

  .recipe-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  input, textarea {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
  }

  textarea {
    height: 100px;
    resize: vertical;
  }

  button {
    background-color: #2ecc71;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
  }

  button:hover {
    background-color: #27ae60;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .delete-btn {
    background-color: #e74c3c;
  }

  .delete-btn:hover, .close-btn:hover {
    background-color: #c0392b;
  }

  .recipe-grid {
    display: grid;
    gap: 20px;
    margin-top: 2rem;
  }

  .recipe-card {
    background: white;
    padding: 1rem;
    border-left: 5px solid #f1c40f;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  h3 { margin-top: 0; color: #e67e22; }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    position: relative;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    color: #333;
    font-size: 1.5rem;
  }
</style>