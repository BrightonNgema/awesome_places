import { Navigation } from 'react-native-navigation';
import Icon from "react-native-vector-icons/Ionicons";   
import {Platform} from 'react-native';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-share-alt" : "ios-share", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30),
        
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "awesome-places.FindPlaceScreen",
                    label: "Find Place",
                    title: "Find Place",
                    icon: sources[0],
                    navigatorButtons:{
                        leftButtons:[
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"                               
                            }
                        ]
                    }
                },
                {
                    screen: "awesome-places.SharePlaceScreen",
                    label: "Share Place",
                    title: "Share Place",
                    icon: sources[1],
                    navigatorButtons:{
                        leftButtons:[
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"                                                               
                            }
                        ]
                    }                  
                }
            ],
            tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
                tabBarButtonColor: '#aaa', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
                tabBarSelectedButtonColor: 'orange', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
            },
            appStyle: { // optional, add this if you want to style the tab bar beyond the defaults
                tabBarButtonColor: '#aaa', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
                tabBarSelectedButtonColor: 'orange', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
            },
            drawer: {
                left: {
                    screen: "awesome-places.SideDrawerScreen",
                }
            }
        }); 
    });
};

export default startTabs;

