import './App.css';
import 'antd/dist/antd.css'
import { UploadPage } from './UploadPage';
import { useState } from 'react'

enum PageModeEnum { UPLOAD, RESULT }

function App() {

	const [mode, setMode] = useState<PageModeEnum>(PageModeEnum.UPLOAD)
	const [imgName, setImgName] = useState<string>()

	function onUploadSuccess(img: string): void {
		setImgName(img)
		setMode(PageModeEnum.RESULT)
	}

	return (
		<div className="app">
			<header className="header">
				<span>P</span> Detect
			</header>

			<main>
				{
					mode === PageModeEnum.UPLOAD &&
					<UploadPage onUploadSuccess={onUploadSuccess}/>
				}
				
				{
					mode === PageModeEnum.RESULT &&
					<div style={{ color: 'black' }}> aqui virá o diagnóstico para '{imgName}'...</div>
				}
			</main>
		</div>
	);
}

export default App;
