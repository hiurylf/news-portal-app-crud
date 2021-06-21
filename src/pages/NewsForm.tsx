import React, {useContext, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {INews} from '../interfaces/INews';
import NewsContext from '../context/NewsContext';
import FloatButton from '../shared/components/FloatButton';

const NewsForm: React.FC<StackScreenProps<any>> = ({route, navigation}) => {
    const [news, setNews] = useState<INews | any>(route.params || {});

    const {dispath} = useContext(NewsContext);

    function handleAlertDelete(): void {
        Alert.alert(
            'Excluir Notícia',
            'Deseja excluir esta notícia?',
            [
                {
                    text: 'Não'
                },
                {
                    text: 'Sim',
                    onPress() {
                        dispath({
                            type: 'deleteNews',
                            payload: news
                        });
                        navigation.goBack();
                    }
                }
            ]);
    }

    function handleSave() {
        dispath({
            type: news.id ? 'updateNews' : 'createNews',
            payload: news
        });
        navigation.goBack();
    }

    return (
        <View style={styles.form}>
            <Text style={styles.inputLabel}>Título</Text>
            <TextInput
                style={styles.input}
                onChangeText={title => setNews((prevState: INews) => ({...prevState, title}))}
                placeholder='Informe o Título'
                value={news.title}
            />

            <Text style={styles.inputLabel}>Autor</Text>
            <TextInput
                style={styles.input}
                onChangeText={author => setNews((prevState: INews) => ({...prevState, author}))}
                placeholder='Informe o Autor'
                value={news.author}
            />

            <Text style={styles.inputLabel}>Descrição</Text>
            <TextInput
                multiline={true}
                numberOfLines={14}
                style={styles.input}
                onChangeText={description => setNews((prevState: INews) => ({...prevState, description}))}
                placeholder='Informe o Corpo da Notícia'
                value={news.description}
            />
            <FloatButton name='save' color='sucess' handle={handleSave}/>
            {news.id && <FloatButton name='trash' color='danger' where='left' handle={handleAlertDelete}/>}
        </View>
    );
};

export default NewsForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 20
    },
    inputLabel: {
        fontWeight: 'bold',
        marginLeft: 3
    },
    input: {
        padding: 6,
        borderColor: 'gray',
        borderWidth: 0.6,
        borderRadius: 3,
        marginBottom: 15
    }
});

