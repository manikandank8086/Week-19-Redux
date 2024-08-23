import jwt from 'jsonwebtoken';

export const createAccessToken = (username, email, Id) => {
    console.log('working accesstoken');
    const secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET || 'ejiofheoihfoiehofheiofhejrhfoh';
  
    const token = jwt.sign(
        {
            username: username,
            email: email,
            id: Id
        },
        secretOrPrivateKey,
        { expiresIn: '5d' }
    );
  
    console.log('creating access token');
    console.log(token);
    return token;
};

export const verifyAccessToken = (req,res,next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader; 
        console.log("ooooooooooooooooooooooooooooooo")
        console.log(token)
        const secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET || 'ejiofheoihfoiehofheiofhejrhfoh';
        const decoded = jwt.verify(token, secretOrPrivateKey);
        console.log('Token verified:', decoded);
        next()


    
       
    } catch (error) {
        console.log('Invalid token:', error);
        return null;
    }
};



// 

export const AdmincreateAccessToken = (username, email, Id) => {
    console.log('working accesstoken');
    const secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET || 'ejiofheoihfoiehofheiofhejrhfoh';
  
    const token = jwt.sign(
        {
            username: username,
            email: email,
            id: Id
        },
        secretOrPrivateKey,
        { expiresIn: '5d' }
    );
  
    console.log('creating access token');
    console.log(token);
    return token;
};



export const AdminverifyAccessToken = (req,res,next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader; 
        console.log("ooooooooooooooooooooooooooooooo")
        console.log(token)
        const secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET || 'ejiofheoihfoiehofheiofhejrhfoh';
        const decoded = jwt.verify(token, secretOrPrivateKey);
        console.log('Token verified:', decoded);
        next()


    
       
    } catch (error) {
        console.log('Invalid token:', error);
        return null;
    }
};
