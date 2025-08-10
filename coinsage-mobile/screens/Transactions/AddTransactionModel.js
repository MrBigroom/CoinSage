import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addTransaction } from '../../src/services/api';

const validationSchema = Yup.object().shape({
    amount: Yup.number().required('Amount is required').positive('Must be positive'),
    category: Yup.string().required('Category is required'),
});

const AddTransactionModel = ({ visible, onClose }) => {
    const [isIncome, setIsIncome] = useState(false);

    const handleSubmit = async (values) => {
        try {
            await addTransaction({
                amount: values.amount,
                category: values.category,
                description: values.description,
                date: new Date().toISOString(),
            });
            onClose();
        } catch (error) {
            console.log('Failed to add transaction: ', error);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon name="close" size={24} color='#666' />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Add Transaction</Text>
                    <View style={styles.toggleContainer}>
                        <TouchableOpacity
                            style={[styles.toggleButton, isIncome && styles.toggleActive]}
                            onPress={() => setIsIncome(true)}>
                            <Text>Income</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.toggleButton, !isIncome && styles.toggleActive]}
                            onPress={() => setIsIncome(false)}>
                            <Text style={!isIncome ? styles.toggleTextActive: styles.toggleText}>Expense</Text>
                        </TouchableOpacity>
                    </View>

                    <Formik
                        initialValues={{ amount: '', category: '', description: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}>
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Amount"
                                    keyboardType="numeric"
                                    value={values.amount}
                                    onChangeText={handleChange('amount')}
                                    onBlur={handleBlur('amount')}
                                />
                                {touched.amount && errors.amount && (
                                    <Text style={styles.errorText}>{errors.amount}</Text>
                                )}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Category"
                                    value={values.category}
                                    onChangeText={handleChange('category')}
                                    onBlur={handleBlur('category')}
                                />
                                {touched.category && errors.category && (
                                    <Text style={styles.errorText}>{errors.category}</Text>
                                )}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Description (Optional)"
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                />

                                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                    <Text style={styles.submitButtonText}>Add Transaction</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0/5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    toggleContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    toggleButton: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    toggleActive: {
        backgroundColor: '#6C63FF',
    },
    toggleText: {
        color: '#666',
    },
    toggleTextActive: {
        color: 'white',
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        fontSize: 12,
    },
    submitButton: {
        backgroundColor: '#6C63FF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AddTransactionModel;