// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Otetaan käyttöön "react" niminen kirjasto sovelluksen käytettäväksi.
import { View, Image, Text, StyleSheet } from 'react-native'; // Otetaan käyttöön kyseiset komponentit "react-native" kirjaston kautta sovelluksen käytettäväksi.

import TextStyling from './TextStyling';
import styling from '../styling';


const formatValue = (getValue) => {

  const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
  const tier = Math.log10(Math.abs(getValue)) / 3 | 0;

  if (tier === 0) {
    return getValue;
  };

  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  const scaled = getValue / scale;

  return scaled.toFixed(1) + suffix;

};

const repositoriesContainer = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: 'white',
  }
});

const repositoriesAvatarStyling = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    marginTop: 10,
    marginLeft: 10
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,

  },
  infoContainer: {
    flexGrow: 1
  }
});

const repositoriesTagStyling = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: '#0465d1',
    borderColor: '#0465d1',
    borderRadius: 3,
    marginTop: 5,
    marginLeft: 70
  },
  content: {
    fontFamily: styling.fonts.main,
    fontSize: styling.fontSizes.tag,
    color: 'white',
    padding: 5
  }
});

const repositoriesDataStyling = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-evenly',
    marginTop: 8,
    marginBottom: 8
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  data: {
    fontWeight: styling.fontWeights.bold
  }
});

// Alustetaan "RepositoryItem" niminen komponentti, joka suorittaa {...} sisällä olevat asiat aina,
// kun kyseiseen komponenttiin tehdään viittaus. Komponentin ideana on siis renderöidä jokainen arvo
// "repositories" muuttujan kautta tulevasta datasta takaisin käyttäjälle näkyviin. Komponentti
// "ItemSeparator" määrittää tyylin, jokaiselle eri arvolle, jonka kautta tämä komponentti pääsee
// käsiksi "item" parametrin avulla.
const RepositoryItem = ({ item }) => {

  const AvatarContainer = () => {
    return (
      <View style={repositoriesAvatarStyling.container}>

        <View style={repositoriesAvatarStyling.avatarContainer}>
          <Image style={repositoriesAvatarStyling.avatar} source={{uri: item.ownerAvatarUrl}} />
        </View>

        <View style={repositoriesAvatarStyling.infoContainer}>
          <TextStyling fontWeight="bold" fontSize="subheading">{item.fullName}</TextStyling>
          <TextStyling color="textSecondary">{item.description}</TextStyling>
        </View>

      </View>
    );
  };

  const TagContainer = () => {
    return (
      <View style={repositoriesTagStyling.container}>
        <Text style={repositoriesTagStyling.content}>{item.language}</Text>
      </View>
    );
  };

  const DataContainer = () => {
    return (
      <View style={repositoriesDataStyling.container}>
        <View style={repositoriesDataStyling.content}>
          <Text style={repositoriesDataStyling.data}>{formatValue(item.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={repositoriesDataStyling.content}>
          <Text style={repositoriesDataStyling.data}>{formatValue(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={repositoriesDataStyling.content}>
          <Text style={repositoriesDataStyling.data}>{formatValue(item.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={repositoriesDataStyling.content}>
          <Text style={repositoriesDataStyling.data}>{formatValue(item.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    );
  };


  // Komponentti renderöi (...) sisällä olevat asiat takaisin käyttäjälle näkyviin.
  return (
    <View style={repositoriesContainer.container}>
      <AvatarContainer />
      <TagContainer />
      <DataContainer />
    </View>
  );
};

// Viedään (export) alla oleva komponentti (RepositoryItem) sovelluksen käytettäväksi, jotta esim. "App.js" tiedosto pystyy suorittamaan kyseiset funktiot.
export default RepositoryItem;
