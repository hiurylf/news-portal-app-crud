import React, {useContext, useEffect, useState} from 'react';
import {
    FlatList,
    ListRenderItem,
    SafeAreaView,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {INews} from '../interfaces/INews';
import NewsContext from '../context/NewsContext';
import FloatButton from '../shared/components/FloatButton';

const NewsList: React.FC<StackScreenProps<any>> = ({navigation}) => {
    const [selectedId] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');

    const {newsContext} = useContext(NewsContext);

    const [filteredNewsContext, setFilteredNewsContext] = useState<INews[]>(newsContext || []);

    useEffect( () => {
        if (search && newsContext) {
            setFilteredNewsContext( newsContext.filter(news => {
                return news.title
                    .toLowerCase()
                    .indexOf(search.toLowerCase()) !== -1 ||
                    news.author
                        .toLowerCase()
                        .indexOf(search.toLowerCase()) !== -1;
            }));
        } else {
            setFilteredNewsContext(newsContext || []);
        }

    }, [newsContext, search]);

    const renderItemNews: ListRenderItem<INews> = ({item}) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('NewsForm', item)}
            >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description} numberOfLines={4}>{item.description}</Text>
                <Text style={styles.author}>{item.author}</Text>
            </TouchableOpacity>
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    clearButtonMode='always'
                    style={styles.input}
                    onChangeText={search => setSearch(search)}
                    placeholder='Procurar'
                    value={search}

                />
            </View>

            <FlatList
                data={filteredNewsContext}
                keyExtractor={item => item.id}
                renderItem={renderItemNews}
                extraData={selectedId}
            />

            <FloatButton name='add-circle' color='sucess' handle={() => navigation.navigate('NewsForm')}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 20,
        marginBottom: 16,
        marginHorizontal: 16,
        backgroundColor: '#e6e6f3'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    author: {
        fontSize: 14,
        textAlign: 'right',
        marginTop: 2
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic'
    },
    inputContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    input: {
        padding: 5,
        borderColor: 'gray',
        borderWidth: 0.8,
        borderRadius: 3,
    }
});

export default NewsList;
