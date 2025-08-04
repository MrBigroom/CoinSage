import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import styles from './DashboardStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Dashboard = ({ navigation }) => {
    const spendingData = [
        { category: 'Food', amount: 520, color: '#FF6384' },
        { category: 'Transport', amount: 240, color: '#36A2EB' },
        { category: 'Entertainment', amount: 72, color: '#FFCE56' },
    ];

    const budgetStatus = {
        total: 1000,
        spent: 832,
    };

    const recentTransaction = [
        { id: '1', category: 'Food', amount: -7, description: 'Breakfast' },
        { id: '2', category: 'Transport', amount: -2.40, description: 'Parking fee' },
        { id: '3', category: 'Pocket money', amount: 1500 }
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}></Text>
                <View style={styles.summaryRow}>
                    <View>
                        <Text style={styles.summaryLabel}>Total Spent</Text>
                        <Text style={styles.summaryValue}>RM832</Text>
                    </View>
                    <View>
                        <Text style={styles.summaryLabel}>Remaining</Text>
                        <Text style={styles.summaryValue}>RM168</Text>
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Budget</Text>
                    <TouchableOpacity style onPress={() => navigation.navigate('Budgets')}>
                        <Text style={styles.linkText}>View All</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${(budgetStatus.spent / budgetStatus.total) * 100}%`}]} />
                </View>
                <Text style={styles.progressText}>${budgetStatus.spent} of ${budgetStatus.total} spent</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Spending by Category</Text>
                <PieChart
                style={{ height: 200 }}
                data={spendingData}
                valueAccessor={({ item }) => item.amount}
                spacing={0}
                outerRadius={'95%'}/>
            </View>

            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Recent Transactions</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
                        <Text style={styles.linkText}>See All</Text>
                    </TouchableOpacity>
                </View>
                {recentTransaction.map((txn) => (
                    <View key={txn.id} style={styles.transactionItem}>
                        <View style={styles.transactionIcon}>
                            <Icon
                                name={txn.amount > 0 ? 'arrow-upward' : 'arrow-downward'}
                                size={20}
                                color={txn.amount > 0 ? '#4CAF50' : '#F44336'}/>
                        </View>
                        <View style={styles.transactionDetails}>
                            <Text style={styles.transactionCategory}>{txn.category}</Text>
                            {txn.description && <Text style={styles.transactionDescription}>{txn.description}</Text>}
                        </View> 
                        <Text style={[styles.transactionAmount, txn.amount > 0 ? styles.income : styles.expense]}>
                            {txn.amount > 0 ? '+' : '-'}RM{Math.abs(txn.amount)}
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default Dashboard;