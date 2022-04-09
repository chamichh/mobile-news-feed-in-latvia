import React, { useEffect, useState } from 'react';
import {Linking,TouchableOpacity, Image, ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      'https://newsapi.org/v2/top-headlines?country=lv&apiKey=e683bec85cf74cb38f6d8332c935fa52'
    )
      .then((response) => response.json())
      .then((json) => setData(json.articles))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#333333', padding: 10 }}>
    <Text style={{ marginTop: 5, marginBottom: 5, color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}> Jaunākās ziņas Latvijā un Pasaulē </Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View
              style={{ marginTop: 15, backgroundColor: '#C2C2B4', padding: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                {item.title} {item.id} {"\n"}
              </Text>
              <Text>
                <View>
                <TouchableOpacity onPress={() =>Linking.openURL(item.url)}>
                  <Image style = {{alignItems: 'center', justifyContent: 'center', width: 350, height: 170}}
                    source={{ uri: item.urlToImage }}
                    
                      />
                  </TouchableOpacity>
                </View>
                 {"\n"} {item.description}
                 {"\n"}
                 {"\n"}Publicēts: {item.publishedAt}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}