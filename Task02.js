// 5 October,2026

import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native'

const Task051026 = () => {
    const [expenseName, setExpenseName] = useState('')
    const [amount, setAmount] = useState('')
    const [expenses, setExpenses] = useState([])
    const [total, setTotal] = useState(0)

    function addExpense() {
        if (!expenseName.trim() || !amount.trim()) return

        const newExpense = {
            name: expenseName,
            amount: parseFloat(amount) || 0
        }

        setExpenses([...expenses, newExpense])
        setExpenseName('')
        setAmount('')
    }

    function calculateTotal() {
        let sum = 0
        for(let i = 0; i < expenses.length; i++){
            sum = sum + expenses[i].amount
        }
        setTotal(sum)
    }

    function resetCalculator() {
        setExpenses([])
        setTotal(0)
        setExpenseName('')
        setAmount('')
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#ececec' }}>
            <View style={ss.header}>
                <Text style={ss.headerText}>Expense Calculator</Text>
            </View>
            <View style={ss.middle}>
                <Text style={{ margin: 20, fontWeight: 'bold' }}>Expense Name:</Text>
                <TextInput 
                    style={ss.inputFields} 
                    onChangeText={setExpenseName} 
                    value={expenseName} 
                    placeholder="e.g. Groceries"
                />
                <Text style={{ margin: 20, fontWeight: 'bold' }}>Amount:</Text>
                <TextInput 
                    style={ss.inputFields} 
                    onChangeText={setAmount} 
                    value={amount} 
                    keyboardType="numeric" 
                    placeholder="e.g. 500"
                />

                <View style={{ width: '95%', alignSelf: 'center', marginTop: 20, flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ width: '48%' }}>
                        <Button title='+ Add Expense' onPress={addExpense} />
                    </View>
                    <View style={{ width: '48%' }}>
                        <Button title='Calculate Total' onPress={calculateTotal} color="#28a745" />
                    </View>
                </View>

                <View style={{ backgroundColor: '#edf5fc', borderRadius: 20, margin: 15, paddingBottom: 15, height: 300 }}>
                    <Text style={[ss.bills, { fontSize: 20 }]}>Expense List:</Text>
                    <FlatList
                        data={expenses}
                        renderItem={({ item }) => (
                            <View style={ss.listItem}>
                                <Text style={ss.listText}>{item.name}</Text>
                                <Text style={ss.listText}>Rs.{item.amount.toFixed(2)}</Text>
                            </View>
                        )}
                    />
                </View>

                <View style={{ backgroundColor: '#edf5fc', borderRadius: 20, marginHorizontal: 15, padding: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
                    <Text style={ss.bills}>Total Expenses</Text>
                        <Text style={ss.bills}>Rs.{total.toFixed(2)}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
                        <Text style={ss.bills}>Count Expense</Text>
                        <Text style={ss.bills}>{expenses.length}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginTop: 10, borderTopColor: 'black', borderTopWidth:1, }}>
                        <Text style={[ss.bills, { color: 'black', fontSize: 18 }]}>Avg Expense</Text>
                        <Text style={[ss.bills, { color: 'black', fontSize: 18 }]}>
                            Rs.{expenses.length > 0 ? (total / expenses.length).toFixed(2) : '0.00'}
                        </Text>
                    </View>
                </View>

                {/* <View style={{ width: '95%', alignSelf: 'center', marginTop: 20, borderRadius: 20 }}>
                    <Button title='Reset Calculator' onPress={resetCalculator} color="red" />
                </View> */}
            </View>
        </View>
    )
}

const ss = StyleSheet.create({
    header: {
        backgroundColor: "#0578fc",
        alignItems: 'center',
        height: 120,
        borderRadius: 20,
        justifyContent: 'center',
    },
    headerText: {
        marginTop: 30,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    middle: {
        margin: 15,
        height: '83%',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    inputFields: {
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        borderColor: '#ececec',
        borderWidth: 1,
        width: '95%',
        alignSelf: 'center',
        padding: 10,
    },
    bills: {
        color: "#525252",
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 20,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 10,
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0'
    },
    listText: {
        fontWeight: '600',
        color: '#333'
    }
})

export default Task051026