import { MouseEvent, useCallback, useMemo, useState } from 'react';

const useDisclosure = () => {
  const [anchor, setAnchor] = useState<Element | null>(null);

  const onOpen = useCallback((e: MouseEvent) => {
    setAnchor(e.currentTarget);
  }, []);

  const onClose = useCallback(() => {
    setAnchor(null);
  }, []);

  const isOpen = useMemo(() => {
    return !!anchor;
  }, [anchor]);

  return { isOpen, onOpen, onClose, anchor };
};

export default useDisclosure;
