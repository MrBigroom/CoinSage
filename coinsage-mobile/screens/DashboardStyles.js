import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3436',
        marginBottom: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#636e72',
        marginBottom: 8,
    },
    summaryValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2d3436',
    },
    progressBar: {
        height: 6,
        backgroundColor: '#dfe6e9',
        borderRadius: 3,
        marginVertical: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#6c5ce7',
        borderRadius: 3,
    },
    progressText: {
        fontSize: 12,
        color: '#636e72',
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    transactionIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f1f1f1',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    transactionDetails: {
        flex: 1,
    },
    transactionCategory: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2d3436',
    },
    transactionDescription: {
        fontSize: 12,
        color: '#636e72',
        marginTop: 2,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: '600',
    },
    income: {
        color: '#00b894',
    },
    expense: {
        color: '#d63031',
    },
    linkText: {
        color: '#6c5ce7',
        fontSize: 14,
        fontWeight: '500',
    },
});