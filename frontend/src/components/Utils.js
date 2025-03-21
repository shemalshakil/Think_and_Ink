export const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ], clipboard: { matchVisual: false }
}
export const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video']

export const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format;
export const date = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format;
export const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format;