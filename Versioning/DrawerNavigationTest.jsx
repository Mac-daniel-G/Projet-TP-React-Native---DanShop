import { Catalogue } from "../screens/Catalogue";
import { Contact } from "../screens/Contact";
import EspaceClient from "../screens/EspaceClient";
import Home from "../screens/Home";
import Panier from "../screens/Panier";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TabNavigation } from "./TabNavigation";


const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
    return (
        <Drawer.Navigator >
            <Drawer.Screen name=" 🏠︎ Ton Espace" component={EspaceClient} />
            <Drawer.Screen name=" 𖠩 Catalogue" component={Catalogue} />    
            <Drawer.Screen name=" ⌯⌲ Panier" component={Panier} />
            <Drawer.Screen name=" ✆ Contact" component={Contact} />
            <Drawer.Screen name=" ⏻ Deconnexion" component={Home} />

            <TabNavigation />

        </Drawer.Navigator>
        
    );
};