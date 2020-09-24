import React, {useState} from 'react';
import {View} from 'react-native';
import {StyleSheet, Text, TouchableOpacity} from "react-native";


export default function App() {
    const BUTTONS = ['(',')','7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '/', '0', '.', '*'];

    const [expression, setExpression] = useState({
        value: ''
    });

    const [exception, setException] = useState({
        message: ''
    });

    const addExpression = value => {
        const newExpression = {...expression};
        newExpression.value += value;
        setExpression(newExpression);

        const exceptionCopy = {...exception};
        exceptionCopy.message = '';
        setException(exceptionCopy);
    };

    const removeSymbol = () => {
        const newExpression = {...expression};
        newExpression.value = newExpression.value.toString().substring(0, newExpression.value.toString().length - 1);
        setExpression(newExpression);
    };

    const clearExpression = () => {
        const newExpression = {...expression};
        newExpression.value = '';
        setExpression(newExpression);

        const exceptionCopy = {...exception};
        exceptionCopy.message = '';
        setException(exceptionCopy);
    };

    const resultExpression = () => {
        const expressionCopy = {...expression};
        const exceptionCopy = {...exception};
        try {
            expressionCopy.value = eval(expressionCopy.value);
            exceptionCopy.message = '';
            setExpression(expressionCopy);
            setException(exceptionCopy);
        } catch(e) {
            exceptionCopy.message = '*Неверное выражение*';
            setException(exceptionCopy);
            expressionCopy.value = '';
            setExpression(expressionCopy)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textInput}>{expression.value}</Text>
            <Text style={styles.textError}>{exception.message}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.buttons}>
                    <Text style={styles.button2} onPress={() => removeSymbol()}>C</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}>
                    <Text style={styles.button2} onPress={() => clearExpression()}>CE</Text>
                </TouchableOpacity>
                {BUTTONS.map((code) => {
                    return <TouchableOpacity
                        key={code}
                        value={code}
                        style={styles.buttons}
                        onPress={() => addExpression(code)}
                    ><Text style={styles.button}>{code}</Text>
                    </TouchableOpacity>
                })}
                <TouchableOpacity style={styles.buttons}>
                    <Text style={styles.button2} onPress={() => resultExpression()}>=</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 100
    },
    button: {
        borderWidth: 3,
        borderColor: '#696969',
        borderRadius: 3,
        paddingVertical: 25,
        paddingHorizontal: 30,
        backgroundColor: '#696969',
        width: '100%',
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    },
    button2: {
        borderWidth: 3,
        borderColor: '#C0C0C0',
        borderRadius: 3,
        paddingVertical: 29,
        paddingHorizontal: 25,
        backgroundColor: '#C0C0C0',
        width: '100%',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    buttons: {
        flexWrap: 'wrap',
        width: '22%',
        marginBottom: 10,
        marginRight: 5,
        marginLeft: 5,
    },
    textInput: {
        width: '95%',
        minHeight: 100,
        marginRight: 5,
        marginBottom: 15,
        fontSize: 25,
        color: 'white'
    },
    textError: {
        fontSize: 25,
        color: 'red',
        minHeight: 30,
        marginBottom: 25
    }
});



