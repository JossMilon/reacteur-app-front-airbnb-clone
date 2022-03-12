import { TextInput, StyleSheet } from "react-native"

export default function InputField({setData, placeholder, password}) {
    return (
        <TextInput style={styles.inputField} onChangeText={(text) => {setData(text)}} placeholder={placeholder} secureTextEntry={password? true: false}/>
    )
}

const styles = StyleSheet.create({
    inputField: {
        borderBottomWidth: 1,
        borderBottomColor: "tomato",
        paddingVertical: 5,
        marginBottom: 20,
    }
})