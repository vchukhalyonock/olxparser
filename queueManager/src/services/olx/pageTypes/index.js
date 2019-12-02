import PageTypeSimpleCustomer from "./PageTypeSimpleCustomer";
import PageTypeShop from "./PageTypeShop";

export default selenium => [
    new PageTypeSimpleCustomer(selenium),
    new PageTypeShop(selenium)
];

