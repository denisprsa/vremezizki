import React, { FunctionComponent, useRef, useState, useCallback, useLayoutEffect, ReactNode } from 'react';
import Box from '@material-ui/core/Box';

import './desktop.scss';

type Props = {
    positionCenter?: boolean;
    children?: ReactNode;
};

const DesktopCarousel: FunctionComponent<Props> = (props: Props) => {
    const startDraggingPosition = useRef(0);
    const isDragging = useRef(false);
    
    const [originalX, setOriginalX] = useState(10);
    const [deltaX, setDeltaX] = useState(0);

    const positionX = originalX + deltaX;
    const transform = `translate3d(${positionX}px, 0, 0)`;

    const [ parentSliderRef, sliderRef ] = useInitialSliderPosition(setOriginalX, positionX, isDragging, props);

    const handleMouseMove = useHandleMouseMove(setDeltaX, startDraggingPosition);
    const handleMouseDown = useHandleMouseDown(handleMouseMove, sliderRef, startDraggingPosition, isDragging);
    const handleMouseUp = useHandleMouseUp(handleMouseMove, sliderRef, parentSliderRef, startDraggingPosition, setOriginalX, setDeltaX, positionX, isDragging);
    const handleMouseLeave = useHandleMouseUp(handleMouseMove, sliderRef, parentSliderRef, startDraggingPosition, setOriginalX, setDeltaX, positionX, isDragging);
    const handleTouchDown = useHandleTouchDown(startDraggingPosition);
    const handleTouchUp = useHandleTouchUp(startDraggingPosition);

    const children = React.Children.map(props.children, child => {
        return (<li className="carousel-desktop-item"> {child} </li>);
    });

    return (
        <Box>
            <div className="carousel-desktop-wrapper"
                ref={parentSliderRef}>
                <ul className={'carousel-desktop'}
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchDown}
                    onTouchEnd={handleTouchUp}
                    style={{transform: transform}}>
                    {children}
                </ul>
            </div>
        </Box>
    );
};

export default DesktopCarousel;

function useInitialSliderPosition(
    setOriginalX: React.Dispatch<React.SetStateAction<number>>,
    positionX: number,
    isDragging: React.MutableRefObject<boolean>,
    props: Props
): [React.RefObject<HTMLDivElement>, React.RefObject<HTMLUListElement>] {
    const parentSliderRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLUListElement>(null);

    useLayoutEffect(() => {
        setSliderPosition(setOriginalX, parentSliderRef, sliderRef, positionX, isDragging);
    }, [isDragging, positionX, props.positionCenter, setOriginalX]);

    return [
        parentSliderRef,
        sliderRef
    ];
}

function setSliderPosition(
    setOriginalX: React.Dispatch<React.SetStateAction<number>>,
    parentSliderRef: React.RefObject<HTMLDivElement>,
    sliderRef: React.RefObject<HTMLUListElement>, 
    positionX: number,
    isDragging: React.MutableRefObject<boolean>
) {

    if (sliderRef.current && parentSliderRef.current) {
        const sliderViewWidth = parentSliderRef.current.clientWidth;
        const itemsWidth = sliderRef.current.clientWidth;
        const areChildrenWiderThanScreen = sliderViewWidth > itemsWidth;

        if (areChildrenWiderThanScreen) {
            const overView = sliderViewWidth - itemsWidth;
            setOriginalX(overView / 2);
        } else if (isDragging.current === false)  {
            if (positionX > 0) {
                setOriginalX(10);
            } else {
                const endWidth = itemsWidth - sliderViewWidth;
                if (Math.abs(positionX) > endWidth) {
                    setOriginalX((endWidth + 10) * -1);
                }
            }
        }
    }
}

// Handle mouse move
function useHandleMouseMove(
    setDeltaX: React.Dispatch<React.SetStateAction<number>>,
    startDraggingPosition: React.MutableRefObject<number>
) {
    return useCallback((e: MouseEvent) => {
        setDeltaX(e.clientX - startDraggingPosition.current);
    }, [setDeltaX, startDraggingPosition]);
}

// Handles mouse click which means user will start dragging slider
function useHandleMouseDown(
    handleMouseMove: (e: MouseEvent) => void,
    sliderRef: React.RefObject<HTMLUListElement>,
    startDraggingPosition: React.MutableRefObject<number>,
    isDragging: React.MutableRefObject<boolean>
) {
    return (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        if (!sliderRef.current) {
            return;
        }

        isDragging.current = true;
        startDraggingPosition.current = e.clientX;
        sliderRef.current.addEventListener('mousemove', handleMouseMove);
    };
}

// Handles when user stops dragging slider
function useHandleMouseUp(
    handleMouseMove: (e: MouseEvent) => void,
    sliderRef: React.RefObject<HTMLUListElement>,
    parentSliderRef: React.RefObject<HTMLDivElement>,
    startDraggingPosition: React.MutableRefObject<number>,
    setOriginalX: React.Dispatch<React.SetStateAction<number>>,
    setDeltaX: React.Dispatch<React.SetStateAction<number>>,
    positionX: number,
    isDragging: React.MutableRefObject<boolean>
) {
    return () => {
        if (!sliderRef.current) {
            return;
        }

        isDragging.current = false;
        setOriginalX(positionX);
        setDeltaX(0);
        startDraggingPosition.current = 0;
        sliderRef.current.removeEventListener('mousemove', handleMouseMove);
        setSliderPosition(setOriginalX, parentSliderRef, sliderRef, positionX, isDragging);
    };
}

function useHandleTouchDown(startDraggingPosition: React.MutableRefObject<number>) {
    return (e: React.TouchEvent<HTMLUListElement>) => {
        startDraggingPosition.current = e.touches[0].clientX;
    };
}

function useHandleTouchUp(startDraggingPosition: React.MutableRefObject<number>) {
    return () => {
        startDraggingPosition.current = 0;
    };
}
