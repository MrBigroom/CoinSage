import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import styles from './BudgetsStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Budgets = () => {
    const [budgets, setBudgets] = useState([
        { id: '1', category: 'Food', limit: 700, spent: 520 },
        { id: '2', category: 'Transport', limit: 200, spent: 240 },
    ]);
    const [isAdding, setIsAdding] = useState(false);
    const [newBudget, setNewBudget] = useState({ category: '', limit: '' });

    const handleAddBudget = () => {
        if(!newBudget.category || !newBudget.limit) {
            return;
        }
        setBudgets([...budgets, {
            id: Date.now().toString(),
            category: newBudget.category,
            limit: Number(newBudget.limit),
            spent: 0,
        }]);
        setNewBudget({ category: '', limit: '' });
        setIsAdding(false);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Monthly Budgets</Text>

            {budgets.map((budget) => (
                <View key={budget.id} style={styles.budgetCard}>
                    <View style={styles.budgetHeader}>
                        <Text style={styles.budgetCategory}>{budget.category}</Text>
                        <Text style={styles.budgetLimit}>RM{budget.spent} of RM{budget.limit}</Text>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width:`${Math.min(100, (budget.spent / budget.limit) * 100)}%` }]}/>
                    </View>
                    <View style={styles.budgetActions}>
                        <TouchableOpacity style={styles.editButton}>
                            <Icon name="edit" size={18} color='#666'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton}>
                            <Icon name="delete" size={18} color='#F44336'/>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

            {isAdding ? (
                <View style={styles.addForm}>
                    <TextInput
                        style={styles.input}
                        placeholder="Category"
                        value={newBudget.category}
                        onChangeText={(text) => setNewBudget({ ...newBudget, category: text })}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        keyboardType="numeric"
                        value={newBudget.limit}
                        onChangeText={(text) => setNewBudget({ ...newBudget, limit: text })}/>
                    <View style={styles.formButtons}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setIsAdding(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={() => handleAddBudget}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <TouchableOpacity style={styles.addButton} onPress={() => setIsAdding(true)}>
                    <Icon name="add" size={24} color='#6C63FF' />
                    <Text style={styles.addButtonText}>Add Budget</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
};

export default Budgets;