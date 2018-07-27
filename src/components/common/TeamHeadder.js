import React from 'react';
import { View, FlatList } from 'react-native';

import { UserInfoCell } from './UserInfoCell';

const TeamHeadder = ({ usersList }) => {
    return (<View
        style={{
            backgroundColor: '#6EC6FF',
            height: 67,
            shadowColor: '#000000',
            shadowOpacity: 0.3,
            shadowRadius: 1,
            shadowOffset: {
                height: 1,
                width: 0
            },
        }}
    >
        <FlatList
            horizontal
            data={usersList}
            renderItem={({ item }) => {
                return (
                    <UserInfoCell userInfo={item} />
                );
            }}
            keyExtractor={(item) => { return item.uid; }}
            showsHorizontalScrollIndicator={false}
        />
    </View>);
};

export { TeamHeadder };
