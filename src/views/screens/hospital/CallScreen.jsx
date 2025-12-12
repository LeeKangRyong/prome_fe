import { View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CallScreen = () => {

    const { width, height } = useWindowDimensions();

    return (
        <SafeAreaView>
            <View />
        </SafeAreaView>
    );
};

export default CallScreen;
