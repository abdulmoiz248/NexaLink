import {IsString,IsNotEmpty} from 'class-validator';
export class signupDto{

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}