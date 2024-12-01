import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'

export default function RTE({ name, control, label, defaultValue = '' }) {

  return (
    <div className='w-full'>
      {label && <label className='inline-block text-base font-semibold text-gray-700'>{label}</label>}
      <Controller
        name={name || 'content'}
        control={control}
        deafaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            value={value}
            apiKey='a7ql6jqzi3ga102hd73eplpuac43ya3277cfzr9v0fzskfjm'
            init={{
              height: 200,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={(content)=>
              { onChange(content) }}
          />
        )}

      />
    </div>
  )
}
