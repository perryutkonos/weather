import {PermissionsAndroid} from 'react-native';

export async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Location Permission',
                'message': 'Activeev needs to access your location.'
            }
        );
        return {
            granted: granted,
            success: (granted === PermissionsAndroid.RESULTS.GRANTED),
    };
        
    } catch (err) {
        console.warn(err)
    }
}