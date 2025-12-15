

import { Catalogue } from "../screens/Catalogue";
import EspaceClient from "../screens/EspaceClient";
import Home from "../screens/Home";
import Panier from "../screens/Panier";
import { createTabNavigator } from "@react-navigation/Tab";


const Tab = createTabNavigator();

export const TabNavigation = () => {
    return (
        <Tab.Navigator >
            <Tab.Screen name=" 🏠︎ Ton Espace" component={EspaceClient} />
            <Tab.Screen name=" 𖠩 Catalogue" component={Catalogue} />    
            <Tab.Screen name=" ⌯⌲ Panier" component={Panier} />
            <Tab.Screen name=" ⏻ Deconnexion" component={Home} />

        </Tab.Navigator>
    );
};