import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const images = {
  bruschetta: require('./assets/Bruschetta.jpeg'),
  stuffedMushrooms: require('./assets/StuffedMushrooms.jpeg'),
  capreseSkewers: require('./assets/CapreseSkewers.jpeg'),
  grilledSalmon: require('./assets/GrilledSalmon.jpeg'),
  beefStroganoff: require('./assets/BeefStroganoff.jpeg'),
  vegetableStirFry: require('./assets/VegetableStirFry.jpeg'),
  chocolateLavaCake: require('./assets/ChocolateLavaCake.jpeg'),
  tiramisu: require('./assets/Tiramisu.jpeg'),
  fruitTart: require('./assets/FruitTart.jpeg'),
  background: require('./assets/Background.jpeg'),
  logo: require('./assets/logo.png'),
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const USD_TO_ZAR = 18;

const convertToZAR = (price) => (price * USD_TO_ZAR).toFixed(2);

const restaurants = [
  {
    id: '1',
    name: 'Italian Bistro',
    menu: {
      starters: [
        { item: 'Bruschetta', price: 5, image: images.bruschetta },
        { item: 'Stuffed Mushrooms', price: 6, image: images.stuffedMushrooms },
        { item: 'Caprese Skewers', price: 7, image: images.capreseSkewers },
      ],
      mains: [
        { item: 'Grilled Salmon', price: 15, image: images.grilledSalmon },
        { item: 'Beef Stroganoff', price: 12, image: images.beefStroganoff },
        { item: 'Vegetable Stir-Fry', price: 10, image: images.vegetableStirFry },
      ],
      desserts: [
        { item: 'Chocolate Lava Cake', price: 8, image: images.chocolateLavaCake },
        { item: 'Tiramisu', price: 7, image: images.tiramisu },
        { item: 'Fruit Tart', price: 6, image: images.fruitTart },
      ],
    },
  },
];

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'silas' && password === 'francoise') {
      Alert.alert('Login Successful', 'Welcome to the Food Ordering App!');
      navigation.navigate('Drawer');
    } else {
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} color="#ff6347" />
      </ScrollView>
    </ImageBackground>
  );
};

const HomeScreen = ({ navigation }) => {
  const allItems = [
    ...restaurants[0].menu.starters,
    ...restaurants[0].menu.mains,
    ...restaurants[0].menu.desserts,
  ];
  const averagePrice = (
    allItems.reduce((acc, item) => acc + item.price, 0) / allItems.length
  ).toFixed(2);

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.header}>Welcome to MANNE CACHE</Text>
        <Text style={styles.subheader}>Average Price: R{convertToZAR(averagePrice)}</Text>
        {['starters', 'mains', 'desserts'].map((category) => (
          <View style={styles.menuCategory} key={category}>
            <Text style={styles.categoryLabel}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Menu', { category })}>
              <Image
                source={restaurants[0].menu[category][0].image} 
                style={styles.menuImage}
              />
            </TouchableOpacity>
          </View>
        ))}
        <Button title="View Basket" onPress={() => navigation.navigate('Basket', { basket: [] })} />
        <Button title="Logout" onPress={() => navigation.navigate('Login')} />
      </ScrollView>
    </ImageBackground>
  );
};

const MenuScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const items = restaurants[0].menu[category];

  const handleAddToBasket = (item) => {
    const existingBasket = route.params?.basket || [];
    existingBasket.push(item);
    navigation.navigate('Basket', { basket: existingBasket });
  };

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>{category.toUpperCase()}</Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
        <FlatList
          data={items}
          keyExtractor={(item) => item.item}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Image source={item.image} style={styles.menuItemImage} />
              <Text style={styles.menuItemText}>{item.item} - R{convertToZAR(item.price)}</Text>
              <Button title="Add to Basket" onPress={() => handleAddToBasket(item)} />
            </View>
          )}
        />
      </ScrollView>
    </ImageBackground>
  );
};

const BasketScreen = ({ route, navigation }) => {
  const [basket, setBasket] = useState(route.params?.basket || []);
  
  const removeFromCart = (item) => {
    setBasket(prevItems => prevItems.filter(cartItem => cartItem.item !== item.item));
    Alert.alert("Removed", `${item.item} removed from your cart.`);
  };

  const handleCheckout = () => {
    Alert.alert("Checkout", "Thank you for your order!");
    setBasket([]);
  };

  const totalAmount = basket.reduce((total, item) => total + item.price, 0).toFixed(2);

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Cart</Text>
        {basket.length > 0 ? (
          <FlatList
            data={basket}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Image source={item.image} style={styles.cartImage} />
                <Text style={styles.itemText}>{item.item}</Text>
                <Button title="Remove" onPress={() => removeFromCart(item)} />
              </View>
            )}
            keyExtractor={(item) => item.item}
          />
        ) : (
          <Text style={styles.description}>Your cart is empty!</Text>
        )}
        <Text style={styles.header}>Total: R{convertToZAR(totalAmount)}</Text>
        <Button title="Checkout" onPress={handleCheckout} />
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </ImageBackground>
  );
};

const OrderPlacedScreen = () => (
  <View style={styles.centered}>
    <Text style={styles.header}>Your Order Has Been Placed!</Text>
  </View>
);

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

const DrawerNavigation = () => (
  <Drawer.Navigator drawerContent={CustomDrawerContent}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Basket" component={BasketScreen} />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Drawer" component={DrawerNavigation} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Basket" component={BasketScreen} />
        <Stack.Screen name="OrderPlaced" component={OrderPlacedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  menuCategory: {
    marginVertical: 10,
  },
  categoryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  menuImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  menuItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  menuItemText: {
    fontSize: 16,
    flex: 1,
  },
  basketItem: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  basketItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  basketItemDetails: {
    flex: 1,
  },
  basketItemButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  selectedMealContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  selectedMealHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedMealImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  cartImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  description: {
    fontSize: 18,
    color: '#555',
  },
});
