import { ValidationError } from "@nestjs/common";

export function stringified(errors: ValidationError[]): string {
    return JSON.stringify(errors)
}