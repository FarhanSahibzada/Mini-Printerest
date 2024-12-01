import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import service from '../../Appwrite/Services'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Input } from '../index'
import RTE from '../RTE'

export default function Postform({ post }) {
    const [loading, setloading] = useState(false)
    const navigate = useNavigate();
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm(
        {
            defaultValues: {
                title: post?.title || '',
                slug: post?.$id || '',
                content: post?.content || '',
                status: post?.status ?? 'Active'
            }
        }
    );

    const userData = useSelector((state) => state.auth.userData)




    const Submit = async (data) => {
        setloading(true)
        if (post) {
            const file = data.image[0] ? await service.Fileuploading(data.image[0]) : null;
            if (file) {
                await service.Deletfile(post?.featuredImage)
            }
            const dbpost = await service.UpdatePost(post.$id,
                {
                    ...data,
                    featuredImage: file ? file.$id : post?.featuredImage
                }
            )

            if (dbpost) {
                navigate(`/PostCard/${dbpost.$id}`)
            }
            setloading(false)
        }
        else {
            const file = await service.Fileuploading(data.image[0])
            if (file) {
                const fileid = file.$id;
                data.featuredImage = fileid;
                const dbpost = await service.CreatePost({ ...data, userId: userData.$id })

                if (dbpost) {
                    navigate(`/PostCard/${dbpost.$id}`)

                }
                console.log("suessfull data saved")

            }
            setloading(false)
        }

    }



    const SlugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")


        return '';
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name == 'title') {
                const Slug = SlugTransform(value.title)
                setValue('slug', Slug, { shouldValidate: true })
            }
        })


        return () => {
            subscription.unsubscribe()
        }
    }, [watch, SlugTransform, setValue])





    return (
        <form onSubmit={handleSubmit(Submit)} className="flex flex-wrap w-full flex-col sm:flex-row ">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", SlugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues('content')}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.Getfilepreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Status
                </label>
                <select
                    id="status"
                    className="block  py-2 px-3 border border-gray-300
                    bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    {...register("Status", { required: true })}
                >
                    <option value="Active" className="text-gray-700" >
                        Active
                    </option>
                    <option value="Inactive" className="text-gray-700">
                        Inactive
                    </option>
                </select>

                <button
                    type="submit"
                    className={`w-full mt-6 text-white flex justify-center py-2 px-4 font-semibold p-2 rounded-lg ${post ? "bg-green-500" : "bg-blue-500"
                        }`}
                >
                    {post ? (
                        loading ? (
                            <div className="flex space-x-3 py-1">
                                <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                                <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
                                <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
                            </div>
                        ) : (
                            "Update"
                        )
                    ) : loading ? (
                        <div className="flex space-x-3 py-1">
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
                        </div>
                    ) : (
                        "Submit"
                    )}
                </button>
            </div>
        </form>



    )
}
