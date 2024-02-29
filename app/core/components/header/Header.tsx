import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import Color from "../../theme/colors"

interface HeaderProps {
    title: string
    backButton?: () => void
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: Color.header,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: StatusBar.currentHeight
    },
    text: {
        flexGrow: 1,
        textAlign: "center",
        fontSize: 23,
    },
    back: {
        // backgroundColor: "#fff",
        minWidth: 35,
        padding: 5,
        marginHorizontal: 2
    }
})

const Header = (props: HeaderProps) => {
    const title = props.title
    const backButton = props.backButton

    return <View style={styles.header}>
        {backButton !== undefined ?
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.back}
                onPress={backButton}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
            :
            <></>}
        <Text style={styles.text}>{title}</Text>
        {backButton !== undefined ?
            <View style={styles.back}/>
            :
            <></>}
    </View>
}

export { Header }