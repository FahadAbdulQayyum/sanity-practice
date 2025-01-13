"use client";
import { useEffect } from 'react';
import FormComponent from '../components/Form'
import { useRouter } from 'next/navigation';

interface FormProps {
    searchParams: { [key: string]: string | undefined };
}

// const Form = () => {
const Form = ({ searchParams }: FormProps) => {

    const router = useRouter();
    // const { id, name } = router.query;

    // const [userData, setUserData] = useState<{ id: number; name: string; age: number } | null>(null);

    useEffect(() => {
        console.log("searchParams...", searchParams)
    }, [])

    return (
        <div>
            <FormComponent />
        </div>
    )
}

export default Form
