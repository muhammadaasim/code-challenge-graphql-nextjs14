import { Floor, FloorDocument } from '@/app/api/types';
import { floorModel } from '../models';
import { MongoDataSource } from 'apollo-datasource-mongodb';



export default class floorsDataSource extends MongoDataSource<FloorDocument> {
  async getAllFloors(): Promise<FloorDocument[]> {
    try {
      return await floorModel.find().exec();
    } catch (error) {
      throw new Error('Failed to fetch floors');
    }
  }

  async getFloorById(id: string): Promise<Floor | null> {
    try {
      return await floorModel.findById(id).exec();
    } catch (error) {
      throw new Error('Failed to fetch floor');
    }
  }

  async createFloor(input: FloorDocument): Promise<FloorDocument> {
    try {
      return await floorModel.create(input);
    } catch (error) {
      throw new Error('Failed to create floor');
    }
  }
}
