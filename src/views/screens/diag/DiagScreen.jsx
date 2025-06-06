import React from 'react';
import { Alert, Text, Image, Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DiagScreen = () => {
    return (
        <SafeAreaView>
            <Text>심전도 검사를 진행하고 건강을 체크해보세요!</Text>
            <Image />
            <ScrollView>
                <Text>Step 1</Text>
                <Text>Step 2</Text>
                <Text>Step 3</Text>
                <Text>Step 4</Text>
            </ScrollView>

            <Button title="검사 결과로 ai 챗봇에게 물어보기" onPress={() => { Alert.alert('버튼 누름!'); }}/>
        </SafeAreaView>
    );
};

export default DiagScreen;
