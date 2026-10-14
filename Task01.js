// 28 September,2026

import React, { useState } from 'react'
import {View, Text, StyleSheet, TextInput, Button} from 'react-native'

const LabTask = () => {
    const [itemPrice, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState('')
    const [subTotal, setSubTotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [tax, setTax] = useState(0)
    const [fb, setFB] = useState(0)

    function calculateSubTotal(){
        const price = parseFloat(itemPrice) || 0
        const qty = parseFloat(quantity) || 0
        
        const currentSubTotal = price * qty
        const currentDiscount = category.toUpperCase() === 'VIP' ? currentSubTotal * 0.3 : currentSubTotal * 0.1
        const currentTax = currentSubTotal * 0.05
        const currentFB = (currentSubTotal - currentDiscount) + currentTax

        setSubTotal(currentSubTotal)
        setDiscount(currentDiscount)
        setTax(currentTax)
        setFB(currentFB)
    }

    function resetCalculator(){
        setPrice('')
        setQuantity('')
        setCategory('')
        setSubTotal(0)
        setDiscount(0)
        setTax(0)
        setFB(0)
    }

  return (
    <View style={{flex: 1, backgroundColor: '#ececec'}}>
        <View style={ss.header}>
            <Text style={ss.headerText}>Shopping Bill Calculator</Text>
            <Text style={{color: 'white'}}>Calculate your bill with discount & tax</Text>
        </View>
        <View style={ss.middle}>
            <Text style={{margin: 20, fontWeight: 'bold'}}>Item Price:</Text>
            <TextInput style={ss.inputFields} onChangeText={setPrice} value={itemPrice} keyboardType="numeric"/>
            <Text style={{margin: 20, fontWeight: 'bold'}}>Quantity:</Text>
            <TextInput style={ss.inputFields} onChangeText={setQuantity} value={quantity} keyboardType="numeric"/>
            <Text style={{margin: 20, fontWeight: 'bold'}}>Category:</Text>
            <TextInput style={ss.inputFields} onChangeText={setCategory} value={category}/>

            <View style={{width: '95%', alignSelf: 'center', marginTop: 20, borderRadius: 20,}}>
                <Button title='Calculate Bill' onPress={calculateSubTotal}/>
            </View>
            
            <View style={{backgroundColor: '#edf5fc', height: '30%', borderRadius: 20, margin: 15,}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',marginRight:10}}>
                    <Text style={ss.bills}>Subtotal</Text>
                    <Text style={ss.bills}>Rs.{subTotal.toFixed(2)}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',marginRight:10}}>
                    <Text style={ss.bills}>Discount</Text>
                    <Text style={ss.bills}>Rs.{discount.toFixed(2)}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',marginRight:10}}>
                    <Text style={ss.bills}>Tax(5%)</Text>
                    <Text style={ss.bills}>Rs.{tax.toFixed(2)}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',marginRight:10, marginTop: 10, borderTopColor: 'black', borderTopWidth:1, }}>
                    <Text style={[ss.bills, {color: 'black', fontSize: 18}]}>Final Bill</Text>
                    <Text style={[ss.bills, {color: 'black', fontSize: 18}]}>Rs.{fb.toFixed(2)}</Text>
                </View>
            </View>

            <View style={{width: '95%', alignSelf: 'center', marginTop: 20, borderRadius: 20, backgroundColor: 'white'}}>
                <Button title='Reset Calculator' onPress={resetCalculator}/>
            </View>
        </View>
    </View>
  )
}

const ss = StyleSheet.create({
    header:{
        backgroundColor: "#0578fc",
        alignItems: 'center',
        height: 120,
        borderRadius: 20,
        justifyContent:'center',
    },
    headerText:{
        marginTop: 30,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    middle:{
        margin:15,
        height: 650,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    inputFields:{
        backgroundColor: '#f8f8f8', 
        borderRadius: 5,
        borderColor: '#ececec',
        borderWidth: 1,
        width: '95%',
        alignSelf: 'center',
        padding: 8,
    },
    bills:{
        color:"#525252",
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 20,
    },
})

export default LabTask