# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




This is a relatively large project, consisting of about 10 pages and hundreds of functions. The number of get and post is about 40.

The project is divided into user login and administrator login. There can be multiple users, and the administrator only has one specific account manager.

Users first need to go to the financial management page to recharge, and can also activate membership status for 30 seconds. After you have funds in your account, you can go shopping in the mall. After checkout the money is deducted and the order is obtained. Orders can be viewed on the user information interface, and the delivery address can also be modified on that interface. Finally, there is the messaging interface, where users can chat with administrators.

After selecting the administrator to log in, you can change the product status in the product management interface. After the product is removed from the shelves, it will not be visible to the user, and it cannot be placed in the shopping cart if it is out of stock.

The administrator can also change the orders of all users in the order management interface. The administrator can choose to complete or cancel the order after the user has paid. If the order is canceled, a prompt to cancel the order will be issued in the user's message interface, prompting the administrator to edit.

Administrators can also chat with any user on the user management interface. Each user has an independent chat page, and messages are not shared.