import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"
import { createReflectionApi } from "../../utils/reflection"
import { jwtDecode } from "jwt-decode"

const ReflectionForm = ({ openForm, task_id,submitReflection }) => {
    console.log("taskId", task_id)
    const user = jwtDecode(JSON.parse(localStorage.getItem("token")))
    const nav = useNavigate()
    
    const [loading, setLoading] = useState(false)
    const [payload, setPayload] = useState({
        mood: "",
        whatContributedMost: "",
        challengesEncountered: "",
        tookMoreOrLessTime: "",
        whatDidYouLearn: "",
        approachTaskAgain: "",
        task_id: task_id
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
            const result = await createReflectionApi(payload)
            console.log("submitted", result)
            if (result) {
                submitReflection()
                console.log("result", result)
                toast.success(result?.data?.message)
                setLoading(false)
                setPayload({
                    mood: "",
                    whatContributedMost: "",
                    challengesEncountered: "",
                    tookMoreOrLessTime: "",
                    whatDidYouLearn: "",
                    approachTaskAgain: "",
                    task_id: task_id
                })
                nav(`/reflection/${user?.user_id}`)
            }
        } catch (error) {
            console.log(error.message);
            toast.error("invalid input")
            setLoading(false)
        }
    }

    return (
        <div className="bg-white w-[500px] scroll  inset-0 ">
            <h2 className="text-center py-3 border-b mb-2">Reflection</h2>
            <form className="px-4" onSubmit={submitHandler}>
                <div className="w-full">
                    <label>How did you feel upon completing this task <span className="text-red-500">*</span></label>
                    <select value={payload.mood} onChange={handleChange} name="mood" className="py-2 mt-2 rounded-sm px-2 border w-full">
                        <option value="">select mood</option>
                        <option value="Satisfied">Satisfied</option>
                        <option value="Stressed/Frustrated">Stressed/Frustrated</option>
                        <option value="Mixed Feelings/Neutral">Mixed Feelings/Neutral</option>
                        <option value="Calm/Relieved">Calm/Relieved</option>
                    </select>
                </div>
                <div className="w-full mt-4">
                    <label>What contributed most to this feeling? <span className="text-red-500">*</span></label>
                    <input type="text" value={payload.whatContributedMost} onChange={handleChange} name="whatContributedMost" placeholder="What contributed most to this feeling?" className="py-2 mt-2 rounded-sm px-2 border w-full" />

                </div>
                <div className="w-full mt-4">
                    <label>What challenges did you encounter while working on this tasks,and how did you overcome them? <span className="text-red-500">*</span></label>
                    <textarea onChange={handleChange} value={payload.challengesEncountered} name="challengesEncountered" className="py-2 mt-2 rounded-sm px-2 border w-full" placeholder="What challenges did you encounter while working on this tasks,and how did you overcome them?">

                    </textarea>

                </div>
                <div className="w-full mt-4">
                    <label>Did the task take more or less time than you expected,and why did you think that was the case? <span className="text-red-500">*</span></label>
                    <textarea onChange={handleChange} value={payload.tookMoreOrLessTime} name="tookMoreOrLessTime" className="py-2 mt-2 rounded-sm px-2 border w-full" placeholder="Did the task take more or less time than you expected,and why did you think that was the case?">

                    </textarea>

                </div>
                <div className="w-full mt-4">
                    <label>What did you learn from the task,and how can you apply this learning in the future? <span className="text-red-500">*</span></label>
                    <textarea value={payload.whatDidYouLearn} name="whatDidYouLearn" onChange={handleChange} className="py-2 mt-2 rounded-sm px-2 border w-full" placeholder="What did you learn from the task,and how can you apply this learning in the future?">

                    </textarea>

                </div>
                <div className="w-full mt-4">
                    <label>if you could approach this task again,what would you do differently,and why <span className="text-red-500">*</span></label>
                    <textarea value={payload.approachTaskAgain} name="approachTaskAgain" onChange={handleChange} className="py-2 mt-2 rounded-sm px-2 border w-full" placeholder="if you could approach this task again,what would you do differently,and why">

                    </textarea>

                </div>


                <div className="flex w-full justify-end mt-4">
                    <button type="submit" className="bg-blue-500 text-sm text-white py-2 px-2 rounded-sm font-bold" >{loading ? "submitting..." : "save changes"}</button>
                </div>
            </form>

        </div>
    )
}


export default ReflectionForm