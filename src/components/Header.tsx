import React, { useState, ChangeEvent } from 'react';
import { FiSettings } from 'react-icons/fi';
import * as XLSX from 'xlsx';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { convertToBase64 } from '@/utilities';
import { CREATE_MACHINE_MUTATION } from '@/gql/mutations/machineMutation';
import { CREATE_FLOOR_MUTATION } from '@/gql/mutations/floorMutations';
import { MachineInput } from '@/app/api/types';
import { IMachine, IMachineInput } from '@/interfaces/Machine';
import { IFloorInput } from '@/interfaces/Floor';

const Header: React.FC = () => {
  const router = useRouter();

  const [machines, setMachines] = useState<string[]>([]);
  const [createMachine] = useMutation<
    {
      createMachine: IMachine;
    },
    { input: IMachineInput }
  >(CREATE_MACHINE_MUTATION);
  const [createFloor] = useMutation<
    { createFloor: { id: number; image: string } },
    { input: IFloorInput }
  >(CREATE_FLOOR_MUTATION);

  const addMachine = async (machine: MachineInput) => {
    const { name, state, x = 0, y = 0 } = machine;
    try {
      const { data } = await createMachine({
        variables: { input: { name, state, x, y } },
      });
      setMachines((prev: string[]) => [...prev, data.createMachine?.id || '']);
    } catch (error) {
      console.error(`Error creating machine: ${error.message}`);
    }
  };

  const handleClick = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();

      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const headers = jsonData[0];
        const machinesData = jsonData.slice(1).map((row) => {
          return headers.reduce((obj, header, index) => {
            obj[header] = row[index];
            return obj;
          }, {} as IMachineInput);
        });
        machinesData.forEach(addMachine);
        alert('Machines are successfully added. Please choose a floor image.');
      };

      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imgbase64: string = (await convertToBase64(file)) as string;

    try {
      const { data } = await createFloor({
        variables: { input: { image: imgbase64, machineIds: machines } },
      });
      router.push(`/floor/${data?.createFloor?.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {machines.length > 0 ? (
        <div className='flex w-full justify-end p-10'>
          <input
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            id='imgInput'
            onChange={handleImageUpload}
          />
          <label
            className='btn btn-primary rounded-2xl bg-blue-400 p-2 px-3'
            htmlFor='imgInput'
            title='Upload Floor Image'
          >
            Please Choose Floor Image
          </label>
        </div>
      ) : (
        <div className='flex w-full justify-end p-10'>
          <input
            type='file'
            accept='.xlsx,.xls'
            style={{ display: 'none' }}
            id='fileInput'
            onChange={handleClick}
          />
          <label
            htmlFor='fileInput'
            title="Please upload Machine's Spreadsheet"
          >
            <FiSettings style={{ fontSize: '50px', cursor: 'pointer' }} />
          </label>
        </div>
      )}
    </>
  );
};

export default Header;
