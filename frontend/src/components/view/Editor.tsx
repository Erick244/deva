import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
})

const modules = {
	toolbar: [
		['bold', 'italic', 'underline', 'strike'],
		['blockquote', 'code-block'],

		[{ 'header': 1 }, { 'header': 2 }],
		[{ 'list': 'ordered' }, { 'list': 'bullet' }],
		[{ 'script': 'sub' }, { 'script': 'super' }],
		[{ 'indent': '-1' }, { 'indent': '+1' }],

		[{ 'size': ['small', false, 'large', 'huge'] }],
		[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

		[{ 'color': [] }, { 'background': [] }],
		[{ 'font': [] }],
		[{ 'align': [] }],
		['image', 'video', 'link', 'code']
	],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: true,
	},
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */

const formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'indent',
	'link',
	'image',
	'video',
	'code-block',
	'background',
	'color',
	'code',
	'script',
	'align'
]

interface EditorProps {
	placeholder?: string;
	value: any;
	onChange: any;
	disabled: boolean;
}


export default function Editor(props: EditorProps) {
	return <QuillNoSSRWrapper
		modules={modules}
		formats={formats}
		theme="snow"
		placeholder={props?.placeholder}
		value={props.value}
		onChange={props.onChange}
		readOnly={props.disabled}
	/>
}