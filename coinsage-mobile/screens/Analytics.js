import React from "react";
import { View, Text, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-svg-charts';
import styles from './AnalyticsStyles';

const Analytics = () => {
    const monthlyData = [50, 10, 40, 95, 85, 91, 35, 53, 24, 50, 20, 80]
        .map((value, index) => ({
            value,
            month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index],
            svg: { fill: '#6C63FF', },
        }));
    
    const categoryData = [
        { category: 'Food', amount: 320, svg: { fill: '#FF6384' } },
        { category: 'Transport', amount: 150, svg: { fill: '#36A2EB' } },
        { category: 'Rent', amount: 600, svg: { fill: '#FFCE56' } },
        { category: 'Entertainment', amount: 120, svg: { fill: '#4BC0C0' } },
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Financial Analytics</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Monthly Spending Trends</Text>
                <View style={styles.chartContainer}>
                    <BarChart
                        style={styles.chart}
                        data={monthlyData}
                        yAccessor={({ item }) => item.value}
                        xAccessor={({ item }) => item.month}
                        contentInset={{ top: 20, bottom: 20 }}
                        spacingInner={0.4}
                        spacingOuter={0.1}/>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Spending by Category</Text>
                <View style={styles.chartContainer}>
                    <PieChart
                        style={styles.chart}
                        data={categoryData}
                        valueAccessor={({ item }) => item.amount}
                        spacing={0}
                        outerRadius={'95%'}
                        innerRadius={10}
                        padAngle={0.02}/>
                </View>

                <View style={styles.legendContainer}>
                    {categoryData.map((item, index) => (
                        <View key={index} style={styles.legendItem}>
                            <View style={[styles.legendColor, { backgroundColor: item.svg.fill }]} />
                            <Text style={styles.legendText}>{item.category}: RM{item.amount}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default Analytics;