# Food Ordering App

This is a food ordering app built with React Native, featuring a login system, menu navigation, shopping basket, and order placement functionality. The app uses both Stack and Drawer navigators for smooth transitions between screens.

## Features:
- User Login and Authentication
- Displaying Menu Categories (Starters, Mains, Desserts)
- Adding Items to Basket
- Viewing and Managing Basket Items
- Checkout and Order Confirmation
- Custom Drawer Navigation

---

## Changelog

### **Version 1.1.0** (Refactoring & Updates since Part 2)

#### **1. User Authentication (Login)**
- **Login Logic:**
  - The login screen now checks the username and password against hardcoded credentials (username: **silas**, password: **francoise**).
  - If credentials match, the user is logged in and directed to the Drawer Navigator (`Home` screen).
  - Added a login failure alert when incorrect credentials are entered.
- **State Management:**
  - Added React `useState` hooks for managing the username and password inputs.
  
#### **2. Home Screen Updates**
- **Menu Categories:**
  - The home screen now displays three main categories: **Starters**, **Mains**, and **Desserts**, each with an image representing that category.
  - Added navigation to the `Menu` screen based on the selected category.
- **Average Price:**
  - Displayed the average price of all menu items, calculated dynamically.
  - Added currency conversion from USD to ZAR (South African Rand) using a fixed exchange rate (`USD_TO_ZAR` constant).
  
#### **3. Menu Screen**
- **Dynamic Menu Rendering:**
  - The menu now dynamically renders items based on the selected category (Starters, Mains, Desserts).
  - Each item shows its name, price, and image.
  - **"Add to Basket" Button**: Users can add items to their shopping basket.
  
#### **4. Basket (Cart) Screen**
- **Basket Management:**
  - Added a screen for viewing and managing the user's shopping basket.
  - Users can remove items from the basket, and the total price is updated accordingly.
  - **Checkout Button**: Users can proceed with the checkout, which displays an order confirmation message.
  
#### **5. Order Confirmation Screen**
- **Order Confirmation:**
  - Added a confirmation screen that shows the message: "Your Order Has Been Placed!" after the user checks out.

#### **6. Custom Drawer Navigation**
- **Drawer Navigation:**
  - Created a custom drawer content that allows users to navigate between the **Home** and **Basket** screens.
  - Added `DrawerContentScrollView` and `DrawerItemList` for a cleaner and more customized drawer.

#### **7. UI and Styling**
- **Responsive Design:**
  - The app layout has been adjusted for better responsiveness across different screen sizes using `Dimensions` for dynamic sizing.
  - Improved styling for buttons, text, and images for better user experience.
  - **Image Backgrounds**: Applied consistent background images to different screens using `ImageBackground`.
  
#### **8. Currency Conversion**
- **Currency Handling:**
  - Prices for items are displayed in both USD and ZAR (South African Rand).
  - Added a helper function `convertToZAR()` to convert USD prices to ZAR at a fixed exchange rate.

---

## Refactoring Updates

### **1. Code Structure and Readability**
- **Code Organization:**
  - The code has been refactored for better modularity and readability.
  - Extracted reusable components like the menu item list, cart item list, and individual screens for easier maintenance.
  
### **2. State Management**
- **Basket Management:**
  - Refactored the basket logic to use `useState` for dynamic updates (i.e., adding/removing items from the basket).
  - Removed any redundant code and ensured that state is updated correctly across screens.

### **3. UI Improvements**
- **Consistent Layouts:**
  - The app’s visual design was refactored to ensure consistent padding, margins, and alignments for better user experience.
  - Updated button styles to provide a more uniform look across different screens.

### **4. Componentization**
- **Reusable Components:**
  - Introduced reusable components for rendering list items and handling common actions (e.g., buttons for adding/removing items from the basket).
  - Ensured separation of concerns by creating individual functional components for each screen, improving maintainability.

---

