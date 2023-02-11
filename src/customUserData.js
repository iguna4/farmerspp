import { BSON } from "realm"

// secrets
const secrets = {
    serviceName: 'mongodb-atlas',
    databaseName: 'connectcaju',
    userCollectionName: 'User',
    appID: 'connectcaju-app-iyoae',
}

// User Schema
const User = {
    name: 'User',
    primaryKey: '_id',
    properties: {
        _id: { type: 'objectId', default: ()=> new BSON.ObjectId()  },
        userId: 'string?',
        name: 'string',
        email: 'string',
        password: 'string',
        phone: 'int?',
        userProvince: 'string?',
        userDistrict: 'string?',
        lastLoginAt: {type: 'date', default: Date() },
        createdAt: { type: 'date', default: Date() },
    }
} 


// In my LoginComponent


    // This function is called when the user wants
    // to register and automatically signs in.
    // on user registration
    const onSignUp = useCallback(
        async (
            name, email, password, 
            phone, userDistrict, userProvince
        ) => {
        
        // try to register new user
        try {
            await app.emailPasswordAuth.registerUser({ email, password });

            const creds = Realm.Credentials.emailPassword(email, password);
            const user = await app.logIn(creds);
            const mongo = user.mongoClient(secrets.serviceName);
            const collection = mongo.db(secrets.databaseName).collection(secrets.userCollectionName);
            

            // pack the validated user data and save it into the database
            const userData = {
                _id: new BSON.ObjectID(),
                userId: user.id,
                name,
                email,
                password,
                phone,
                userDistrict,
                userProvince,
                lastLoginAt: new Date(),
                createdAt: new Date(),
            }

            // save custom user data 
            const result = await collection.insertOne(userData);
            const customUserData = await newUser.refreshCustomData();

        } catch (error) {
            setErrorAlert(true)
            console.log('Failed to sign up the user', { cause: error });
        }
    }, [signIn, app, email, password]);


    // After user has signed up or signed in, 
    // I would like to access his custom data
     const user = useUser();
     const userData = user.customData; // this is returning undefined
     
