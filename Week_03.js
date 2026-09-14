
let orders = [
    {
        customer: "Ali",
        product: "Laptop",
        quantity: 2,
        price: 50000,
        status: "Delivered"
    },
    {
        customer: "Ahmed",
        product: "Mouse",
        quantity: 3,
        price: 1500,
        status: "Shipped"
    },
    {
        customer: "Ali",
        product: "Keyboard",
        quantity: 2,
        price: 3000,
        status: "Pending"
    },
    {
        customer: "Sara",
        product: "Laptop",
        quantity: 1,
        price: 50000,
        status: "Delivered"
    },
    {
        customer: "Ahmed",
        product: "Mouse",
        quantity: 2,
        price: 1500,
        status: "Delivered"
    }
];



// 1.
function calculateOrderTotal(order) {
    return order.quantity * order.price;
}



// 2.
function findCustomerSpending(customerName) {
    let total = 0;

    for (let i = 0; i < orders.length; i++) {
        if (orders[i].customer === customerName) {
            total = total + calculateOrderTotal(orders[i]);
        }
    }

    return total;
}



// 3.
function filterOrders(status) {
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].status === status) {
            console.log(orders[i]);
        }
    }
}



// 4.
function findBestSellingProduct() {
    let productSales = {};

    for (let i = 0; i < orders.length; i++) {
        let product = orders[i].product;
        let quantity = orders[i].quantity;

        if (productSales[product] === undefined) {
            productSales[product] = quantity;
        } else {
            productSales[product] = productSales[product] + quantity;
        }
    }

    let bestProduct = "";
    let highestQuantity = 0;

    for (let product in productSales) {
        if (productSales[product] > highestQuantity) {
            highestQuantity = productSales[product];
            bestProduct = product;
        }
    }

    return bestProduct;
}



// 5.
function applyDiscount(order) {
    let total = calculateOrderTotal(order);
    let discount = 0;

    if (total > 10000) {
        discount = total * 0.10;
    }

    return total - discount;
}



// 6.
function findHighestOrder() {
    let highestAmount = 0;
    let customerName = "";

    for (let i = 0; i < orders.length; i++) {
        let finalAmount = applyDiscount(orders[i]);

        if (finalAmount > highestAmount) {
            highestAmount = finalAmount;
            customerName = orders[i].customer;
        }
    }

    return customerName;
}



// 7.
function displaySummary() {
    for (let i = 0; i < orders.length; i++) {
        let originalTotal = calculateOrderTotal(orders[i]);
        let finalAmount = applyDiscount(orders[i]);
        let discount = originalTotal - finalAmount;

        console.log("Customer: " + orders[i].customer);
        console.log("Product: " + orders[i].product);
        console.log("Original Total: Rs. " + originalTotal);
        console.log("Discount: Rs. " + discount);
        console.log("Final Amount: Rs. " + finalAmount);
        console.log("-------------------------");
    }
}



console.log("Order Total:");
console.log(calculateOrderTotal(orders[0]));

console.log("Ali's Total Spending:");
console.log(findCustomerSpending("Ali"));

console.log("Delivered Orders:");
filterOrders("Delivered");

console.log("Best-Selling Product:");
console.log(findBestSellingProduct());

console.log("Final Amount of First Order:");
console.log(applyDiscount(orders[0]));

console.log("Customer with Highest Order:");
console.log(findHighestOrder());

console.log("Order Summary:");
displaySummary();