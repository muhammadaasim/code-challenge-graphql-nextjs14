import { machineModel } from '../models';
import { MongoDataSource } from 'apollo-datasource-mongodb';
import { MachineDocument, MachineInput } from '@/app/api/types';

export default class machineDataSource extends MongoDataSource<MachineDocument> {
  async getAllMachines(): Promise<MachineDocument[]> {
    try {
      return await machineModel.find().exec();
    } catch (error) {
      throw new Error('Failed to fetch machines');
    }
  }

  async createMachine(input: MachineInput): Promise<MachineDocument> {
    try {
      return await machineModel.create(input);
    } catch (error) {
      throw new Error('Failed to create machine');
    }
  }
}
