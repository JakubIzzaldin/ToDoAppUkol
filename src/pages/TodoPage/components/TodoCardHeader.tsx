import {Box, HStack, Icon, IconButton, Spacer} from '@chakra-ui/react';
import {AppText} from '../../../components/AppText/AppText';
import {useGetTodoPopoverList} from '../hooks/useGetTodoPopoverList';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {AppPopover} from '../../../components/AppPopover/AppPopover';
import React, {useState} from 'react';

import {TodoOptionsButton} from './TodoOptionsButton';
import {CardEditTodoModal} from './CardEditModal';

type CardTodoHeaderProps = {
  text: string;
  cardId: string;
};
export const TodoCardHeader = ({text, cardId}: CardTodoHeaderProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const popoversButtonsParamList = useGetTodoPopoverList('cardHeader', () => {
    setIsModalOpen(true);
  });
  return (
    <HStack>
      <AppText variant={'heading4'} fontWeight={'medium'}>
        {text}
      </AppText>
      <Spacer />
      <AppPopover
        onClose={() => {
          setIsPopoverOpen(false);
        }}
        isOpen={isPopoverOpen}
        anchor={
          <Box>
            <IconButton
              aria-label={'button'}
              backgroundColor={'inherit'}
              color={'black'}
              key={'TodoPopover'}
              onClick={() => {
                setIsPopoverOpen(true);
              }}
            >
              <Icon as={BsThreeDotsVertical} />
            </IconButton>
          </Box>
        }
        placement={'bottom-end'}
      >
        {popoversButtonsParamList.map((item) => (
          <TodoOptionsButton
            {...item}
            key={item.text}
            onClick={() => {
              item.onAction(cardId, '');
              setIsPopoverOpen(false);
            }}
          />
        ))}
        <CardEditTodoModal
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          cardId={cardId}
          text={text}
        />
      </AppPopover>
    </HStack>
  );
};
