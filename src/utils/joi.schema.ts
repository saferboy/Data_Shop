import Joi from 'joi';

export class AuthSchemas {
    static register = Joi.object({
        name: Joi.string().min(1).required(),
        surname: Joi.string().min(1).required(),
        phone: Joi.string().min(1).max(40).required(),
        email: Joi.string().email().min(1).max(40).required(),
        address: Joi.string().min(1).required(),
        password: Joi.string().min(1).required()
    });

    static verify = Joi.object({
        code: Joi.string().min(1).required(),
        verificationId: Joi.string().min(0),
    });

    static login = Joi.object({
        email: Joi.string().email().min(1).required(),
        password: Joi.string().min(1).required(),
    });

    static resend = Joi.object({
        email: Joi.string().email().min(1).required(),
    });
}

export class ManageUser {
    static finduser = Joi.object({
        id: Joi.number().min(1).required()
    })

    static updatUser = Joi.object({
        id: Joi.number().min(1),
        name: Joi.string().min(1).required(),
        surname: Joi.string().min(1).required(),
        phone: Joi.string().min(1).required(),
        email: Joi.string().email().min(1).required(),
        address: Joi.string().min(1).required(),
        password: Joi.string().min(1).required()
    })

    static changeRole = Joi.object({
        role: Joi.string().min(1).required()
    })

    static deleteUser = Joi.object({
        id: Joi.number().min(1).required()
    })    
}