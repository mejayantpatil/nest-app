import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    Res,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { backupPath } from 'src/main';
import * as fs from 'fs';

@Controller('vehicles')
export class VehicleController {
    constructor(private vehicleService: VehicleService) { }

    @Get()
    async getVehicles() {
        return this.vehicleService
            .findAll()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log(err);
                return { message: 'No Vehicles available.' };
            });
    }

    @Post()
    async createVehicle(@Body() vehicleDTO: any) {
        return this.vehicleService
            .create(vehicleDTO)
            .then((res) => {
                return { mesage: 'Done' };
            })
            .catch((err) => {
                console.log(err);
                return {
                    mesage: 'Cant create vehicle.',
                };
            });
    }

    @Put(':id')
    async updateVehicle(@Param('id') id: string, @Body() vehicleDTO: any) {
        return await this.vehicleService
            .update(id, vehicleDTO)
            .then((res) => {
                return {
                    mesage: 'Updated',
                };
            })
            .catch((err) => {
                console.log(err);
                return {
                    mesage: 'Cant update vehicle.',
                };
            });
    }

    @Delete(':id')
    async deleteVehicle(@Param('id') id: string) {
        return await this.vehicleService
            .delete(id)
            .then((res) => {
                return {
                    mesage: 'Deleted',
                };
            })
            .catch((err) => {
                console.log(err);
                return {
                    mesage: 'Cant Delete vehicle.',
                };
            });
    }

    @Get(':id')
    async getVehicle(@Param('id') id: string) {
        return this.vehicleService.findOne(id);
    }

    @Post('backup')
    async getBackup(@Res() response) {
        return this.vehicleService.findAll().then(async (res) => {
            let result = '';
            if (!fs.existsSync(backupPath)) {
                fs.mkdirSync(backupPath, { recursive: true });
            }
            await fs.writeFile(
                backupPath +
                '/vehicle-backup-' +
                new Date().toISOString().substring(0, 10) +
                '.json',
                JSON.stringify(res),
                (err) => {
                    if (err) {
                        console.log('Error writing file', err);
                        result = 'error while backup.';
                        response.json({ message: result });
                    } else {
                        console.log('Successfully wrote file');
                        result = 'backuped successfully.';
                        response.json({ message: result });
                    }
                },
            );
            return result;
        });
    }
}
