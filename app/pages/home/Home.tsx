import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Link, NavigationProp, useNavigation } from "@react-navigation/native"
import Color from "../../core/theme/colors"
import MyHeader from "../../core/components/header"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.backGround,
    }
})

const Home = ({ navigation }: any) => {
    // Go to Contact
    const goToContact = () => {
        navigation.navigate("/contact", { id: 12 })
    }

    return <SafeAreaView style={styles.container}>
        <MyHeader title="Home" />
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={goToContact}>
            <Text> Ola </Text>
        </TouchableOpacity>
    </SafeAreaView>
}

export default Home