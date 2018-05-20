import React from 'react';
import {Image, Button, Text, ScrollView, View, RefreshControl, ToolbarAndroid} from 'react-native';

import {requestLocationPermission} from "./src/functions"
import {API_PATH, AUTH_KEY} from "./src/constants"
import styles from "./src/styles"

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            weather: false,
            download: false,
            status: false,
            error: false,
            refreshing: false,
        };
    }

    getData(isFirst = false) {

        this.setState({
            weather: false,
            status: false,
            error: false,
            refreshing: !isFirst,
        });
        requestLocationPermission().then(result => {

            if (result.success || result.granted === true) {

                this.setState({status: "Получение местоположение"});

                navigator.geolocation.getCurrentPosition(
                    
                    result => {

                        this.setState({status: "Загрузка погоды"});
                        const position = {
                            latitude: result.coords.latitude,
                            longitude: result.coords.longitude,
                        };

                        fetch(`${API_PATH}?lat=${position.latitude}&lon=${position.longitude}&lang=ru&appid=${AUTH_KEY}&units=metric`)
                            .then(response => {
                                return response.json();
                            })
                            .then(response => {

                                this.setState({
                                    weather: response,
                                    download: true,
                                    refreshing: false,
                                    status: false
                                })
                            })

                    }, 
                    error => this.setState({
                        error: error.code === 2 ? "Доступ к геопозиции отказан" : error.message,
                        download: true,
                        status: false,
                        refreshing: false
                    }),
                    {
                        enableHighAccuracy: false, 
                        timeout: 20000, 
                        maximumAge: 60000
                    }
                );
            } else {
                this.setState({
                    error: `Доступ к геопозиции отказан`,
                    download: true,
                    status: false,
                    refreshing: false
                })
            }

        }).catch(error => {
            this.setState({
                error: error.message ? error.message : "Ошибка поучения доступа к геопозиции",
                download: true,
                status: false,
                refreshing: false
            })
        })
    }

    componentWillMount() {
        this.getData(true);
    }

    render() {
        const {weather, download, error, status} = this.state;

        let city = download && weather ? weather.name : false;
        let temp = download && weather ? `${weather.main.temp}°C` : false;
        let description = download && weather ? weather.weather[0].description : false;

        let MainView;
        
        if (download) {
            const refreshControl = <RefreshControl refreshing={this.state.refreshing} 
                                                    onRefresh={::this.getData}
                                                    colors={['#ae4b84']}/>;
            MainView = <ScrollView refreshControl={refreshControl}>
                    <View style={styles.content}>

                        {city && <Text style={styles.name}>{city}</Text>}
                        {status && <Text style={styles.status}>{status}</Text>}

                        {temp && <Text style={styles.result}>{temp}</Text>}
                        {description && <Text style={styles.result}>{description}</Text>}

                        {error && <Text style={styles.error}>{error}</Text>}
                        {error && <Button style={styles.button} onPress={::this.getData} title="Попробовать снова"/>}
                    </View>
                </ScrollView>
        } else {
            MainView = <Image source={require('./src/img/icon.png')} style={{width: 150, height: 150}}/>;
        }
        return (
            <View style={styles.app}>
                {download &&
                <ToolbarAndroid navIcon={require('./src/img/icon_toolbar.png')} title="DS Погода" titleColor="#fff"
                                style={styles.toolbar}/>}
                <View style={styles.container}>
                    {MainView}
                </View>
            </View>
        );
    }
}
