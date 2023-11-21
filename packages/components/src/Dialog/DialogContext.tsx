import { DOMAttributes } from '@react-types/shared';
import React from 'react';

import { Sizes } from '../../../core/theme/src';

interface DialogConfig {
  titleProps?: DOMAttributes;
  size: Sizes;
}

const defaultContext: DialogConfig = { size: 'medium' };

const DialogContext = React.createContext<DialogConfig>(defaultContext);

const useDialogContext = (): DialogConfig => React.useContext<DialogConfig>(DialogContext);

export { DialogContext, useDialogContext };
export type { DialogConfig };
