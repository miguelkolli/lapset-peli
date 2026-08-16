# Lasten pelit

Repossa on neljä peliä:

- **Alman Piirtopeli** (`piirtopeli.html`) – piirrä yksin tai yhdessä käyttäen kyniä, värejä, tasoja, tarroja ja omia kuvia.
- **Elsan Taistelupeli** (`taistelupeli.html`) – kahden tiimin palikkataistelu kolmella eri kentällä.
- **Alma ja Elsa seikkailee** (`alma-elsa-seikkailee.html`) – moninpeliseikkailu kahdeksassa maailmassa.
- **Pukupeli** (`pukupeli.html`) – hahmon ulkoasun ja asun suunnittelupeli.

`index.html` on pelivalikko. `vercel.json` määrittää HTML-tiedostot Vercelin staattisiksi sivuiksi.

## Moninpeli

Piirtopeli, taistelupeli ja seikkailupeli käyttävät Liveblocksia. Pelaajat kirjoittavat saman huonekoodin ja liittyvät huoneeseen. Piirtopeli tallentaa piirrosoperaatiot yhteiseen Liveblocks-tallennustilaan, joten myös myöhemmin liittyvä pelaaja saa olemassa olevan piirroksen. Taistelu- ja seikkailupeli välittävät pelaajien sijainnit ja muun pelitilan presence-tietoina. Taistelupelin hyökkäykset kulkevat Liveblocks-tapahtumina.

## Uuden pelin lisääminen

1. Lisää uuden pelin HTML-tiedosto repojuureen.
2. Lisää `index.html`-tiedoston `.games`-elementtiin uusi `.card`-linkki, jonka `href` osoittaa pelin HTML-tiedostoon.
3. Lisää kortille kuvake, nimi, lyhyt kuvaus ja pelipainikkeen teksti.
4. Testaa linkki sekä tietokoneen että puhelimen kokoisessa selainikkunassa.

## Testikierros 2026-08-16

Löydetyt ja korjatut virheet:

- Piirtopelin moninpeli kaatui liittyessä, koska Liveblocks-listalta kutsuttiin puuttuvaa `toJSON()`-metodia. Kutsut vaihdettiin käytössä olevan Liveblocks-version `toArray()`-metodiin.
- Piirtopelin uusi tyhjä layer oli vain paikallinen, kunnes sille piirrettiin. Layerin luonti lisättiin yhteisiin piirrosoperaatioihin, joten se näkyy heti kaikille ja myös myöhemmin liittyville.
- Taistelupelin oma Liveblocks-yhteystunnus saattoi jäädä tyhjäksi. Silloin verkon yli lähetetyt osumat eivät osuneet kohteeseen. Tunnus päivitetään nyt myös vastapelaajalistan saapuessa.
- Piirtopelin pointer capture suojattiin selaimen poikkeukselta, jotta poikkeava tai keskeytynyt kosketustapahtuma ei aiheuta JavaScript-runtime-virhettä.

Testikierroksella tarkistettiin pelivalikon neljä linkkiä, piirtopelin työkalut ja tallennus, piirtopelin kahden ikkunan synkronointi, taistelupelin ohjaimet ja molempien aseiden verkko-osumat, voittotila sekä näkymät koossa 390 × 844 ja 430 × 932. Vanhoihin seikkailu- ja pukupelin toimintoihin ei tehty muutoksia.
