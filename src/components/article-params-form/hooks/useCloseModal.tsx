import { useEffect } from 'react';

type TUseCloseModal = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export function useCloseModal({ isOpen, onClose, rootRef }: TUseCloseModal) {
	useEffect(() => {
		if (!isOpen) return;

		function handleClickOutside(event: MouseEvent) {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node && // проверяем, что это DOM-элемент
				rootRef.current &&
				!rootRef.current.contains(target); // проверяем, что кликнули на элемент не внутри нашего блока
			if (isOutsideClick) {
				onClose();
			}
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		//  удаляем обработчики
		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};

		// следим за isOpen
	}, [isOpen, onClose, rootRef]);
}
