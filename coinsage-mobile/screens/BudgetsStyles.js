import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2d3436',
        marginBottom: 24,
    },
    budgetCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    budgetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    budgetCategory: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2d3436',
    },
    budgetLimit: {
        fontSize: 14,
        color: '#636e72',
    },
    progressBar: {
        height: 6,
        backgroundColor: '#dfe6e9',
        borderRadius: 3,
        marginVertical: 8,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#6c5ce7',
        borderRadius: 3,
    },
    budgetActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 4,
    },
    editButton: {
        padding: 8,
        marginLeft: 8,
    },
    deleteButton: {
        padding: 8,
        marginLeft: 8,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#6c5ce7',
        borderRadius: 12,
        marginTop: 8,
    },
    addButtonText: {
        color: '#6c5ce7',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    addForm: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#dfe6e9',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
        fontSize: 16,
    },
    formButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    cancelButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
    },
    cancelButtonText: {
        color: '#636e72',
        fontSize: 14,
        fontWeight: '500',
    },
    saveButton: {
        backgroundColor: '#6c5ce7',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
});