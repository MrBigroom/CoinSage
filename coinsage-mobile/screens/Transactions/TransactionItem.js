import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TransactionItem = ({ transaction }) => {
    const isIncome = transaction.amount > 0;

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon
                    name={isIncome ? 'arrow-upward' : 'arrow-downward'}
                    size={20}
                    color={isIncome ? '#4CAF50' : 'F44336'}
                />
            </View>
            <View style={styles.details}>
                <Text style={styles.category}>{transaction.category}</Text>
                {transaction.description && <Text style={styles.description}>{transaction.description}</Text>}
            </View>
            <Text style={[styles.amount, isIncome ? styles.income : styles.expense]}>
                {isIncome ? '+' : '-'}RM{Math.abs(transaction.amount).toFixed(2)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 15,
    },
    details: {
        flex: 1,
    },
    category: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    description: {
        color: '#666',
        fontSize: 14,
    },
    amount: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    income: {
        color: '#4CAF50',
    },
    expense: {
        color: '#F44336',
    },
});

export default TransactionItem;