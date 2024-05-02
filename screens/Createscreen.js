import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function CreateScreen({route}) {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');

    const {reload, setReload} = route.params;
    // Retrieve username from local storage
    const username = localStorage.getItem('username');
    useEffect(() => {

    },[reload]);

    // Function to handle form submission
    const onSubmit = async () => {
        const createPostUrl = 'http://localhost:9090/api/posts/createPost';
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };

        // Add the username to the post data
        const postData = {
            title: title,
            description: description,
            content: content,
            name: username, // Include the username in the post data
        };

        try {
            const response = await axios.post(createPostUrl, postData, config);
            console.log('Post created successfully:', response.data);
            // Reset input fields after successful post creation
            setTitle('');
            setDescription('');
            setContent('');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error creating post:', error);
        }

        setReload(!reload);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('./../assets/healofy.png')}
                />
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder='Title'
                    placeholderTextColor='gray'
                />
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                    placeholder='Description'
                    placeholderTextColor='gray'
                />
                <TextInput
                    style={styles.input}
                    value={content}
                    onChangeText={setContent}
                    placeholder='Content'
                    placeholderTextColor='gray'
                    multiline
                />
                <TouchableOpacity style={styles.button} onPress={onSubmit}>
                    <Text style={styles.buttonText}>Create Post</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 60,
        height: 40,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        width: '100%',
        backgroundColor: '#124b46',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
