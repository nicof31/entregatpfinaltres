import { appConfig } from "../config/config.js"

const {PERSISTENCE} = appConfig

let PRODUCT_DAO;
let USER_DAO;
let CART_DAO;
let TICKET_DAO;
let MESSAGE_DAO;

switch (PERSISTENCE) {
    case 'MONGO':
        console.log(`Configuración seteada para trabajar con ${PERSISTENCE}`);    
        const { default: MongoDbConnection } = await import ('../config/MongoDbConnection.js')
        MongoDbConnection.getConnection();

        const { default: ProductManagerMongo} = await import ("./managers/mongodb/productManager.mongodb.js");
        const { default: CartsManagerMongo } = await import ("./managers/mongodb/cartsManager.mongodb.js");
        const { default: UserManagerMongo } = await import ("./managers/mongodb/UserManager.mongodb.js");
        const { default: TicketManagerDB } = await import ("./managers/mongodb/ticketManager.mongodb.js");
        const { default: MessageManagerMongo  } = await import ("./managers/mongodb/messagesManager.mongodb.js");
        
        PRODUCT_DAO = new ProductManagerMongo();
        CART_DAO = new CartsManagerMongo();
        USER_DAO = new UserManagerMongo();
        TICKET_DAO = new TicketManagerDB();
        MESSAGE_DAO = new MessageManagerMongo();

    break
    case 'FILESYSTEM':
        console.log(`Configuración seteada para trabajar con ${PERSISTENCE}`);  
        const { default: ProductManagerFs } = await import ("./managers/fileSystem/productManager.fs.js");
        const { default: CartManagerFs} = await import ("./managers/fileSystem/cartsManager.fs.js");
        const { default: UserManagerFS} = await import ("./managers/fileSystem/userManager.fs.js");
        const { default: TicketManagerFs } = await import ("./managers/fileSystem/ticketManager.fs.js");
        const { default: MessagesManagerFs } = await import ("./managers/fileSystem/messageManager.fs.js");

        PRODUCT_DAO = new ProductManagerFs();
        CART_DAO = new CartManagerFs();
        USER_DAO = new UserManagerFS();
        TICKET_DAO = new TicketManagerFs();
        MESSAGE_DAO = new MessagesManagerFs();
    break
    default:
        console.log(`Debe configurar modelo del PERSISTENCE .env`);
    }





  export { PRODUCT_DAO, USER_DAO, CART_DAO, TICKET_DAO, MESSAGE_DAO };