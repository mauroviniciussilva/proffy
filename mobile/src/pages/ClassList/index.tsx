import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage';
import PageHeader from '../../components/PageHeader';
import ClassItem, { Class } from '../../components/ClassItem';
import api from '../../services/api';
import styles from './styles';

function ClassList() {
    const [ classItems, setClassItem ] = useState([]);
    const [ favorites, setFavorites ] = useState<number[]>([]);
    const [ isfiltersVisible, setIsFiltersVisible ] = useState(false);
    const [ subject, setSubject ] = useState('');
    const [ week_day, setWeekDay ] = useState('');
    const [ time, setTime ] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedClasses = JSON.parse(response);
                const favoritedClassesIds = favoritedClasses.map((classItem: Class) => classItem.id);
                setFavorites(favoritedClassesIds);
            }
        });
    }

    function handleToggleFilter() {
        setIsFiltersVisible(!isfiltersVisible);
    }

    function handleFiltersSubmit() {
        loadFavorites();

        api.get('classes', { params: { subject, week_day, time } }).then(response => {
            setIsFiltersVisible(false);
            setClassItem(response.data);
        }).catch(() => console.log('Error trying to get data'))
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Available Proffys" 
                rightSlot={(
                    <BorderlessButton onPress={handleToggleFilter}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}>
                { isfiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Subject</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Wich subject?"
                            placeholderTextColor="#C1BCCC"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                            <Text style={styles.label}>Week Day</Text>
                            <TextInput 
                                style={styles.input}
                                value={week_day}
                                onChangeText={text => setWeekDay(text)}
                                placeholder="Wich day?"
                                placeholderTextColor="#C1BCCC"
                            />
                            </View>

                            <View style={styles.inputBlock}>
                            <Text style={styles.label}>Time</Text>
                            <TextInput 
                                style={styles.input}
                                value={time}
                                onChangeText={text => setTime(text)}
                                placeholder="Wich time?"
                                placeholderTextColor="#C1BCCC"
                            />
                            </View>
                        </View>

                        <RectButton 
                            onPress={handleFiltersSubmit}
                            style={styles.submitButton}
                        >
                            <Text style={styles.submitButtonText}>Filter</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.classList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {classItems.map((classItem: Class) => {
                    return (
                        <ClassItem 
                            key={classItem.id}
                            classItem={classItem}
                            favorited={favorites.includes(classItem.id)}
                        />
                    )
                })} 
            </ScrollView>
            
        </View>
    );
}

export default ClassList;