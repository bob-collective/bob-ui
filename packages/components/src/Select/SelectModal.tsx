import { useId } from '@react-aria/utils';
import { SelectState } from '@react-stately/select';
import { forwardRef, ReactNode } from 'react';

import { Modal, ModalBody, ModalHeader, ModalProps, P } from '..';
import { ListItem, ListProps } from '../List';

import { StyledList } from './Select.style';
import { SelectModalContext } from './SelectModalContext';

type Props = {
  state: SelectState<unknown>;
  title?: ReactNode;
  listProps?: Omit<ListProps, 'children'>;
};

type InheritAttrs = Omit<ModalProps, keyof Props | 'children'>;

type SelectModalProps = Props & InheritAttrs;

const SelectModal = forwardRef<HTMLDivElement, SelectModalProps>(
  ({ state, title, onClose, listProps, ...props }, ref): JSX.Element => {
    const headerId = useId();

    const handleSelectionChange: ListProps['onSelectionChange'] = (key) => {
      const [selectedKey] = [...key];

      if (!selectedKey) {
        return onClose();
      }

      state.selectionManager.setSelectedKeys(key);
      onClose();
    };

    const items = [...state.collection];
    const hasItems = !!items.length;

    return (
      <SelectModalContext.Provider value={{ selectedItem: state.selectedItem }}>
        <Modal ref={ref} hasMaxHeight onClose={onClose} {...props}>
          <ModalHeader color='secondary' id={headerId} size='lg' weight='medium'>
            {title}
          </ModalHeader>
          <ModalBody noPadding={hasItems} overflow='hidden'>
            {hasItems ? (
              <StyledList
                {...listProps}
                aria-labelledby={headerId}
                selectionMode='single'
                variant='secondary'
                onSelectionChange={handleSelectionChange}
              >
                {[...state.collection].map((item) => (
                  <ListItem
                    key={item.key}
                    alignItems='center'
                    gap='spacing2'
                    justifyContent='space-between'
                    textValue={item.textValue}
                  >
                    {item.rendered}
                  </ListItem>
                ))}
              </StyledList>
            ) : (
              <P align='center' color='tertiary'>
                No options
              </P>
            )}
          </ModalBody>
        </Modal>
      </SelectModalContext.Provider>
    );
  }
);

SelectModal.displayName = 'SelectModal';

export { SelectModal };
export type { SelectModalProps };
