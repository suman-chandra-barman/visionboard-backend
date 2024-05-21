# LensHub

## Overview

LensHub is to design and implement a comprehensive Eye Glasses Management Dashboard, providing the tools to efficiently manage the eyeglasses inventory, track sales, and analyze sales history. The assignment will incorporate features such as authentication, CRUD operations, state management, real-time UI updates, and eyeglasses filtering.

## Live URL

The application is currently deployed at: [Live URL](https://lenshub.vercel.app/)

## Project Functionality Video

Watch this video to understand the functionality of the lenshub application:

[Project Functionality Video](https://drive.google.com/file/d/1D7__jjqzMkqzYUOkKN4mVksZ8v3eARPh/view?usp=sharing)

**Authentication:**

1. **User Registration and Login:**
    - Users must register and log in to access the dashboard.
    - Use JWT (JSON Web Tokens) for secure authentication.
    - Roles:
        1. **User Role:**
            - Users with the role of "User" have restricted access compared to managers. They can only modify the products they have added to the inventory. This means they can perform CRUD (Create, Read, Update, Delete) operations exclusively on the products they own.
            - Specifically, a user can:
                - Add new eyeglasses to the inventory.
                - Delete their existing eyeglasses from the inventory.
                - Update details of the eyeglasses they have added.
                - View and read the list of eyeglasses they have added.
        2. **Manager Role:**
            - Users with the role of “Manager” have broader permissions and can modify any product within the inventory. This role is typically assigned to administrators or higher-level staff members responsible for overseeing the entire inventory.
            - Managers can perform all CRUD operations on any product in the inventory, regardless of who added it. This includes:
                - Adding new eyeglasses to the inventory.
                - Deleting existing eyeglasses from the inventory.
                - Updating details of any eyeglasses in the inventory.
                - Viewing and reading the list of all eyeglasses in the inventory.
        
        By defining these roles and their respective permissions, the system ensures that users have control and ownership over the products they add while allowing managers to oversee and manage the entire inventory efficiently.
        

**Functionality:**

1. Eye Glasses **Management:**
    - CRUD Operations:
        - Add a new pair of eyeglasses to the inventory.
        - Delete existing eyeglasses from the inventory.
        - Update eyeglasses details.
        - Read and view the list of eyeglasses in the inventory.
        - Implement a robust filtering system to effectively narrow down eyeglasses selections based on various criteria.
2. **Sales Management:**
    - Users can search for a product to sell, and upon finding it, they can click the "Sell" button. On clicking the sell button a form will pop up. The form will have the following fields:
        - Quantity of the product to be sold (Input quantity cannot exceed the current available stock of the product)
        - Name of the buyer
        - Date of the sale
    
    **Note: If the quantity reaches zero, the product will be removed from the inventory.**
    
    - Invoice download (PDF)
        - After completing a sale, users will have the option to download the invoice for the order.
        - The invoice will contain details such as the product name, quantity, date, and name of the buyer.
        - Users can download the invoice for their records or for further processing.
        - For generating PDF invoices in a React application, you can use the following React PDF libraries:
            - **react-pdf**:
            - jspdf
            - react-pdf/renderer
            - react-to-print
3. **Sales History:**
    - View sales history categorized by:
        - Weekly
        - Daily
        - Monthly
        - Yearly
4. **Eye Glasses Filtering (Implement on the eyeglasses management page)**
- Implement a comprehensive eyeglasses filter system to optimize inventory management. The filter options should cater specifically to eyeglasses and vision care items:
    - **Filter by Frame Material:** Allow users to set a filter for specific frame materials (e.g., metal, plastic, acetate).
    - **Filter by Frame Shape:** Implement a real-time search functionality for frame shapes to quickly find eyeglasses with specific shapes (e.g., rectangular, round, cat-eye).
    - **Filter by Lens Type:** Enable searching by lens types (e.g., single-vision, bifocal, progressive).
    - **Filter by Brand:** Implement a filter for eyeglasses brands to quickly find items by a specific manufacturer.
    - **Filter by Price Range:** Implement a price range filter for eyeglasses.
    - **Filter by Gender:** Allow users to filter eyeglasses based on gender (e.g., men, women, unisex).
    - **Filter by Color:** Include a filter for eyeglasses colors.
    - **Additional Relevant Filter Parameters:** Introduce other relevant filter parameters such as temple length, bridge size, or any custom attributes associated with the eyeglasses.

## Technology Stack

- **Programming Language:** TypeScript
- **Web Framework:** Express.js
- **Database:** Mongodb with Mongoose
- **Authentication:** JWT (JSON Web Tokens)


## Getting Started

1. **Clone the Repository:**

    ```
    git clone https://github.com/your-username/lenshub.git
    ```

2. **Install Dependencies:**

    ```
    cd lenshub
    npm install
    ```

3. **Set up Environment Variables:**

    Create a `.env` file in the root directory and add  environment variables:


5. **Start the Server:**

    ```
    npm run dev
    ```

