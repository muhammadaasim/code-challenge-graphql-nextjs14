import { IMachine } from '@/interfaces/Machine';
import React, { useRef } from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';

interface MachineCardProps {
  machine: IMachine;
  handleDrag: (params: { id: string; x: number; y: number }) => void;
}

const MachineCard: React.FC<MachineCardProps> = ({ machine, handleDrag }) => {
  const defaultPosition = {
    x: machine.x ?? 0,
    y: machine.y ?? 0,
  };

  const draggableRef = useRef(null);

  const onStop = (e: DraggableEvent, data: DraggableData) => {
    const { x, y } = data;
    handleDrag({ id: machine.id, x, y });
  };

  return (
    <Draggable
      nodeRef={draggableRef}
      defaultPosition={defaultPosition}
      onStop={onStop}
    >
      <div
        ref={draggableRef}
        className='flex h-[130px] w-[130px] items-center justify-center border-2'
        style={{
          backgroundColor: machine.state ?? 'green',
        }}
      >
        <p className='select-none text-black'>{machine.name}</p>
      </div>
    </Draggable>
  );
};

export default MachineCard;
