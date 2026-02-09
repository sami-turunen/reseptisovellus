# Reseptisovellus

### Tämä on yksinkertainen sovellus reseptien hallintaan

## Arkkitehtuuri:

- Frontend: **Svelte**
- Backend: **Node.js**
- Tietokanta: **MongoDB**

## Ominaisuudet:

- Reseptien lisääminen (sisältää nimen, ainesosat, ohjeen)
- Reseptien muokkaaminen
- Reseptien poisto

## Asennus:

1. Tarkista että `node` ja `npm` on asennettu:

```bash
node -v
npm -v
```

2. Kloonaa repositorio

```bash
git clone https://github.com/sami-turunen/reseptisovellus.git
```

3. Siirry backend kansioon

```bash
cd backend
```

4. Luo backend kansioon `.env`-tiedosto ja lisää sinne `MONGO_URI`-muuttuja muodossa:

```
MONGODB_URI=<Sinun_mongo_uri>
```

5. Asenna backend riippuvuudet

```
npm install
```

6. Käynnistä backend palvelin

```bash
node index.js
```

7. Avaa uusi terminal-ikkuna ja siirry siellä frontend kansioon

```bash
cd frontend
```

8. Asenna frontend riippuvuudet

```bash
npm install
```

9. Käynnistä frontend pavelin

```bash
npm run dev
```

10. Siirry selaimessa osoitteeseen `http://localhost:5173` (tai vastaava jonka terminal-ikkuna näytti), sovellus on valmiina käyttöön.


