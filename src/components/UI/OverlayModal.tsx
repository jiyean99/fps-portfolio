import { useOverlayStore } from '../../stores/useOverlayStore';
import './OverlayModal.scss';

export function OverlayModal() {
    const { overlay, clearOverlay } = useOverlayStore();

    if (!overlay) return null;

    return (
        <div className="overlay">
            <div className="modal">
                <h2>{overlay.title}</h2>
                <p>{overlay.description}</p>
                <button onClick={clearOverlay}>닫기</button>
            </div>
        </div>
    );
}
