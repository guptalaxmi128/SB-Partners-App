import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

const GeneralQuiz = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const questions = [
    {
      question: "We will recommend diets and exercises that suits you",
      answers: [
        "Lose weight and increase stamina",
        "Maintain weight for health",
        "Gain weight for building muscle",
      ],
    },
    {
        question: "We will recommend diets and exercises that suits you",
        answers: [
          "Lose weight and increase stamina",
          "Maintain weight for health",
          "Gain weight for building muscle",
        ],
      },
      {
        question: "We will recommend diets and exercises that suits you",
        answers: [
          "Lose weight and increase stamina",
          "Maintain weight for health",
          "Gain weight for building muscle",
        ],
      },

      {
        question: "We will recommend diets and exercises that suits you",
        answers: [
          "Lose weight and increase stamina",
          "Maintain weight for health",
          "Gain weight for building muscle",
        ],
      },
      {
        question: "We will recommend diets and exercises that suits you",
        answers: [
          "Lose weight and increase stamina",
          "Maintain weight for health",
          "Gain weight for building muscle",
        ],
      },
  ];

  const handleAnswer = (answerIndex) => {
    // Set the selected answer index
    setSelectedAnswerIndex(answerIndex);

    // If it's the last question, submit the answers to the API
    if (currentQuestionIndex === questions.length - 1) {
      submitAnswers();
    } else {
      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const submitAnswers = () => {
    // Logic to submit answers to the API
    // Replace this with your API call
    Alert.alert("Answers submitted successfully!");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 18, paddingVertical: 20 }}>
        <View style={{ flex: 1, marginTop: 20 }}>
          {/* Progress bar */}
          <View style={styles.progressBar}>
            <View
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                backgroundColor: "rgba(107, 78, 255, 1)",
                height: 8,
                borderRadius: 20,
              }}
            />
          </View>

          <Text
            style={{
              fontSize: 32,
              fontFamily: "Poppins",
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Tell us your goal
          </Text>
          {/* Question */}
          <Text style={styles.question}>
            {questions[currentQuestionIndex].question}
          </Text>

          {/* Answer options */}
          {questions[currentQuestionIndex].answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerButton,
                selectedAnswerIndex === index && {
                  backgroundColor: "#e7e7ff",
                  color: "rgba(107, 78, 255, 1)",
                },
              ]}
              onPress={() => handleAnswer(index)}
            >
              <Text
                style={{
                  padding: 5,
                  fontFamily: "Poppins",
                  fontSize: 15,
                  color: selectedAnswerIndex === index ? "rgba(107, 78, 255, 1)" : "#000",
                }}
              >
                {answer}
              </Text>
            </TouchableOpacity>
          ))}
          {currentQuestionIndex === questions.length - 1 && (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={submitAnswers}
              disabled={selectedAnswerIndex === null}
            >
              <Text style={styles.submitButtonText}>Submit Answers</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  progressBar: {
    width: "100%",
    backgroundColor: "#ccc",
    height: 8,
    marginBottom: 10,
    borderRadius: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
  },
  answerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "rgba(107, 78, 255, 1)",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical:20
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily:'Poppins'
  },
});

export default GeneralQuiz;
