'use client'
import React , { useEffect } from 'react'
import { useNotificationStore } from '../context/NotificationsContext';
import { Alert , AlertDescription , AlertTitle } from '@/components/ui/alert';
import { LiaQuoteRightSolid } from "react-icons/lia";




function Notifications() {

    const { notifications , addNotification , removeNotification } = useNotificationStore();



    useEffect(() => {
        const interval = setInterval(() => {
            removeNotification(0);
        }, 2000);
        return () => clearInterval(interval);
    }, [notifications]);


    return (
        <div className='absolute top-10 right-10'>
            {notifications.map((notification, index) => {


                const SuccessStyle = "my-5 ring-2 ring-primary bg-background text-primary cursor-pointer hover:brightness-110 border-none"
                const ErrorStyle = "my-5 ring-2 ring-error bg-background text-error cursor-pointer hover:brightness-110 border-none"


                return <Alert
                    key={index}
                    className={notification.type == "success" ? SuccessStyle : ErrorStyle}
                    onClick={() => removeNotification(index)}
                >
                    <LiaQuoteRightSolid />
                    <AlertTitle className='text-xl'>{notification.type == "success" ? "Nice" : "Error"}</AlertTitle>
                    <AlertDescription>
                        {notification.message}
                    </AlertDescription>
                </Alert>
            })}
        </div>
    )
}

export default Notifications;