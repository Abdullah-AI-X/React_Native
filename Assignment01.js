import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Pressable, FlatList, Alert } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { Checkbox, RadioButton } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const Assignment01 = () => {
    const [regNo, setRegNo] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('Male')
    const [isEmployee, setEmployee] = useState(false)
    const cities = [
        {city: 'Lahore', value: 'LHR'},
        {city: 'Rawalpindi', value: 'RWP'},
        {city: 'Karachi', value: 'KHI'},
        {city: 'Islamabad', value: 'ISB'},
    ]
    const [city, setSelectedCity] = useState(null)
    const [search, setSearch] = useState('')
    const [students, setStudents] = useState([])
    const [isSearching, setIsSearching] = useState(false);

    const handleAdd = () =>{
        if (!regNo || !name) {
            Alert.alert('Error', 'Please fill in Reg No and Name')
            return
        }
        const newStudent = {
            regNo, name, gender,
            city, isEmployee
        }
        setStudents([...students, newStudent])
        setRegNo('')
        setName('')
        setEmployee(false)
        setGender('Male')
        setSelectedCity(null)
    }

    const handleDelete = () =>{
        setStudents(
            students.filter(
                (item) => item.regNo != regNo
            )
        )
    }

    const handleSearch = () => {
        if (!search) {
            Alert.alert('Error', 'Please enter a Reg No to search');
            return;
        }
        const found = students.find((item) => item.regNo == search.trim());
        if (found) {
            setIsSearching(true);
        } else {
            Alert.alert('Not Found', 'No student with this Reg No');
        }
    };

    const handleClear = () => {
        setSearch('');
        setIsSearching(false);
    };

    const renderStudentCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        {item.regNo} - {item.name}
      </Text>
      <Text style={styles.cardSubtitle}>
        {item.gender} | {item.city} | {item.isEmployee ? 'Employee' : 'Student'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.headerTitle}>ADD Student</Text>
        <View>
            <TextInput 
                style={styles.input} 
                placeholder='Reg no' 
                value={regNo}
                onChangeText={setRegNo}
            />
            <TextInput 
                style={styles.input} 
                placeholder='Name' 
                value={name}
                onChangeText={setName}
            />
        </View>
        <View style={styles.optionsRow}>
            <RadioButton 
                status={gender == 'Male' ? 'checked' : 'unchecked'}
                onPress={() => setGender('Male')}
            /><Text style={styles.radioItem}>Male</Text>
            <RadioButton 
                status={gender == 'Female' ? 'checked' : 'unchecked'}
                onPress={() => setGender('Female')}
            /><Text style={styles.radioItem}>Female</Text>
        </View>
        <View style={styles.checkboxItem}>
            <Checkbox 
                status={isEmployee ? 'checked' : 'unchecked'}
                onPress={() => setEmployee(!isEmployee)}
            /><Text style={styles.label}>Employee</Text>
        </View>
        <View >
            <Dropdown 
                data={cities}
                labelField="city"  
                valueField="value" 
                placeholder="Select city"
                value={city}
                onChange={item => setSelectedCity(item.value)}
                style={styles.dropdown}
            />
        </View>
        <View style={styles.actionButtonsRow}>
            <Pressable style={styles.actionButton} onPress={handleAdd}>
                <View style={styles.addButton}>
                    <Text style={styles.buttonLabel}>Add</Text>
                </View>
            </Pressable>
            <Pressable style={styles.actionButton} onPress={handleDelete}>
                <View style={styles.deleteButton}>
                    <Text style={styles.buttonLabel}>Delete</Text>
                </View>     
            </Pressable>
        </View>
        <View style={styles.searchRow}>
            <TextInput
                placeholder='Enter Reg No' 
                value={search}
                onChangeText={setSearch}
                style={[styles.searchInputContainer, styles.searchInput]}
            />
            <Pressable 
                style={[styles.searchButton, isSearching && styles.clearButton]} 
                onPress={isSearching ? handleClear : handleSearch}
            >
                <View> 
                    <Text style={styles.searchButtonLabel}>
                        {isSearching ? 'Clear' : 'Search'}
                    </Text>
                </View>
            </Pressable>
        </View>
        <View style={{ flex: 1 }}>
            <FlatList 
                data={isSearching ? students.filter(item => item.regNo == search.trim()) : students}
                renderItem={renderStudentCard}
            />
        </View>

    </SafeAreaView>
  )
}

export default Assignment01




export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#262626',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 14,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    fontSize: 18,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  label: {
    color: '#2B2B2B',
    marginLeft: 6,
    fontSize: 18,
  },
  dropdown: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderColor: '#CED4DA',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  dropdownText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#7C7C7C',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#6C757D',
  },
  addButton: {
    backgroundColor: '#28A745',
    width: '100%',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#DC3545',
    width: '100%',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
  },
  searchInput: {
    flex: 1,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1A1A1A',
  },
  searchButton: {
    height: 44,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonLabel: {
    fontSize: 15,
    fontWeight: '600',
    paddingVertical: 4,
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CED4DA',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#5E646A',
  },
});