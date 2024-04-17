import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MdEdit } from "react-icons/md";
import { updateReflectionApi } from "../../utils/reflection";
import { toast } from "react-toastify";


const EditReflectionForm = ({ openForm, reflectionData }) => {
    console.log("reflectionData", reflectionData)
    const [edit, setEdit] = useState(false)
    const nav = useNavigate()

    const [loading, setLoading] = useState(false)
    const [payload, setPayload] = useState({
        mood: reflectionData?.mood,
        whatContributedMost: reflectionData?.what_contributed_most,
        challengesEncountered: reflectionData?.challenges_encountered,
        tookMoreOrLessTime: reflectionData?.took_more_or_less_time,
        whatDidYouLearn: reflectionData?.what_did_you_learn,
        approachTaskAgain: reflectionData?.approach_task_again,

    })
    const handleChange = (e) => {

        const { name, value } = e.target
        console.log("value", value)
        
        setPayload(prev => ({ ...prev, [name]: value }))
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            console.log("payload-submitted", payload)

            const result = await updateReflectionApi(payload,reflectionData?.id)
            console.log("submitted", result)
            if (result?.status === 200) {

                toast.success(result?.data?.message)
                setLoading(false)
                setPayload({
                    mood: "",
                    whatContributedMost: "",
                    challengesEncountered: "",
                    tookMoreOrLessTime: "",
                    whatDidYouLearn: "",
                    approachTaskAgain: "",
                })
                openForm()
                
                window.location.reload()
                
            }
        } catch (error) {
            console.log(error.message);
            toast.error("invalid input")
            setLoading(false)
        }
    }
    // const handleIsOpen = () => {

    //     openForm()
    //     nav(`/reflection`)
    // }
    const handleEdit = () => {
        setEdit(!edit)
    }

    return (
        <div className="bg-white w-[500px] scroll  inset-0 ">
            <h2 className="text-center py-3 border-b mb-2"> Reflection </h2>
            <div className="flex justify-end ">
            <button className="bg-blue-500 rounded-sm text-white px-2 py-2 mr-2 " onClick={openForm}>back</button>
                <button className="bg-blue-500 rounded-sm text-white px-2 py-2 mr-2 " onClick={handleEdit}><MdEdit /></button>
            </div>
            <form className="px-4" onSubmit={submitHandler}>
                <div className="w-full">
                    <label>How did you feel upon completing this task <span className="text-red-500">*</span></label>
                    <select value={payload.mood} onChange={handleChange} name="mood" disabled={edit && true} className="py-2 mt-2 cursor-not-allowed  rounded-sm px-2 border w-full">
                        <option value="">select mood</option>
                        <option value="Satisfied">Satisfied</option>
                        <option value="Stressed/Frustrated">Stressed/Frustrated</option>
                        <option value="Mixed Feelings/Neutral">Mixed Feelings/Neutral</option>
                        <option value="Calm/Relieved">Calm/Relieved</option>
                    </select>
                </div>
                <div className="w-full mt-4 ">
                    <label>What contributed most to this feeling? <span className="text-red-500">*</span></label>
                    <input type="text" value={payload.whatContributedMost} onChange={handleChange} name="whatContributedMost" disabled={edit && true} placeholder="What contributed most to this feeling?" className="py-2 mt-2 rounded-sm px-2 border w-full cursor-not-allowed  " />

                </div>
                <div className="w-full mt-4">
                    <label>What challenges did you encounter while working on this tasks,and how did you overcome them? <span className="text-red-500">*</span></label>
                    <textarea onChange={handleChange} value={payload.challengesEncountered} name="challengesEncountered" disabled={edit && true} className="py-2 mt-2 cursor-not-allowed   rounded-sm px-2 border w-full" placeholder="What challenges did you encounter while working on this tasks,and how did you overcome them?">

                    </textarea>

                </div>
                <div className="w-full mt-4">
                    <label>Did the task take more or less time than you expected,and why did you think that was the case? <span className="text-red-500">*</span></label>
                    <textarea onChange={handleChange} value={payload.tookMoreOrLessTime} name="tookMoreOrLessTime" disabled={edit && true} className="py-2 mt-2 cursor-not-allowed   rounded-sm px-2 border w-full" placeholder="Did the task take more or less time than you expected,and why did you think that was the case?">

                    </textarea>

                </div>
                <div className="w-full mt-4">
                    <label>What did you learn from the task,and how can you apply this learning in the future? <span className="text-red-500">*</span></label>
                    <textarea value={payload.whatDidYouLearn} name="whatDidYouLearn" onChange={handleChange} disabled={edit && true} className="cursor-not-allowed   py-2 mt-2 rounded-sm px-2 border w-full" placeholder="What did you learn from the task,and how can you apply this learning in the future?">

                    </textarea>

                </div>
                <div className="w-full mt-4">
                    <label>if you could approach this task again,what would you do differently,and why <span className="text-red-500">*</span></label>
                    <textarea value={payload.approachTaskAgain} name="approachTaskAgain" onChange={handleChange} disabled={edit && true} className=" cursor-not-allowed  py-2 mt-2 rounded-sm px-2 border w-full" placeholder="if you could approach this task again,what would you do differently,and why">

                    </textarea>

                </div>


                <div className="flex w-full justify-end mt-4">
                    <button type="submit" className="bg-blue-500 text-sm text-white py-2 px-2 rounded-sm font-bold" > {edit ? 'Save' : 'Edit'}</button>
                </div>
            </form>

        </div>
    )
}


export default EditReflectionForm