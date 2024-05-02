import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';

export default function Quizscreen({ navigation }) {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [token, setToken] = useState('');
    const [weightages, setWeightages] = useState([]);
    const [totalWeightage, setTotalWeightage] = useState(0);
        const [severityLevel, setSeverityLevel] = useState('');

    useEffect(() => {
        // Fetch questions and JWT token from backend when component mounts
        fetchToken();
    }, []);

    const fetchToken = async () => {
        try {
            // Fetch JWT token from localStorage
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);
            // Once token is fetched, fetch questions using the token
            await fetchQuestions(storedToken);
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    const fetchQuestions = async (token) => {
                try {
                    const response = await fetch('http://localhost:9090/api/allQuestions', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const data = await response.json();
                    // console.log(data[0].weightage);

                    const squared = [];
                    for (let i = 0; i < 10; i++) {
                        squared.push(data[i].weightage);
                    }

                    console.log(squared);

                    setWeightages(squared);

                    // Shuffle the array of questions
                    // const shuffledQuestions = shuffleArray(data);
                    // Select the first five questions
                    // const selectedQuestions = data.slice(0, 5);
                    setQuestions(data);
                    // Initialize answers state with empty strings for each question
                    const initialAnswers = {};
                    data.forEach((question) => {
                        initialAnswers[question.id] = ''; // Assuming question IDs are unique
                    });
                    setAnswers(initialAnswers);
                } catch (error) {
                    console.error('Error fetching questions:', error);
                }
            };

    // Import statements, components, and styling remain the same as in your provided code

const handleOptionChange = (questionId, option) => {
    setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: option,
    }));

    // Since we just updated the answer, calculate the new total weightage and classify severity
    calculateWeightageAndClassifySeverity();
};

const calculateWeightageAndClassifySeverity = () => {
    let newTotalWeightage = 0;

    // Calculate total weightage based on user answers
    for (let i = 0,j=1; i < 10,j<=10; i++,j++) {
        // const questionId = questions[i].id;
        if (answers[j] === 'Yes') {
            newTotalWeightage += weightages[i];
        }
    }

    // Update totalWeightage state
    setTotalWeightage(newTotalWeightage);
// console.log(totalWeightage);
    // Classify severity based on the new total weightage
    classifySeverity(newTotalWeightage);
    // console.log(severityLevel);
};

const classifySeverity = (totalWeightage) => {
    let newSeverity = '';

    // Define thresholds for severity levels
    if (totalWeightage === 0) {
        newSeverity = 'None-minimal';
    } else if (totalWeightage <= 5) {
        newSeverity = 'Mild';
    } else if (totalWeightage <= 10) {
        newSeverity = 'Moderate';
    } else if (totalWeightage <= 15) {
        newSeverity = 'Moderately severe';
    } else {
        newSeverity = 'Severe';
    }

    // Update severityLevel state
    setSeverityLevel(newSeverity);
};

    const submitQuiz = async (qid) => {
        try {

            // console.log(totalWeightage);
            // console.log(severityLevel);
            localStorage.setItem('severity',severityLevel);
            // Send user responses and JWT token to the backend
            console.log('User responses:', answers);
    
            const response = await fetch(`http://localhost:9090/api/${qid}/createResponse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({

                    responses: answers,
                    weightage: totalWeightage
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit quiz');
            }
    
            console.log('Quiz submitted successfully!');
            navigation.navigate('Home');
            // Handle success response from the server (if needed)
        } catch (error) {
            console.error('Error submitting quiz:', error);
            // Handle error (e.g., display error message to the user)
        }
    };

    return (
        <ScrollView style={{backgroundColor:"white"}}>
             <View style={styles.container}>

                 <Image style={styles.logo} source={require("../assets/healofy.png")} />
                 <Text style={{textAlign:'center',color:"#124b46",fontSize:20,fontWeight:'bold',paddingBottom:20}}>Take a Quiz!</Text>
             {questions.map((question) => (
                    <View key={question.id} style={styles.questionContainer}>
                        <Text style={styles.question}>{question.question}</Text>
                        <TouchableOpacity
                            onPress={() => handleOptionChange(question.id, 'Yes')}
                            style={styles.option}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons
                                    name={answers[question.id] === 'Yes' ? 'radio-button-on' : 'radio-button-off'}
                                    size={24}
                                    color={answers[question.id] === 'Yes' ? 'red' : 'black'}
                                />
                                <Text style={styles.optionText}>Yes</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleOptionChange(question.id, 'No')}
                            style={styles.option}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons
                                    name={answers[question.id] === 'No' ? 'radio-button-on' : 'radio-button-off'}
                                    size={24}
                                    color={answers[question.id] === 'No' ? 'red' : 'black'}
                                />
                                <Text style={styles.optionText}>No</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
                 <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => submitQuiz(questions[0].id)} // Assuming the first question ID is used for submitting the quiz
                >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    logo: {
        alignSelf: 'center',
        marginBottom: 20,
        width:100,
        height:100
    },
    questionContainer: {
        backgroundColor: '#124b46',
        marginBottom: 20,
        borderRadius: 10,
        padding: 15,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    optionText: {
        marginLeft: 10,
        fontSize: 16,
        color: 'white',
    },
    submitButton: {
        marginTop: 30,
        backgroundColor: '#124b46',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 180,
        alignSelf: 'center',
    },
    submitButtonText: {
        color: 'white',
        alignSelf: 'center',
    },
});

// // Function to shuffle an array
// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

