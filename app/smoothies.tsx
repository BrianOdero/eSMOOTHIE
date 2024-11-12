import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import supabase from '@/DBconfig/supabaseClient'

const smoothies = () => {

    const { Id, title, method } = useLocalSearchParams();

    const [newTitle, setNewTitle] = useState<string>("");
    const [newMethod, setNewMethod] = useState<string>("");

    const updateSmoothie = async () => {
        if (!newTitle || !newMethod) {
            console.log("All fields must be filled")
            alert("All fields must be filled")
            return;
        }

        const { data, error } = await supabase
            .from('smoothies')
            .update({
                title: newTitle,
                method: newMethod,
            })
            .eq('id', Id)
            .single()

        if (error) {
            console.log(error);
        }

        if (data) {
            console.log(data);
        }
    }

    return (
        <View style={styles.container}>

            <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: 'bold' }}>MODIFY THE FOLLOWING DATA</Text>

            <Text style={styles.detailText}>Fill the following input field for the new title</Text>
            <TextInput
                style={styles.input}
                value={newTitle}
                onChangeText={(text) => setNewTitle(text)}
                placeholder={title as string}
            />

            <Text style={styles.topData}>Method: {method}</Text>
            <Text style={styles.detailText}>Fill the following input field for the new method</Text>
            <TextInput
                style={styles.input}
                value={newMethod}
                onChangeText={(text) => setNewMethod(text)}
                placeholder={method as string}
            />

            <TouchableOpacity onPress={updateSmoothie}>
                <View style={styles.submit}>
                    <Text style={{ color: 'black' }}>Press here to update the smoothie </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default smoothies

const styles = StyleSheet.create({
    submit: {
        borderColor: 'black',
        padding: 5,
        borderWidth: 2,
        width: "auto",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        marginTop: 50
    },
    topData: {
        marginTop: 10,
    },

    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginHorizontal: "auto",
        borderColor: 'black',
        borderWidth: 2,
        height: 500,
        padding: 50,
        borderRadius: 15
    },
    detailText: {
        marginBottom: 10,
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'italic'

    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 2,
        borderRadius: 2,
        color: 'black',
        width: 230,
    },
})