import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import PageHeader from '../../components/PageHeader';
import ClassItem, { Class } from '../../components/ClassItem';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native'
import styles from './styles'

function Favorites() {
    const [ favorites, setFavorites ] = useState([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) setFavorites(JSON.parse(response));
        });
    }
    
    useFocusEffect(() => {
        loadFavorites();
    });

    return (
        <View style={styles.container}>
            <PageHeader title="Favorites Proffys"/>

            <ScrollView
                style={styles.classList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {favorites.map((classItem: Class) => {
                    return (
                        <ClassItem
                            key={classItem.id}
                            classItem={classItem}
                            favorited
                        />
                    )
                })}
            </ScrollView>

        </View>
    );
}

export default Favorites;