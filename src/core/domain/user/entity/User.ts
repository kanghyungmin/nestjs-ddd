import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateUserEntityPayload } from '@core/domain/user/entity/type/CreateUserEntityPayload';
import { EditUserEntityPayload } from '@core/domain/user/entity/type/EditUserEntityPayload';
import { Entity } from "@core/common/entity/Entity";
import { Nullable } from "@core/common/type/CommonType";
import { compare, genSalt, hash } from 'bcryptjs';
import { v4 } from 'uuid';
import { UserRole } from '@core/common/enum/UserEnums';

export class User extends Entity<string> {

    @IsOptional()
    @IsString()
    private firstName : string;

    @IsOptional()
    @IsString()
    private socialID : string;

    @IsOptional()
    @IsString()
    private lastName : string;

    @IsOptional()
    @IsEmail()
    private readonly email : string;

    @IsOptional()
    @IsString()
    private password : string;

    @IsOptional()
    @IsDate()
    private readonly createdAt : Date;

    @IsOptional()
    @IsEnum(UserRole)
    private readonly role: UserRole

    @IsOptional()
    @IsDate()
    private updatedAt: Nullable<Date>

    @IsOptional()
    @IsDate()
    private removedAt: Nullable<Date>

    constructor(payload: CreateUserEntityPayload) {
        super();

        this.socialID = payload.socialID || null;
        this.firstName = payload.firstName || null;
        this.lastName = payload.lastName || null;
        this.email = payload.email || null;
        this.role = payload.role || null;
        this.password = payload.password || null;

        this.id = payload.id || v4();
        this.createdAt = payload.createdAt || new Date();
        this.updatedAt = payload.updatedAt || null;
        this.removedAt = payload.removedAt || null; 
    }

    public getFirstName() : string {
        return this.firstName;
    }
    public getRole() : UserRole {
        return this.role;
    }

    public getLastName() : string {
        return this.lastName;
    }

    public getName() : string {
        return `${this.firstName} ${this.lastName}`;
    }

    public getEmail() : string {
        return this.email
    }
    public getPassword() : string {
        return this.password;
    }
    public getCreatedAt() : Date {
        return this.createdAt;
    }   
    public getUpdatedAt() : Nullable<Date> {
        return this.updatedAt;
    }
    public getRemovedAt() : Nullable<Date> {
        return this.removedAt;
    }
    
    public async hashPassword() : Promise<void> {
        const salt : string = await genSalt();
        this.password = await hash(this.password, salt);
        
        await this.validate();
    }

    public async comparePassword(password : string) : Promise<boolean> {
        return await compare(password, this.password);
    }

    public async edit(payload : EditUserEntityPayload) : Promise<void> {
        const currentDate : Date = new Date();

        if(payload.firstName) {
            this.firstName = payload.firstName;
            this.updatedAt = currentDate;
        }
        if(payload.lastName) {
            this.lastName = payload.lastName;
            this.updatedAt = currentDate;
        }

        await this.validate()
    }
    public static async new(payload : CreateUserEntityPayload) : Promise<User> {
        const user : User = new User(payload);
        
        if(payload.password) {
            await user.hashPassword();
        }
        
        await user.validate();
        return user;
    }
}