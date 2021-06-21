import React, {useContext, useState, useEffect} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {INews} from '../interfaces/INews';
import NewsContext from '../context/NewsContext';
import FloatButton from '../shared/components/FloatButton';

interface ErrosForm {
    title: boolean
    description: boolean
    author: boolean
}

const NewsForm: React.FC<StackScreenProps<any>> = ({route, navigation}) => {
    const [news, setNews] = useState<INews | any>(route.params || {});
    const [errors, setErrors] = useState<ErrosForm>({title: false, author: false, description: false});

    const [attemptSave, setAttemptSave] = useState<boolean>(false);

    const { dispath } = useContext(NewsContext);

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

    const checkField = (field: string): boolean => {
        const value: string = news[field] || '';

        return value.trim() === '';
    }

    useEffect(() => {
        const errosCheck: ErrosForm = {
            title: checkField('title'),
            author: checkField('author'),
            description: checkField('description')
        }

        setErrors(errosCheck);

    }, [news, attemptSave])

    function onChangeForm(data: object) {
        setNews((prevState: INews) => ({...prevState, ...data}));
    }

    function handleSave() {
        setAttemptSave(true);

        console.log('errosOnSave', errors);

        let canSalve = true;
        for (let hasError of Object.values(errors)) {
            if (hasError) {
                canSalve = false;
            }
        }

        if (canSalve) {
            dispath({
                type: news.id ? 'updateNews' : 'createNews',
                payload: news
            });
            navigation.goBack();

        } else {
            Alert.alert(
                'Preencha todos os campos.',
                'Verifique se todos os campos estão preenchidos corretamente e tente novamente.',
                [
                    {
                        text: 'Ok'
                    }
                ]);
        }
    }

    const InputLabel: React.FC<{ error?: boolean }> = ({children, error}) => {
        return (
            <View style={stylesLabelInput.labelInputContainer}>
                <Text style={stylesLabelInput.labelInput}>
                    {children}
                </Text>
                <Text style={[stylesLabelInput.labelInputInfo, error? stylesLabelInput.isInvalid : null]} >
                    * Campo obrigatório
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.form}>
            <InputLabel error={errors.title && attemptSave}>
                Título
            </InputLabel>
            <TextInput
                style={[styles.input, errors.title && attemptSave? styles.isInvalid : styles.isValid]}
                onChangeText={title => onChangeForm({title})}
                placeholder="Informe o Título"
                value={news.title}
            />

            <InputLabel error={errors.author && attemptSave}>
                Autor
            </InputLabel>
            <TextInput
                style={[styles.input, errors.author && attemptSave? styles.isInvalid : styles.isValid]}
                onChangeText={author => onChangeForm({author})}
                placeholder="Informe o Autor"
                value={news.author}
            />

            <InputLabel error={errors.description && attemptSave}>
                Descrição
            </InputLabel>
            <TextInput
                multiline={true}
                numberOfLines={14}
                style={[styles.input, errors.description && attemptSave? styles.isInvalid : styles.isValid]}
                onChangeText={description => onChangeForm({description})}
                placeholder="Informe o Corpo da Notícia"
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
    input: {
        padding: 6,
        borderWidth: 0.6,
        borderRadius: 3,
        marginBottom: 15
    },
    isValid: {
        borderColor: 'gray',
    },
    isInvalid: {
        borderColor: 'red',
    }
});

const stylesLabelInput = StyleSheet.create({
    labelInput: {
        fontWeight: 'bold',
        fontSize: 14
    },
    labelInputInfo: {
        marginLeft: 3,
        fontWeight: 'normal',
        fontSize: 10,
        textAlignVertical: 'center',
    },
    labelInputContainer: {
        flexDirection: 'row'
    },
    isInvalid: {
        color: 'red'
    }
});

