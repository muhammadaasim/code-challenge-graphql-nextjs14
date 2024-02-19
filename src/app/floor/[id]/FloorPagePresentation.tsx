import React, { useEffect } from 'react';
import Image from 'next/image';
import { useMutation } from '@apollo/client';
import { UPDATE_MACHINE_MUTATION } from '@/gql/mutations/machineMutation';
import { Machine } from '@/app/api/types';
import MachineCard from '@/components/MachineCard';
import useDebouncedUpdate from '@/hooks/useDebounce';
import { IMachine } from '@/interfaces/Machine';

interface Floor {
  machines: Omit<Machine, '_id' | 'floors'> &
    {
      id: string;
    }[];
  image: string;
}

interface Props {
  data: { floor: Floor };
}

const FloorPagePresentation: React.FC<Props> = ({ data }) => {
  const [updateMachinePosition] = useMutation(UPDATE_MACHINE_MUTATION);

  const debouncedUpdateMachinePosition = useDebouncedUpdate(
    async (variables) => {
      await updateMachinePosition(variables);
    },
    200
  );

  const handleDrag = ({
    id: machineId,
    x,
    y,
  }: {
    id: string;
    x: number;
    y: number;
  }): void => {
    debouncedUpdateMachinePosition({
      variables: {
        id: machineId,
        input: {
          x,
          y,
        },
      },
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMachineId =
        data?.floor?.machines[
          Math.floor(Math.random() * data?.floor?.machines.length)
        ]?.id;

      if (randomMachineId) {
        const randomState =
          Math.random() < 0.33
            ? 'green'
            : Math.random() < 0.66
              ? 'yellow'
              : 'red';

        try {
          updateMachinePosition({
            variables: {
              id: randomMachineId,
              input: {
                state: randomState,
              },
            },
          });
        } catch (err) {
          console.error(err);
        }
      }
    },  5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [data?.floor?.machines, updateMachinePosition]);

  return (
    <>
      <Image
        className='h-auto w-[70%] select-none'
        src={data?.floor?.image}
        alt='Floor'
        width={1300}
        height={500}
      />
      <div>
        {data?.floor?.machines.map((machine: IMachine) => (
          <MachineCard
            key={machine.id}
            machine={machine}
            handleDrag={handleDrag}
          />
        ))}
      </div>
    </>
  );
};

export default FloorPagePresentation;
