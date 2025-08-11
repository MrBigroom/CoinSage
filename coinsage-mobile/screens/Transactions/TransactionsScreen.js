import React, { useState, useEffect } from "react";
import { View, Text, SectionList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TransactionItem from './TransactionItem';
import AddTransactionModel from './AddTransactionModel';
import styles from './TransactionsStyles';
import { getTransactions, deleteTransaction, updateTransaction } from '../../src/services/api';

const TransactionsScreen = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModelVisible, setModelVisible] = useState(false);
    const [filter, setFilter] = useState('all');
    const [swipedId, setSwipedId] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchTransactions = async () => {
        try {
            const { data } = await getTransactions();
            setTransactions(data);
        } catch (error) {
            console.log('Failed to fetch transactions: ', error);
            Alert.alert('Error', 'Failed to fetch transactions');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {  
        fetchTransactions();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchTransactions();
    };

    const handleDelete = async (id) => {
        try {
            await deleteTransaction(id);
            setTransactions(prev => prev.filter(t => t.id !== id));
            setSwipedId(null);
        } catch (error) {
            console.error('Delete failed: ', error);
            Alert.alert('Error', 'Failed to delete transaction');
        }
    };

    const handleEdit = async (id, updates) => {
        try {
            const { data: updatedTransaction } = await updateTransaction(id, updates);
            setTransactions(prev => 
                prev.map(t => t._id === id ? updatedTransaction : t)
            );
            setSwipedId(null);
        } catch (error) {
            console.error('Update failed: ', error);
            Alert.alert('Error', 'Failed to update transaction');
        }
    };

    const filteredTransactions = transactions.filter(t => 
        filter === 'all' || (filter === 'income' ? t.amount > 0 : t.amount < 0)
    );

    const groupedTransactions = groupByDate(filteredTransactions);

    const groupByDate = (transactions) => {
        const grouped = {};
        transactions.forEach(t => {
            const date = new Date(t.date).toLocaleDateString();
            if(!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(t);
        });
        return Object.keys(grouped).map(date => ({
            title: date,
            data: grouped[date],
        }));
    };

    if(loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6C63FF" />
            </View>
        );
    }

    const SwipeableRow = ({ item }) => {
        const translateX = Animated.useSharedValue(0);
        const isActive = swipedId === item._id;

        const panGesture = Gesture.Pan()
            .activeOffsetX([-10, 10])
            .onUpdate((e) => {
                if(isActive) {
                    return;
                }
                if(Math.abs(e.translationX) > 20) {
                    translateX.value = e.translationX;
                }
            })
            .onEnd((e) => {
                if(Math.abs(e.translationX) > 100) {
                    runOnJS(setSwipedId)(item._id);
                    translateX.value = e.translationX > 0 ? 120 : -120;
                } else {
                    translateX.value = 0;
                }
            });
        
        const tapGesture = Gesture.Tap()
            .onEnd(() => {
                if(isActive) {
                    translateX.value = 0;
                    runOnJS(setSwipedId)(null);
                }
            });

        const composedGesture = Gesture.Simultaneous(panGesture, tapGesture);

        return (
            <GestureDetector gesture={composedGesture}>
                <Animated.View style={{ flexDirection: 'row' }}>
                    {}
                    {isActive && (
                        <View style={styles.swipeActions}>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => {
                                    translateX.value = 0;
                                    handleEdit(item._id, {
                                        amount: item.amount,
                                        category: item.category + " (updated)",
                                        description: item.description
                                    });
                                }}>
                                <Icon name="edit" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => {
                                    translateX.value = 0;
                                    handleDelete(item._id);
                                }}>
                                <Icon name="delete" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}

                    <Animated.View style={[styles.swipeContent, { transform: [{ translateX }] }]}>
                        <TransactionItem transaction={item} />
                    </Animated.View>
                </Animated.View>
            </GestureDetector>
        );
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Transactions</Text>
                <View style={styles.filterContainer}>
                    {['all', 'income', 'expense'].map((f) => (
                        <TouchableOpacity key={f} onPress={() => setFilter(f)}>
                            <Text style={filter === f ? styles.activeFilter : styles.filter}>
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <SectionList
                sections={groupedTransactions}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <SwipeableRow item={item} />
                )}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No transactions found</Text>
                    </View>
                }
            />

            <TouchableOpacity style={styles.addButton} onPress={() => setModelVisible(true)}>
                <Icon name="add" size={30} color='white' />
            </TouchableOpacity>

            <AddTransactionModel visible={isModelVisible} onClose={() => setModelVisible(false)} />
        </View> 
    );
};

/*
const SwipeableRow = ({ item, onDelete, onEdit, swipedId, setSwipedId }) => {
    const translateX = Animated.useSharedValue(0);
    const isActive = swipedId === item._id;

    const panGesture = Gesture.Pan()
        .activeOffsetX([-10, 10])
        .onUpdate((e) => {
            if(isActive) {
                return;
            }
            if(Math.abs(e.translationX) > 20) {
                translateX.value = e.translationX;
            }
        })
        .onEnd((e) => {
            if(Math.abs(e.translationX) > 100) {
                runOnJS(setSwipedId)(item.id);
                translateX.value = e.translationX > 0 ? 120 : -120;
            } else {
                translateX.value = 0;
            }
        });

        const tapGesture = Gesture.Tap()
            .onEnd(() => {
                if(isActive) {
                    translateX.value = 0;
                    runOnJS(setSwipedId)(null);
                }
            });

        const composedGesture = Gesture.Simultaneous(panGesture, tapGesture);

        return (
            <GestureDetector gesture={composedGesture}>
                <Animated.View style={{ flexDirection: 'row' }}>
                    {isActive && (
                        <View style={styles.swipeActions}>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => {
                                    handleEdit(item._id, {
                                        amount: -50,
                                        category: 'Updated category',
                                    });
                                }}>
                                <Icon name="edit" size={20} color='white' />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => {
                                    translateX.value = 0;
                                    onDelete(item.id);
                                    setSwipedId(null);
                                }}>
                                <Icon name="delete" size={20} color='white' />
                            </TouchableOpacity>
                        </View>
                    )}

                    <Animated.View style={[
                        styles.swipeContent, { transform: [{ translateX }], }
                    ]}>
                        <TransactionItem transaction={item} />
                    </Animated.View>
                </Animated.View>
            </GestureDetector>
        );
};
*/

export default TransactionsScreen;