import React, {createContext, useReducer} from 'react';
import { INews } from '../interfaces/INews';
import { news } from '../data/news';

const initialState = news;
const NewsContext = createContext<{ newsContext?: INews[], dispath?: any }>({});

type NewsActionType = {
    type: 'deleteNews' | 'createNews' | 'updateNews'
    payload?: INews
}

export const NewsProvider: React.FC = props => {

    const reducer = (newsState: INews[], action: NewsActionType): INews[] => {
        switch (action.type) {
            case 'deleteNews':
                return newsState.filter(news => news.id !== action.payload?.id);
            case 'createNews':
                return [...newsState, {...action.payload!, id: Date.now().toString()}];
            case 'updateNews':
                return newsState.map(news => news.id === action.payload?.id? action.payload : news);
            default:
                return state;
        }
    }

    const [state, dispath] = useReducer(reducer, initialState);

    return (
        <NewsContext.Provider value={{newsContext: state, dispath}}>
            {props.children}
        </NewsContext.Provider>
    )
}

export default NewsContext;
