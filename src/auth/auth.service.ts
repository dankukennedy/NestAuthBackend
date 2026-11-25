import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto.js';
import { User } from './schemas/user.schema.js';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto } from './dto/login.dto.js';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schema.js';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class AuthService {

    constructor (
        @InjectModel(User.name) private readonly UserModel: Model<User>,
        @InjectModel(RefreshToken.name) private readonly RefreshTokenModel: Model<RefreshToken>,
        private readonly jwtService: JwtService,
    ) { }

    async signup(signupDto: SignupDto) {
        const { email, password, name } = signupDto;
        //TODO: Check if user exists
        const emailInUse = await this.UserModel.findOne({ email });
        if (emailInUse) {
            throw new ConflictException('Email already in use');
        }
        //TODO: Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.UserModel.create({
            name,
            email,
            password: hashedPassword
        });
        //TODO: Return success message
        if (!newUser) {
            throw new ConflictException('User could not be created');
        }

        return { message: 'User created successfully' };

    }

    async login(credentials: LoginDto) {
        const { email, password } = credentials;
        //TODO: Check if user exists
        const user = await this.UserModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        //TODO: Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        //TODO: Generate JWT token
  
         const tokens = await this.generateUserTokens(user._id.toString());
        return{
            ...tokens,
            userId: user._id,
        }
    }

    async refreshTokens(refreshToken: string) {
        const token = await this.RefreshTokenModel.findOne({
            token: refreshToken,
            expiryDate: { $gte: new Date() },
        })
        if (!token) {
            throw new UnauthorizedException("Refresh Token is Invalid")
        }
        return this.generateUserTokens(token.userId)
    }


    async generateUserTokens(userId:any) {
        const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
        const refreshToken = uuidv4();

        await this.storeRefreshToken(refreshToken, userId)
        return {
            accessToken,
            refreshToken
        }
    }

    async storeRefreshToken(token: string, userId: string ) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 3);

        await this.RefreshTokenModel.updateOne({ userId }, {$set: {expiryDate, token }},{
            upsert: true
        })
    }


}
