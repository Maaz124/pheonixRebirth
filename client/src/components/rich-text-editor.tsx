import { useRef, useMemo, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const quillRef = useRef<ReactQuill>(null);

    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });
                const data = await res.json();

                if (data.url) {
                    const quill = quillRef.current?.getEditor();
                    const range = quill?.getSelection();
                    if (quill && range) {
                        quill.insertEmbed(range.index, 'image', data.url);
                    }
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };
    }, []);

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        }
    }), [imageHandler]);

    return (
        <div className="bg-white">
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                placeholder={placeholder}
                className="h-64 mb-12" // mb-12 to account for toolbar
            />
        </div>
    );
}
