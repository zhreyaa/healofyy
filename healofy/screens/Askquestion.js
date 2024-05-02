import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';

export default function Askquestion() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Content:', content);

    // Reset input fields after submission
    setTitle('');
    setDescription('');
    setContent('');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('./../assets/healofy.png')}
                />
                <View>
                    <Text style={{alignItems:'center',marginTop:20,color:'#124b46',fontSize:20,fontWeight:'bold'}}>
                        Ask a Question
                    </Text>
                </View>
        {/* Input fields */}
        {/* <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
          placeholderTextColor="gray"
        /> */}
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          placeholderTextColor="gray"
        />
        {/* <TextInput
          style={styles.input}
          value={content}
          onChangeText={setContent}
          placeholder="Content"
          placeholderTextColor="gray"
          multiline
        /> */}

        {/* Create Post button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Post Question</Text>
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
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 40,
    marginTop: 40,
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
