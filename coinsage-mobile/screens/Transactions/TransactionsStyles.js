import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        padding: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        gap: 15,
    },
    filter: {
        color: '#666',
        fontSize: 16,
    },
    activeFilter: {
        color: '#6C63FF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    sectionHeader: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 5,
        paddingHorizontal: 15,
        color: '#666',
    },
    swipeActions: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: 'row',
        width: 120,
    },
    swipeContent: {
        width: '100%',
        backgroundColor: 'white',
    },
    editButton: {
        backgroundColor: '#FFA500',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
    },
    deleteButton: {
        backgroundColor: '#F44336',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#6C63FF',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
    filterButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    activeFilterButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        backgroundColor: '#6C63FF',
    },
    filterText: {
        color: '#666',
    },
    activeFilterText: {
        color: 'white',
    },
});