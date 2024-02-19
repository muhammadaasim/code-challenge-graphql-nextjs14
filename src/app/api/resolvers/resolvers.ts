import { floorModel, machineModel } from '../models';
import { Types } from 'mongoose';
import {
  Floor,
  FloorInput,
  Machine,
  MachineDocument,
  MachineInput,
} from '@/app/api/types';

const resolvers = {
  Query: {
    machines: async (): Promise<MachineDocument[]> => {
      try {
        const machines = await machineModel.find({});
        return machines;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch machines');
      }
    },
    floors: async (): Promise<Floor[]> => {
      try {
        const floors = await floorModel.find({});
        return floors;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch floors');
      }
    },
    floor: async (_: unknown, { id }: { id: string }): Promise<Floor> => {
      try {
        const floor = await floorModel.findById(id);
        return floor;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch floor');
      }
    },
  },
  Mutation: {
    createMachine: async (
      _: unknown,
      { input }: { input: MachineInput }
    ): Promise<MachineDocument> => {
      try {
        const machine = new machineModel(input);
        await machine.save();
        return machine;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create machine');
      }
    },
    createFloor: async (
      _: unknown,
      { input }: { input: FloorInput }
    ): Promise<Floor> => {
      const { name, image, machineIds } = input;
      const floor = new floorModel({
        name,
        image,
        machines: machineIds || [],
      });
      await floor.save();

      await machineModel.updateMany(
        { _id: { $in: machineIds || [] } },
        { $push: { floors: floor._id } }
      );

      return floor;
    },
    updateMachine: async (
      _: unknown,
      { id, input }: { id: string; input: MachineInput }
    ): Promise<MachineDocument> => {
      try {
        const machine = await machineModel.findByIdAndUpdate(id, input, {
          new: true,
        });
        return machine;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update machine');
      }
    },
    updateFloor: async (
      _: unknown,
      { id, input }: { id: string; input: FloorInput }
    ): Promise<Floor> => {
      try {
        const { name, image, machineIds } = input;
        const updatedFloor = await floorModel.findByIdAndUpdate(
          id,
          {
            name,
            image,
            machines: machineIds,
          },
          { new: true }
        );

        await machineModel.updateMany(
          { _id: { $in: machineIds } },
          { $addToSet: { floors: updatedFloor._id } }
        );

        return updatedFloor;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update floor');
      }
    },
  },
  Floor: {
    machines: async (floor: {
      machines: Types.ObjectId[];
    }): Promise<Machine[]> => {
      return machineModel.find({ _id: { $in: floor.machines } });
    },
  },
};

export default resolvers;
