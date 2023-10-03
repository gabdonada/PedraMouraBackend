import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsString, Matches, Min } from "class-validator";

export class CreateVehicleDto {
    
    @IsNotEmpty()
    model: string;
    
    vehType: string;
    
    space: string;
    
    @Min(0, {message: 'KM inválida'})
    currentKM: number;
    
    year: number;
    
    isArchived: boolean;
    
    @Matches(/[A-Z]{3}[0-9][0-9A-Z][0-9]{2}/, {message: "Placa inválida"})
    plate: string;
}