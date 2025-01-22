import React, { useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";

interface ModelProps {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Model: React.FC<ModelProps> = ({ isVisible, onClose, children }) => {
    useEffect(() => {
        if (isVisible) {
            // Disable background scrolling
            document.body.style.overflow = "hidden";
        } else {
            // Enable background scrolling
            document.body.style.overflow = "auto";
        }

        // Cleanup to re-enable scrolling
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isVisible]);

    if (!isVisible) return null;

    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).id === "wrapper") onClose();
    };

    return (
        <div
            className="fixed inset-0  bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
            id="wrapper"
            onClick={handleClose}
        >
            <div
                className="md:w-[600px] mt-10 mb-5 w-full mx-4 bg-white text-gray-900 rounded flex flex-col max-h-screen overflow-y-auto"
            >
                <div className="p-2">
                    <IoCloseSharp
                        size={25}
                        onClick={() => onClose()}
                        className="place-self-end cursor-pointer"
                    />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Model;
