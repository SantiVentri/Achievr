import AvatarModal from '@/components/Account/AvatarModal';
import { StyleSheet, View } from 'react-native';

export default function AvatarModalPage() {
    return (
        <View style={styles.container}>
            <AvatarModal />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 25,
    }
})