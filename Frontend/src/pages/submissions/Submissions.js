import { useEffect, useState } from "react";
import { fetchSubmissionTypes } from "../../api/submissionTypesApi";
import Uploader from "../../components/cards/Uploader";
import { handleToast } from "../../helper/helper";

export default function Submissions() {
    const [submissionTypes, setSubmissionTypes] = useState([]);

    useEffect(() => {
        handleFetchSubmissionTypes();
    },[]);

    const handleFetchSubmissionTypes = () => {
        fetchSubmissionTypes('?published=true')
            .then(res => {
                console.log(res)
                res.data.isSuccessful ? 
                    setSubmissionTypes(res.data.responseData) : 
                    handleToast();
            })
            .catch(() => handleToast());
    }

    return (
        <>
            {submissionTypes && submissionTypes.map((sub, index) => 
                <Uploader 
                    title={sub.name}
                    description={sub.description}
                    type={'submissions'}
                    folder={sub.folder}
                />
            )}
        </>
 
    );
}
