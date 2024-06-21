import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  BackHandler,
} from "react-native";
import Header from "../header/Header";
import ContentSection from "./CustomSection";

const TermConditions = ({ navigation }) => {
  useEffect(() => {
    const handleBackPress = () => {
      if (navigation.isFocused()) {
        navigation.goBack();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="#fff" />
      <View style={{ paddingTop: 20 }}>
        <Header
          title="Terms & Conditions"
          icon={require("../../assets/back.png")}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ContentSection title="Introduction">
          <Text style={styles.text}>
            These terms govern your use of our app. By using the app, you agree
            to these terms.
          </Text>
        </ContentSection>
        <ContentSection title="User Responsibilities">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp; Provide accurate information during registration.
            </Text>
          </View>

          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp; Maintain the confidentiality of your account credentials.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp; Use the app for lawful purposes only.
            </Text>
          </View>
        </ContentSection>
        <ContentSection title="Service Provider Responsibilities">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp; Provide accurate service details and credentials..
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp; Maintain high standards of service quality.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp; Adhere to local laws and regulations.
            </Text>
          </View>
        </ContentSection>
        <ContentSection title="Account Management">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp; Account creation requirements.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp; Process for account suspension or termination.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp; Responsibilities in case of account misuse.
            </Text>
          </View>
        </ContentSection>
        <ContentSection title="Payment Terms">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>&nbsp;Accepted payment methods.</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>&nbsp; Payment processing details.</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp; Refund policies and procedures.
            </Text>
          </View>
        </ContentSection>

        <ContentSection title="Service Usage">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Guidelines for booking and using services.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp; Restrictions on the use of the app.
            </Text>
          </View>
        </ContentSection>

        <Text
          style={{
            fontFamily: "PoppinsSemiBold",
            fontSize: 20,
            color: "#5F33E1",
          }}
        >
          Cancellation and Refund Policy
        </Text>
        <ContentSection title="Introduction">
          <Text style={styles.text}>
            This policy outlines the conditions under which cancellations and
            refunds are processed
          </Text>
        </ContentSection>
        <ContentSection title="Cancellation Process">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>&nbsp;Steps to cancel a booking.</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp; Timeframe for eligible cancellations.
            </Text>
          </View>
        </ContentSection>
        <ContentSection title="Refund Eligibility">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Conditions under which refunds are granted.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>&nbsp; Non-refundable scenarios.</Text>
          </View>
        </ContentSection>
        <ContentSection title="Refund Process">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>&nbsp;How to request a refund.</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp; Timeframe for processing refunds.
            </Text>
          </View>
        </ContentSection>
        <Text
          style={{
            fontFamily: "PoppinsSemiBold",
            fontSize: 20,
            color: "#5F33E1",
          }}
        >
          Booking Policy
        </Text>
        <ContentSection title="Introduction">
          <Text style={styles.text}>
            This policy explains the booking process and rules for using our
            services.
          </Text>
        </ContentSection>
        <ContentSection title="Booking Process">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;How to search and book services.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp; Booking confirmation details.
            </Text>
          </View>
        </ContentSection>
        <ContentSection title="Confirmation">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;How and when bookings are confirmed.
            </Text>
          </View>
        </ContentSection>
        <ContentSection title="Changes and Modifications">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>&nbsp;Rules for modifying bookings.</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Timeframe and conditions for making changes.
            </Text>
          </View>
        </ContentSection>
        <Text
          style={{
            fontFamily: "PoppinsSemiBold",
            fontSize: 20,
            color: "#5F33E1",
          }}
        >
          Review and Rating Policy
        </Text>
        <ContentSection title="Introduction">
          <Text style={styles.text}>
            This policy governs the submission and management of reviews and
            ratings.
          </Text>
        </ContentSection>
        <ContentSection title="Review Guidelines">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Rules for writing and submitting reviews.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Prohibited content in reviews.
            </Text>
          </View>
        </ContentSection>
        <ContentSection title="Moderation">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;How reviews are monitored and moderated.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Actions taken against fake or inappropriate reviews.
            </Text>
          </View>
        </ContentSection>
        <ContentSection title="Dispute Resolution">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Process for addressing disputes related to reviews.
            </Text>
          </View>
        </ContentSection>
        <Text
          style={{
            fontFamily: "PoppinsSemiBold",
            fontSize: 20,
            color: "#5F33E1",
          }}
        >
          Service Provider Policy
        </Text>
        <ContentSection title="Introduction">
          <Text style={styles.text}>
            This policy outlines the expectations and requirements for service
            providers
          </Text>
        </ContentSection>
        <ContentSection title="Listing Requirements">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Criteria for listing services on the platform.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Required documentation and verification.
            </Text>
          </View>
        </ContentSection>
        <ContentSection title="Quality Standards">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Expected standards of service quality.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Regular performance evaluations.
            </Text>
          </View>
        </ContentSection>
        <ContentSection title="Verification">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Process for verifying service provider credentials..
            </Text>
          </View>
          <ContentSection title="Compliance">
            <View style={styles.row}>
              <View style={styles.dot} />
              <Text style={styles.text}>
                &nbsp;Adherence to local laws and regulations.
              </Text>
            </View>
            <View style={styles.row}>
              <View style={styles.dot} />
              <Text style={styles.text}>
                &nbsp;Consequences of non-compliance.
              </Text>
            </View>
          </ContentSection>
        </ContentSection>

        <Text
          style={{
            fontFamily: "PoppinsSemiBold",
            fontSize: 20,
            color: "#5F33E1",
          }}
        >
          Community Guidelines
        </Text>
        <ContentSection title="Introduction">
          <Text style={styles.text}>
            These guidelines ensure a respectful and inclusive environment for
            all users.
          </Text>
        </ContentSection>
        <ContentSection title="Conduct">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Expected behavior for users and service providers.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Respect and integrity in interactions.
            </Text>
          </View>
        </ContentSection>
        <ContentSection title="Respect and Non-Discrimination">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Commitment to non-discrimination.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Encouraging diversity and inclusion.
            </Text>
          </View>
        </ContentSection>

        <ContentSection title="Prohibited Activities">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;List of activities not allowed on the platform.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Consequences for violating guidelines.
            </Text>
          </View>
        </ContentSection>

        <Text
          style={{
            fontFamily: "PoppinsSemiBold",
            fontSize: 20,
            color: "#5F33E1",
          }}
        >
          Safety and Security Policy
        </Text>
        <ContentSection title="Introduction">
          <Text style={styles.text}>
            This policy outlines our commitment to user safety and security.
          </Text>
        </ContentSection>
        <ContentSection title="Safety Measures">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Steps taken to ensure user safety.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Safety features within the app.
            </Text>
          </View>
        </ContentSection>
        <ContentSection title="Reporting Issues">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;How users can report safety or security concerns.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Response procedures for reported issues.
            </Text>
          </View>
        </ContentSection>

        <ContentSection title="Emergency Protocols">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Procedures in case of emergencies.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Contact information for urgent support.
            </Text>
          </View>
        </ContentSection>

        <Text
          style={{
            fontFamily: "PoppinsSemiBold",
            fontSize: 20,
            color: "#5F33E1",
          }}
        >
          Intellectual Property Policy
        </Text>
        <ContentSection title="Introduction">
          <Text style={styles.text}>
            This policy covers the ownership and use of content within the app.
          </Text>
        </ContentSection>
        <ContentSection title="Content Ownership">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Rules about who owns the content shared on the platform.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;User-generated content rights.
            </Text>
          </View>
        </ContentSection>
        <ContentSection title="Use of Content">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Guidelines for using platform content.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>&nbsp;Permissions and restrictions.</Text>
          </View>
        </ContentSection>

        <ContentSection title="Infringement Reporting">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;How to report intellectual property violations.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Actions taken against infringers.
            </Text>
          </View>
        </ContentSection>

        <Text
          style={{
            fontFamily: "PoppinsSemiBold",
            fontSize: 20,
            color: "#5F33E1",
          }}
        >
          Marketing and Communication Policy
        </Text>
        <ContentSection title="Introduction">
          <Text style={styles.text}>
            This policy outlines how we communicate with users and handle
            promotional content.
          </Text>
        </ContentSection>
        <ContentSection title="Communication Consent">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;How the app will communicate with users.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;User consent for receiving communications.
            </Text>
          </View>
        </ContentSection>
        <ContentSection title="Promotional Content">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Guidelines for receiving promotional offers.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Opt-out procedures for marketing communications.
            </Text>
          </View>
        </ContentSection>

        <ContentSection title="Opt-Out">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;How users can opt out of marketing communications.
            </Text>
          </View>
        </ContentSection>

        <Text
          style={{
            fontFamily: "PoppinsSemiBold",
            fontSize: 20,
            color: "#5F33E1",
          }}
        >
          Dispute Resolution Policy
        </Text>
        <ContentSection title="Introduction">
          <Text style={styles.text}>
            This policy explains how disputes are handled within the app.
          </Text>
        </ContentSection>
        <ContentSection title="Dispute Handling">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Process for resolving disputes between users and service
              providers.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Initial steps and escalation process.
            </Text>
          </View>
        </ContentSection>
        <ContentSection title="Mediation and Arbitration">
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Options for third-party mediation.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              &nbsp;Arbitration procedures and guidelines.
            </Text>
          </View>
        </ContentSection>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "gray",
    textAlign: "justify",
  },
  boldText: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#5F33E1",
  },
  row: {
    flexDirection: "row",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: "#5F33E1",
    marginVertical: 5,
  },
});

export default TermConditions;
