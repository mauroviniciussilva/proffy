import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import landingImage from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import styles from './styles';


function Landing() {
    const { navigate } = useNavigation();
    const [ totalConnections, setTotalConnections ] = useState(0);

    useEffect(() => {
        api.get('connections').then(response => {
           setTotalConnections(response.data);
        });
    }, [])

    function handleNavigationToGiveClassesPage() {
        navigate('GiveClasses');
    }

    function handleNavigationToStudyPage() {
        navigate('Study');
    }
    
    return (
        <View style={styles.container}>
            <Image source={landingImage} style={styles.banner}/>

            <Text style={styles.title}>
                Welcome, {'\n'}
                <Text style={styles.titleBold}>What do you want to do?</Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton 
                    style={[styles.button, styles.buttonPrimary]}
                    onPress={handleNavigationToStudyPage}
                >
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}>Study</Text>
                </RectButton>
                
                <RectButton 
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={handleNavigationToGiveClassesPage}
                >
                    <Image source={giveClassesIcon} />
                    <Text style={styles.buttonText}>Give Classes</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total of {totalConnections} connections already made {' '}
                <Image source={heartIcon}/>
            </Text>
        </View>
    );
}

export default Landing;