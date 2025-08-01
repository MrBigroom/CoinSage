import React, { useState, useEffect } from "react";
import { View, Text, SectionList, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TransactionItem from './TransactionItem';
import AddTransactionModel from './AddTransactionModel';
import styles from './TransactionsStyles';

const TransactionsScreen = () => {
    const [transactions, setTransactions] = useState([]);
    const [isModelVisible, setModelVisible] = useState(false);
    const [filter, setFilter] = useState('all');
    const [swipedId, setSwipedId] = useState(null);

    useEffect(() => {
        setTransactions([
            { id: '1', amount: -50, category: 'Food', date: '2025-10-01', description: 'Lunch'},
            { id: '2', amount: 2000, category: 'Salary', date: '2025-10-01'},
        ]);
    }, []);

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

    const handleDelete = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const handleEdit = (id) => {
        console.log('Editing transaction: ', id);
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
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SwipeableRow
                        item={item}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        swipedId={swipedId}
                        setSwipedId={setSwipedId}/>
                )}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => setModelVisible(true)}>
                <Icon name="add" size={30} color='white' />
            </TouchableOpacity>

            <AddTransactionModel visible={isModelVisible} onClose={() => setModelVisible(false)} />
        </View> 
    );
};

const SwipeableRow = ({ item, onDelete, onEdit, swipedId, setSwipedId }) => {
    const translateX = Animated.useSharedValue(0);
    const isActive = swipedId === item.id;

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
                                    translateX.value = 0;
                                    onEdit(item.id);
                                    setSwipedId(null);
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

export default TransactionsScreen;