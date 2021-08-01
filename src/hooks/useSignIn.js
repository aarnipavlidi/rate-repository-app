// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import { useMutation } from '@apollo/client' // Sovellus ottaa käyttöön kyseiset funktiot "@apollo/client" kirjaston kautta.
import { USER_LOGIN } from '../graphql/mutations'; // Otetaan kyseiset mutaatiot sovelluksen käytettäväksi "queries.js" tiedoston kautta.

// https://www.apollographql.com/docs/react/api/react/hooks/#useapolloclient
import { useApolloClient } from '@apollo/client'; // Otetaan käyttöön "useApolloClient" funktio kyseisen kirjaston kautta sovelluksen ajaksi.
import useAuthStorage from '../hooks/useAuthStorage'; // Alustetaan "useAuthStorage" funktio, joka hyödyntää "useAuthStorage.js" tiedoston sisältöä sovelluksen aikana.

// Alustetaan "useSignIn" niminen hookki, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen hookkiin tehdään viittaus. Hookki siis hakee palvelimesta sen hetkisen
// kirjautuneen käyttäjän tiedot, ja jos löytyy dataa niin se palauttaa takaisin datan,
// joka vittaa kyseiseen käyttäjään. Tehtävän "Exercise 10.13: the sign in form mutation"
// osalta se palauttaa takaisin "accessToken" objekin arvon.
const useSignIn = () => {

  // Alla olevan muuttujan avulla pääsemme käsiksi välimuistissa olevaan
  // dataan ja vaikuttamaan siihen esim. poistamalla tiettyjä asioita yms.
  const client = useApolloClient(); // Alustetaan "client" muuttuja, joka suorittaa kyseisen funktion.
  const authStorage = useAuthStorage(); // Alustetaan "authStorage" muuttuja, joka suorittaa kyseisen funktion.

  // Alustetaan "getUserCredentials" muuttuja, joka suorittaa kyseisen mutaation,
  // kun siihen tehdään viittaus. Jos mutaatio onnistuu eli se palauttaa takaisin
  // datan, niin me pääsemme siihen käsiksi "result" muuttujan avulla.
  const [getUserCredentials, result] = useMutation(USER_LOGIN);

  // Alustetaan "signIn" funktio, joka suorittaa {...} sisällä olevat asiat
  // aina kun kyseiseen funktioon tehdään viittaus. Funktio saa käyttöönsä
  // "username" sekä "password" parametrien arvot funktion suorittamista varten.
  const signIn = async ({ username, password }) => {

    // Alustetaan "response" muuttuja, joka suorittaa kyseisen funktion (eli
    // mutaation). Funktio käyttää "variables.userLoginData", koska olimme
    // aikaisemmin alustaneet kyseisen objektin arvo, joka hyödyntää siis
    // "AuthorizeInput" input:in tyyppiä eli sieltä löytyy sekä "username"
    // että "password", joiden molempien täytyy olla "String" muodossa.
    const response = await getUserCredentials({
      variables: {
        userLoginData: {
          username, password
        }
      }
    });

    // Jos "response" muuttujasta löytyy dataa, niin palautetaan takaisin
    // "response" muuttujan arvo, ja muussa tapuksessa palautetaan errori,
    // joka tulostaa alla olevan tekstin takaisin käyttäjälle näkyviin.
    if (response.data) {
      // Jos "response" muuttusta löytyy dataa, niin me suoritetaan alla olevan
      // funktion eli olimme aikaisemmin alustaneet tiedoston "authStorage.js"
      // mistä löytyy tämä kyseinen funktio eli "setAccessToken(...)". Olimme
      // myös antaneet kyseiselle funktion arvolla parametrin arvoksi =>
      // "accessToken", joka saa arvoksi => "response.data.authorize.accessToken".
      await authStorage.setAccessToken(response.data.authorize.accessToken);
      // Alla oleva funktio siis poistaa kaiken datan välimuistista (cache)
      // ja suorittaa uudestaan kaikki "aktiiviset" queryt eli tässä tapauksessa
      // hakee kaikki "repositories" arvot palvelimesta ja näyttää ne takaisin
      // käyttäjälle näkyviin. Tämän avulla voidaan siis varmistaa, että sen
      // hetkisen kirjautuneen käyttäjän data ei jää välimuistiin "roikkumaan".
      client.resetStore();
      return response;
    } else {
      // Alla oleva funktio siis poistaa kaiken datan välimuistista (cache)
      // ja suorittaa uudestaan kaikki "aktiiviset" queryt eli tässä tapauksessa
      // hakee kaikki "repositories" arvot palvelimesta ja näyttää ne takaisin
      // käyttäjälle näkyviin. Tämän avulla voidaan siis varmistaa, että sen
      // hetkisen kirjautuneen käyttäjän data ei jää välimuistiin "roikkumaan".
      client.resetStore();
      throw new Error('Could not find token for this current user, please try again!');
    };
  };

  // "useSignIn" hookki palauttaa takaisin [...] sisällä olevat muuttujat muiden komponenttien käytettäväksi.
  return [signIn, result]
};

// Viedään (export) alla oleva hookki (useSignIn) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default useSignIn;
