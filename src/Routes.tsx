import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import NewsForm from './pages/NewsForm';
import NewsList from './pages/NewsList';

import {INews} from './interfaces/INews';
import {NewsProvider} from './context/NewsContext';

type RootStackParamList = {
    NewsList: undefined;
    NewsForm: { news: INews }
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Routes() {
    return (
        <NewsProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='NewsList' screenOptions={screenOptions}>
                    <Stack.Screen
                        name='NewsList'
                        component={NewsList}
                        options={{title: 'Notícias'}}
                    />
                    <Stack.Screen
                        name='NewsForm'
                        component={NewsForm}
                        options={{title: 'Cadastro de Notícia'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </NewsProvider>
    );
}

const screenOptions = {
    headerTintColor: 'white',
    headerStyle: {backgroundColor: 'darkblue'}
}
