import React, { useEffect, useMemo, useState, useRef } from 'react'
import classNames from 'classnames';

const Shape = ({data}) => {

    const [selected, setSelected] = useState(new Set())
    const [unloading, setUnloading] = useState(false);
    const timerRef = useRef(null);

    const boxes = useMemo(() => data.flat(Infinity), [data]);
    const countOfVisibleBoxes = useMemo(() => {
        return boxes.reduce((accu, box) => {
             
            if(box === 1) {
                accu+=1;
            }
            return accu;
        }, 0)
    }, [boxes])


    const handleClick = (e) => {
        const {target} = e;
        const index = target.getAttribute('data-index')
        const status = target.getAttribute('data-status')

        if(index===0 || status==='hidden' || selected.has(index) || unloading) {
            return;
        }

        setSelected(prev => {
            return new Set(prev.add(index))
        })
    }

    const unload = () => {
        const keys = Array.from(selected.keys());
        setUnloading(true)
        const removeKeys = () => {
            if(keys.length){
                const currentKey = keys.shift();
                setSelected(prev => {
                    const updatedKeys = new Set(prev);
                    updatedKeys.delete(currentKey);
                    return updatedKeys;
                })
                timerRef.current = setTimeout(removeKeys, 500);
            }else{
                setUnloading(false);
                clearTimeout(timerRef.current)
            }
        }
        timerRef.current = setTimeout(removeKeys, 100);
    }

    useEffect(() => {

        if(selected.size >= countOfVisibleBoxes) {
            unload()
        }
    }, [selected])
  return (
    <div className='boxes' onClick={handleClick}>
        {
            boxes.map((box, index) => {

                const status = box===1 ? 'visible' : 'hidden'
                const isSelected = selected.has(index.toString())
                return (
                    <div 
                        key={`${box}-${index}`} 
                        className={
                            classNames('box', status, isSelected&&'selected')
                        }
                        data-index={index}
                        data-status={status}
                    />
                )
            })
        }
    </div>
  )
}

export default Shape
