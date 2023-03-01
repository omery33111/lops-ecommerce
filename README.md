![image](https://user-images.githubusercontent.com/110463400/221566612-e7814606-87d7-467c-bf2a-d0d671c10690.png)

#

[![Docker Logo](https://img.shields.io/badge/docker-black?style=for-the-badge&logo=docker)]() 


[![Live Netlify Server](https://img.shields.io/badge/Live%20on-Netlify-00ad9f.svg)](https://gentle-profiterole-1c86e3.netlify.app/) 

[![Last Commit on GitHub](https://img.shields.io/github/last-commit/omery33111/lops-ecommerce.svg)](https://github.com/omery33111/lops-ecommerce/commits/main)

[![Pull Requests](https://img.shields.io/github/issues-pr/omery33111/lops-ecommerce.svg?labelColor=24292E&logo=github&logoColor=white)](https://github.com/omery33111/lops-ecommerce/pulls)


## Table of Contents
- [Description](#description) 🖐️
- [Technologies](#technologies) 🛠️
- [Features](#features) 📕
  - [Feature List](#feature-list) 📄
  - [Profile Hall](#profile-hall) ✏️
  - [Admin Hall](#admin-hall) 🖊️
- [Running Instructions](#running-instructions) 🖱️
  - [Deployments](#deployments) ✅
  - [Back-end adjustment](#back-end-adjustment) 🖥️
  - [Front-end adjustment](#front-end-adjustment) 🖥️
- [Admin & Staff](#admin--staff) 🤵
- [Contact](#contact) 📞


## Description
LOPS the one-stop-shop for fashionable items for men.

LOPS collection includes stylish accessories such as bracelets, rings, and necklaces. LOPS also offer practical essentials like wallets, watches, and bags, as well as elegant hats to complete the set.

LOPS is built on a combination of powerful technologies.

For the back-end, the Django framework API and Simple JWT provide a secure and robust foundation for handling user authentication and managing data. On the front-end, React with Redux and TypeScript enable a dynamic and responsive user interface. Our database options include MySQL and SQLite3, with easy-to-follow instructions in the README.md file on how to switch between the two.



## Technologies
* Django: a high-level Python web framework that enables rapid development and clean design.

* Django REST framework: a powerful and flexible toolkit for building Web APIs.

* Simple JWT: a JSON Web Token authentication library for Django that simplifies secure user authentication.

* React: a JavaScript library for building user interfaces, which enables fast and dynamic rendering of components.
* Redux: a state management library that allows for centralized management of application state.
* TypeScript: a superset of JavaScript that adds static types, enabling better code organization and easier debugging.
* MySQL: a popular open-source relational database management system known for its scalability and performance.
* SQLite3: a lightweight and self-contained relational database management system that's ideal for smaller-scale projects.



## Features
LOPS provides an exceptional experience for both customers and staff.

For customers, the authentication system ensures secure access to their account, while the profile hall offers a range of options for managing personal information, addresses, reviews and orders. The intuitive categories and product pages make it easy to find and purchase items, with the added convenience of cart and wishlist functionality. PayPal checkout API further streamlines the checkout process, ensuring a smooth transaction from start to finish.

For staff, the admin hall provides comprehensive data management tools, with clear options for managing both users and products.

In the users section of the admin hall, staff members can easily manage all user accounts, with the ability to view and edit user profile data, including orders, reviews, and addresses. This provides valuable insights into user behavior and preferences, enabling staff to better tailor the shopping experience to meet customer needs.

In the products section, staff members have full control over product and category management. This includes the ability to view and edit all product and category data, as well as add and delete products and categories as needed. The comprehensive order management tools make it easy to track and fulfill orders, ensuring timely and efficient delivery of products to customers.



### Feature List

* Authentication
* Products & categories
* Cart & wishlist
* Order & PayPal checkout API


#### Profile hall:
* Profile with option to update.
* Manage multiple addresses, post, update, delete.
* Control reviews data, post, update, delete.
* View Orders.

#### Admin hall:
* Watch all user profiles.
* update user profile.
* update and delete user addresses.
* update and delete user reviews.
* Watch user orders.
* Watch all orders.
* Watch all products.
* Watch all categories.
* Post, update and delete products.
* Post, update and delete categories.

## Running Instructions
### Deployments
The front-end of my website is hosted by [Netlify](https://deluxe-dango-2d860f.netlify.app/) while the database back-end is hosted on [Render](https://render.com/), allowing for seamless integration and efficient website management.

#### Docker
Unlock the power of containerization with just one command! Simply enter the following command to open your app in Docker and experience the convenience of modern application deployment.
 ```
docker-compose up
 ```
#

In order to make the software work properly, the steps below must be followed:

### Back-end adjustment

| Step | Command | Explanation |
| --- | --- | --- |
| 1 | `git clone https://github.com/omery33111/django-react_redux_ts-ecommerce.git` | Clone the project from GitHub |
| 2 | `cd .\django-react_redux_ts-ecommerce\Back-end\` | Navigate to the back-end directory |
| 3 | `py -m virtualenv [name your environments file]` | Create virtual environments |
| 4 | `.\[environments name]\Scripts\activate` | Activate the created virtual environment |
| 5 | `pip install -r .\requirements.txt` | Install the project dependencies |
| 6 | `django-react_redux_ts-ecommerce  -->   Back-end  -->  shop  -->  settings.py` | Go to the "settings.py" file in the "shop" directory. |

To run the program with SQLite3, keep the code as is.

To run the program with MySQL Workbench, mark lines 127-132, unmark lines 136-145, and fill the 'NAME' and 'PASSWORD' with your MySQL database credentials.

![image](https://user-images.githubusercontent.com/110463400/221629659-2fb64c25-6999-4250-ba11-9297746a6245.png)

| ...6 |  |  |
| --- | --- | --- |
| 7 | `py manage.py migrate` | Apply the database migrations |
| 8 | `py manage.py loaddata db.json` | Load the data into your database |
| 9 | `py manage.py runserver` | Run the back-end server |


### Front-end adjustment

| Step | Command | Explanation |
| --- | --- | --- |
| 1 | `cd ..` | Go back to the main directory |
| 2 | `cd .\Front-end\shop\` | Navigate to the front-end directory |
| 3 | `npm install` | Install the front-end dependencies |
| 4 | `npm start` | Run the front-end server |

**Now you will be able to access LOPS in your local host** "http://localhost:3000".


## Admin & Staff
In order to be able to access the admin panel of Django, note that you are in Back-end directory and create superuser as written:
  ```
  py manage.py createsuperuser
  ```

To access the admin hall of LOPS, create superuser or log in with the following details:
 ```
Username: Staff
Password: staff123
 ```


### Contact ✏️

📧 omery33111@gmail.com

🐱 https://github.com/omery33111

