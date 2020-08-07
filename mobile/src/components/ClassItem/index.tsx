import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import styles from './styles';
import api from '../../services/api';

export interface Class {
    id: number;
    avatar: string;
    bio: string
    first_name: string;
    last_name: string;
    price: number;
    subject: string;
    whatsapp: string;
    user_id: number;
}

interface ClassItemProps {
    classItem: Class;
    favorited: boolean;
}

const ClassItem: React.FC<ClassItemProps> = ({ classItem, favorited }) => {
    const [ isFavorited, setIsFavorited ] = useState(favorited);

    function handleLinkToWhatsapp() {
        api.post('connections', { user_id: classItem.id });

        Linking.openURL(`whatsapp://send?phone=${classItem.whatsapp}`);
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');
        let favoritesArray = [];
        if (favorites) favoritesArray = JSON.parse(favorites);

        if (isFavorited) {
            const favoriteIndex = favoritesArray.findIndex((favorite: Class) => favorite.id === classItem.id);
            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(false);
        } else {
            favoritesArray.push(classItem);
            setIsFavorited(true);
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: classItem.avatar }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{classItem.first_name.concat(' ', classItem.last_name)}</Text>
                    <Text style={styles.subject}>{classItem.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {classItem.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Price/Hour {'    '}
                    <Text style={styles.priceValue}>$ {classItem.price}</Text>
                </Text>
                <View style={styles.buttonsContainer}>
                    <RectButton 
                        onPress={handleToggleFavorite}
                        style={[
                            styles.favoriteButton,
                            isFavorited ? styles.favorited : {},
                        ]}
                    >
                    { isFavorited
                        ? <Image source={unfavoriteIcon}></Image>
                        : <Image source={heartOutlineIcon}></Image>
                    }
                    </RectButton>
                    <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
                        <Image source={whatsappIcon}></Image>
                        <Text style={styles.contactButtonText}>Get in touch</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}

export default ClassItem;