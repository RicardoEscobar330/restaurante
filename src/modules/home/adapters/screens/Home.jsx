import { StyleSheet, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Image, AirbnbRating } from '@rneui/base';
import FlatListRestaurants from './components/FlatListRestaurants';
import { collection, getFirestore, getDocs} from 'firebase/firestore';

export default function Home() {
  const [restaurants, setRestaurants] = useState(null)
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const db = getFirestore();
    (async() => {
      const arrayRestaurants = [];
      const querySnapshot = await getDocs(collection(db, "restaurants"));
      const data = []
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
        //console.log(doc.id, " => ", doc.data());
        arrayRestaurants.push({
          id: doc.id,
          image: doc.data().image,
          title: doc.data().title,
          description: doc.data().description,
          rating: doc.data().rating
        })
      });
      setRestaurants(arrayRestaurants);
    })()
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        renderItem={({item}) => 
          <FlatListRestaurants
            image={item.image}
            title={item.title}
            description={item.description}
            rating={item.rating}
          />
      }
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,

  },
  row: {
    flexDirection: 'row',
    elevation: 3,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 8,
    borderRadius: 8
  },
  image: {
    width: 124,
    height: 124,
    borderRadius: 8
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 12,
  },
})